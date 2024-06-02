var radius = 240;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 120;
var imgHeight = 170;

var bgMusicControls = true;

setTimeout(init, 1000);

function MS(x) {
  var videoID = "myVideo" + x;
  //   // Lấy đối tượng video
  var video = document.getElementById(videoID);
  video.play();
  audio.volume = 0;

  var videoDuration;
  var timeplay;
  video.addEventListener("play", function () {
    videoDuration = Math.floor(video.duration); // Lấy độ dài video và làm tròn xuống thành số nguyên
    console.log("Độ dài của video là: " + videoDuration + " giây");
    let timeplay = videoDuration.toString() + "000";
    timeplay = parseInt(timeplay);
    setTimeout(() => {
      var snowElement = document.querySelector(".snow");
      snowElement.style.animationName = "snowEF";
      snowElement.style.animationDuration = "90s";

      // var snowBeforeElement = document.querySelector('.snow::before');
      // console.log(snowBeforeElement);
      // snowBeforeElement.style.animationName = 'snowEF';
      // snowBeforeElement.style.animationDuration = '90s';

      // var snowAfterElement = document.querySelector('.snow::after');
      // snowAfterElement.style.animationName = 'snowEF';
      // snowAfterElement.style.animationDuration = '90s';

      playSpin(false);
      setTimeout(() => {
        playSpin(true);
        audio.volume = 0.1;
      }, timeplay);
    }, 100);
  });
}
function MS2() {
  var audio = document.getElementById("myAudio");

  audio.pause();

  // Lấy đối tượng video
  var video = document.getElementById("myVideo2");
  video.play();

  // Set âm lượng của video thành 0 (tắt âm thanh)
  video.volume = 1;
}

function randomSort() {
  return 0.5 - Math.random(); // Trả về một số ngẫu nhiên từ -0.5 đến 0.5
}

function xaoTronMang(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Tạo một chỉ số ngẫu nhiên từ 0 đến i
    const j = Math.floor(Math.random() * (i + 1));
    // Hoán đổi phần tử tại vị trí i và j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

var odrag = document.getElementById("drag-container");
var ospin = document.getElementById("spin-container");
var aImg = ospin.getElementsByTagName("img");
var aVid = ospin.getElementsByTagName("video");
var aEle = [...aImg, ...aVid];
// aEle.sort(randomSort);
xaoTronMang(aEle);

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform =
      "rotateY(" +
      i * (360 / aEle.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
  return console.log(ospin.style.animationPlayState);
}

var sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

function rotate(autoRotate, rotateSpeed) {
  if (autoRotate) {
    var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(
      rotateSpeed
    )}s infinite linear`;
  }
}

rotate(autoRotate, rotateSpeed);

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
    sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};
