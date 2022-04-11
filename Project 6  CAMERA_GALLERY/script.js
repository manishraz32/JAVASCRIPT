let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let transparentColor = "transparent";
let recordFlag = false;

let recorder;
let chunks = [];
let constraints = { 
    video: true,
    audio: true
}
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  video.srcObject = stream;
  recorder = new MediaRecorder(stream);
  recorder.addEventListener("start", (e) => {
      chunks = [];
  })
  recorder.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
  })
  recorder.addEventListener("stop", (e) => {
      //conversion of media chunks data to video
      let blob = new Blob(chunks, { type: "video/mp4" });
      if(db) {
          let videoId = shortid();
          let dbTransaction = db.transaction("video", "readwrite");
          let videoStore = dbTransaction.objectStore("video");
          let videoEntry = {
              id: `vid-${videoId}`,
              blobData: blob
          }
          videoStore.add(videoEntry);
      }
    //   let videoURL = URL.createObjectURL(blob);
    //   let a = document.createElement("a");
    //   a.href = videoURL;
    //   a.download = "stream.mp4";
    //   a.click();
  })
})

recordBtnCont.addEventListener("click", (e) => {
    if(!recorder) return;
    recordFlag = !recordFlag;
    if(recordFlag) { // start recording
        recorder.start();
        recordBtn.classList.add("scale-record");
        setTimer();
    } else {  // stop recording
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }
})

// code for capturing the image
captureBtnCont.addEventListener("click", (e) => {
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);
    // filtering
    tool.fillStyle = transparentColor;
    //console.log(transparentColor);
    tool.fillRect(0, 0, canvas.width, canvas.height);
    let imageURL = canvas.toDataURL('image/jpeg', 1.0);

    if(db) {
        let imageId = shortid();
        let dbTransaction = db.transaction("image", "readwrite");
        let imageStore = dbTransaction.objectStore("image");
        let imageEntry = {
            id: `img-${imageId}`,
            blobData: imageURL
        }
        imageStore.add(imageEntry);
    }
    let a = document.createElement("a");
    a.href = imageURL;
    a.download = "image.jpeg";
    a.click();

})


let timerID;
let counter = 0;
let timer = document.querySelector(".timer");
console.log(timer);
function setTimer() {
    timer.style.display = "block";
    function displayTimer() {
        let totalSeconds = counter;
        let hours = Number.parseInt(totalSeconds/3600);
        totelSeconds = totalSeconds % 3600;
        let minutes = Number.parseInt(totelSeconds / 60);
        totelSeconds = totalSeconds % 60;
        let seconds = totalSeconds;
        hours = hours < 10 ? `0${hours}` : houurs;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter++;
    }
    timerID = setInterval(displayTimer, 1000);
}
function stopTimer() {
    timer.style.display = "none";
    clearInterval(timerID);
    timer.innerText = "00:00:00";
}

//filtering logic
let filterLayer = document.querySelector(".filter-layer");
let allFilters = document.querySelectorAll(".filter");
allFilters.forEach((filterElem) => {
    filterElem.addEventListener("click", (e) => {
        transparentColor = getComputedStyle(filterElem).getPropertyValue("background-color");
        filterLayer.style.backgroundColor = transparentColor;
    })
})
