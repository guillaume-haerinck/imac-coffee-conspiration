/* 3rd party */
const Typed = require("typed.js");

/* custom */
import "./enroll.scss";
import "../../shared/custom-elements/overlay/overlay";
import "../../shared/custom-elements/pc-window/pc-window";
import { PCWindow } from "../../shared/custom-elements/pc-window/pc-window";
import { AgentCard } from "./elements/agent-card/agent-card";
import { QuotesService } from "./services/quotes.service";
import { AvatarsService } from "./services/avatars.service";

/* Managers */
const agentCard = new AgentCard("agent-card-container");
const timer = document.getElementById("timer");
const firstnameInput = document.getElementById("form-firstname") as HTMLInputElement;
const lastnameInput = document.getElementById("form-lastname") as HTMLInputElement;
const birthdateInput = document.getElementById("form-birthdate") as HTMLInputElement;

/* Overlay animation */
const introTextAnimation = new Typed('#intro-overlay-text-animation', {
  stringsElement: '#intro-overlay-text',
  typeSpeed: 40
});

setInterval(() => {
  let time = Number(timer.innerHTML);
  time--;
  timer.innerHTML = time.toString();
  if (time === 0) {
    window.location.hash = "hacked";
  }
}, 1000);

document.addEventListener('click', (event: MouseEvent) => {
  if (event.srcElement.id === "intro-overlay") {
    document.getElementById("intro-overlay").remove();
  }
  if (event.srcElement.id === "join-btn") {
    document.getElementById("join-btn").remove();
    agentCard.append();
    (document.getElementById("window-timer") as PCWindow).unhide();
    (document.getElementById("window-firstname") as PCWindow).unhide();
  }
});

let bFormDone = false;
firstnameInput.addEventListener("keydown", () => {
  agentCard.firstname = firstnameInput.value;
  if (firstnameInput.value.length >= 5 && !bFormDone) {
    agentCard.revealBirthDate();
    agentCard.revealLastName();
    (document.getElementById("window-lastname") as PCWindow).unhide();
    (document.getElementById("window-birthdate") as PCWindow).unhide();
    bFormDone = true;
  }
});

/*
const quotesService = new QuotesService();
quotesService.getQuote()
  .then(quote => {
    document.getElementById("citation").innerHTML = `"${quote.quote}"`;
  })
  .catch(error => {
    console.warn("cannot get quote");
  })

const avatarsService = new AvatarsService();
avatarsService.getAvatar()
  .then(avatar => {
    const image = document.getElementById("agent-picture-img") as HTMLImageElement;
    image.src = avatar.picture.large;
  });
*/