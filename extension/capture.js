let audioContext;
let destination;
let displayStream;
let micStream;
let recorder;
let chunks = [];

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const statusText = document.getElementById("status");

startBtn.onclick = async () => {
  try {
    chunks = [];
    statusText.innerText = "Requesting permissions...";

    // TAB AUDIO (select "This Tab" + Share tab audio)
    displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });

    // MIC AUDIO
    micStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    audioContext = new AudioContext({ sampleRate: 48000 });

    // 🔑 CRITICAL: ensure audio context is running
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    destination = audioContext.createMediaStreamDestination();

    audioContext.createMediaStreamSource(displayStream).connect(destination);
    audioContext.createMediaStreamSource(micStream).connect(destination);

    recorder = new MediaRecorder(destination.stream, {
      mimeType: "audio/webm;codecs=opus",
      audioBitsPerSecond: 128000
    });

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    // ✅ set onstop BEFORE stop is called
    recorder.onstop = async () => {
      const finalBlob = new Blob(chunks, { type: "audio/webm" });

      const formData = new FormData();
      const meetingId = crypto.randomUUID();

      formData.append("meeting_id", meetingId);
      formData.append("audio", finalBlob, "meeting.webm");

      await fetch("http://127.0.0.1:8000/api/upload-meeting/", {
        method: "POST",
        body: formData
      });
      
      await fetch("http://127.0.0.1:8000/api/transcribe-meeting/", {
        method: "POST",
        body: new URLSearchParams({ meeting_id: meetingId })
      });
      console.log("Meeting audio uploaded:", finalBlob.size);
    };

    recorder.start();

    startBtn.disabled = true;
    stopBtn.disabled = false;
    statusText.innerText = "Recording...";

  } catch (err) {
    console.error(err);
    statusText.innerText = "Permission denied";
  }
};

stopBtn.onclick = () => {
  recorder?.stop();

  displayStream?.getTracks().forEach(t => t.stop());
  micStream?.getTracks().forEach(t => t.stop());
  audioContext?.close();

  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusText.innerText = "Recording stopped";
};