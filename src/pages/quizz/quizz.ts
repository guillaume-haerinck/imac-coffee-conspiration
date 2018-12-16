import "./quizz.scss";
import "../../shared/custom-elements/pc-window/pc-window";
import { RoverXpDog } from "./elements/rover-xp-dog/rover-xp-dog";

/* Exports to access elements inside html */
(window as any).RoverXpDog = new RoverXpDog("background-wrapper");

document.getElementById('wallpaper').addEventListener('dblclick',(e)=>{
  document.getElementById('background-wrapper').style.backgroundImage = `url(assets/images/icons/wallpaper.jpg)`;
  document.getElementById('background-wrapper').style.backgroundSize = `cover`;
  document.getElementById('virtual-girl').style.display = `block`;
});

document.getElementById('flight-simulator').addEventListener('dblclick',(e)=>{
  document.getElementById('crack').style.display = `grid`;
  document.getElementById('youtube-crack').src = `https://www.youtube.com/embed/sODZLSHJm6Q?controls=0&autoplay=1&version=3&enablejsapi=1`;
});

document.getElementById('wikipedia').addEventListener('dblclick',(e)=>{
  document.getElementById('cursor').style.display = `block`;
  document.getElementById('foreground-wrapper').style.cursor = `none`;
  document.getElementById('background-wrapper').style.cursor = `none`;
});

document.body.addEventListener('mousemove',(e)=>{
  document.getElementById('cursor').style.top = e.pageY+"px";
  document.getElementById('cursor').style.left = e.pageX+"px";
  document.getElementById('cursor').style.transform ="translateX(-20px)";
});

document.getElementById('computer').addEventListener('dblclick',(e)=>{
  document.querySelectorAll('background-wrapper').style.cursor = `none`;
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