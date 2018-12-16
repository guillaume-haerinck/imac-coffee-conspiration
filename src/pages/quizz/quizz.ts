import "./quizz.scss";
import "../../shared/custom-elements/pc-window/pc-window";
import { RoverXpDog } from "./elements/rover-xp-dog/rover-xp-dog";

/* Exports to access elements inside html */
(window as any).RoverXpDog = new RoverXpDog("background-wrapper");

document.getElementById('wallpaper').addEventListener('dblclick',(e)=>{
  document.getElementById('background-wrapper').style.backgroundImage = `url(${e.target.currentSrc})`;
  document.getElementById('background-wrapper').style.backgroundSize = `cover`;
  document.getElementById('virtual-girl').style.display = `block`;
});

document.getElementById('flight-simulator').addEventListener('dblclick',(e)=>{
  document.getElementById('crack').style.display = `grid`;
  document.getElementById('youtube-crack').src = `https://www.youtube.com/embed/sODZLSHJm6Q?controls=0&autoplay=1&version=3&enablejsapi=1`;
});

document.querySelectorAll('#crack .control')[0].addEventListener('click',(e)=>{
  console.log("here");
  
  document.getElementById('crack').style.display = `none`;
  document.getElementById('youtube-crack').src = ``;

});

console.log("lol");


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