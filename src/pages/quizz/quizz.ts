import "./quizz.scss";
import "../../shared/custom-elements/pc-window/pc-window";
import { RoverXpDog } from "./elements/rover-xp-dog/rover-xp-dog";
var fart = new Audio('assets/audio/fart.mp3');
var xpStartupSound = new Audio('assets/audio/xp-startup.mp3');
/* Exports to access elements inside html */
(window as any).RoverXpDog = new RoverXpDog("background-wrapper");

document.getElementById('wallpaper').addEventListener('dblclick',(e)=>{
  document.getElementById('background-wrapper').style.backgroundImage = `url(assets/images/icons/wallpaper.jpg)`;
  document.getElementById('background-wrapper').style.backgroundPositionY = `top`;
  document.getElementById('background-wrapper').style.backgroundSize = `cover`;
  document.getElementById('virtual-girl').style.display = `block`;
});

document.getElementById('flight-simulator').addEventListener('dblclick',(e)=>{
  document.getElementById('crack').style.display = `grid`;
  document.getElementById('youtube-crack').src = `https://www.youtube.com/embed/sODZLSHJm6Q?controls=0&autoplay=1&version=3&enablejsapi=1`;
});

document.getElementById('wikipedia').addEventListener('dblclick',(e)=>{
  document.getElementById('netscape-planet').style.display = `grid`;
});

document.body.addEventListener('mousemove',(e)=>{
  document.getElementById('cursor').style.top = e.pageY+"px";
  document.getElementById('cursor').style.left = e.pageX+"px";
  document.getElementById('cursor').style.transform ="translate(-60px, -20px)";

});

document.getElementById('netscape').addEventListener('dblclick',(e)=>{
  document.getElementById('netscape-browser').style.display = `grid`;
});

document.getElementById('art-gallery').addEventListener('dblclick',(e)=>{
  document.getElementById('mona-lisa').style.display = `grid`;
});

document.getElementById('flash-player').addEventListener('dblclick',(e)=>{
  document.getElementById('flash').style.display = `block`;
});

document.getElementById('mypc').addEventListener('dblclick',(e)=>{
  document.getElementById('foreground-wrapper').style.cursor = `url('assets/images/icons/bieber-cursor.cur'), auto`;
  document.getElementById('background-wrapper').style.cursor = `url('assets/images/icons/bieber-cursor.cur'), auto`;
  fart.play();
});

document.getElementById('start-button').addEventListener('click',(e)=>{
  document.getElementById("cursor").style.display = 'none';
  document.getElementById('foreground-wrapper').style.cursor = `none`;
  document.getElementById('background-wrapper').style.cursor = `none`;
  document.querySelector('.windows-boot-container').style.display = `block`;
  document.getElementById('background-wrapper').style.backgroundImage = `url(/assets/images/logos/windows-vapor-logo.png), url(assets/images/backgrounds/vapor-beans.gif)`;
  document.getElementById('background-wrapper').style.backgroundSize = `175px, cover`;
  document.getElementById('background-wrapper').style.backgroundPosition = `center, center`;
  document.getElementById('task-bar').style.background = `linear-gradient(104.44deg, #00DBFF -22.29%, #FF00E5 95.68%)`;
  xpStartupSound.play();

  var t = setTimeout(function() {
    document.getElementById('cursor').style.display = `block`;
    document.getElementById('foreground-wrapper').style.cursor = `none`;
    document.getElementById('background-wrapper').style.cursor = `none`;
  }, 5000);
});

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    // add a zero in front of numbers<10
    m = checkTime(m);
    document.getElementById('time').innerHTML = h + ":" + m;
    var t = setTimeout(function() {
      startTime()
    }, 500);
  }
  startTime();
