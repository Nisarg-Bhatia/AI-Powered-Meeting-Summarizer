let recorder;
let audioContext;
let destination;
let displayStream;
let micStream;

let chunks = [];
let meetingId;
let chunkIndex = 0;

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const statusText = document.getElementById("status");
const playerDiv = document.getElementById("player");

/* =======================
   START RECORDING
======================= */
startBtn.onclick = async () => {
  try {
    // 🔁 RESET STATE
    meetingId = "meeting_" + Date.now();
    chunkIndex = 0;
    chunks = [];
    playerDiv.innerHTML = "";

    statusText.innerText = "Requesting permissions...";

    displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });

    micStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    audioContext = new AudioContext();
    destination = audioContext.createMediaStreamDestination();

    audioContext.createMediaStreamSource(displayStream).connect(destination);
    audioContext.createMediaStreamSource(micStream).connect(destination);

    recorder = new MediaRecorder(destination.stream, {
      mimeType: "audio/webm;codecs=opus"
    });

    recorder.ondataavailable = async (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);

        const formData = new FormData();
        formData.append("meeting_id", meetingId);
        formData.append("chunk_index", chunkIndex);
        formData.append("audio", e.data, `chunk_${chunkIndex}.webm`);

        try {
          await fetch("http://127.0.0.1:8000/api/upload-chunk/", {
            method: "POST",
            body: formData
          });
        } catch (err) {
          console.error("Chunk upload failed:", err);
        }

        chunkIndex++;
      }
    };

    recorder.onstop = () => {
      // 🔒 Cleanup AFTER final chunk arrives
      displayStream.getTracks().forEach(t => t.stop());
      micStream.getTracks().forEach(t => t.stop());
      audioContext.close();

      // ▶️ LOCAL PLAYBACK
      const finalBlob = new Blob(chunks, { type: "audio/webm" });
      const audioURL = URL.createObjectURL(finalBlob);

      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = audioURL;

      playerDiv.innerHTML = "";
      playerDiv.appendChild(audio);

      startBtn.disabled = false;
      stopBtn.disabled = true;
      statusText.innerText = "Recording stopped";
    };

    recorder.start(10000); // chunk every 10s

    startBtn.disabled = true;
    stopBtn.disabled = false;
    statusText.innerText = "Recording...";

  } catch (err) {
    console.error(err);
    statusText.innerText = "Permission denied";
  }
};

/* =======================
   STOP RECORDING
======================= */
stopBtn.onclick = async () => {
  if (!recorder || recorder.state !== "recording") return;

  statusText.innerText = "Finalizing recording...";

  // 🔑 FORCE FINAL CHUNK FLUSH
  recorder.requestData();

  // ⏱️ Small delay ensures ondataavailable fires
  setTimeout(() => {
    recorder.stop();
  }, 200);
};
