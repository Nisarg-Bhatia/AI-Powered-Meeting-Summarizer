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
    // 🔁 RESET STATE FOR NEW RECORDING
    meetingId = "meeting_" + Date.now();
    chunkIndex = 0;
    chunks = [];
    playerDiv.innerHTML = "";

    statusText.innerText = "Requesting permissions...";

    // 🎧 CAPTURE TAB AUDIO
    displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });

    // 🎤 CAPTURE MIC AUDIO
    micStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    // 🎛️ MERGE AUDIO STREAMS
    audioContext = new AudioContext();
    destination = audioContext.createMediaStreamDestination();

    audioContext.createMediaStreamSource(displayStream).connect(destination);
    audioContext.createMediaStreamSource(micStream).connect(destination);

    // 🎙️ CREATE RECORDER
    recorder = new MediaRecorder(destination.stream, {
      mimeType: "audio/webm;codecs=opus"
    });

    // 📦 CREATE & SEND CHUNKS
    recorder.ondataavailable = async (e) => {
      if (e.data.size > 0) {
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
      console.log("Recorder fully stopped");
    };

    // ⏱️ START RECORDING (10-SECOND CHUNKS)
    recorder.start(10000);

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
stopBtn.onclick = () => {
  if (!recorder) return;

  recorder.stop();

  displayStream?.getTracks().forEach(t => t.stop());
  micStream?.getTracks().forEach(t => t.stop());
  audioContext?.close();

  // ▶️ PLAY FINAL AUDIO (LOCAL PREVIEW)
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
