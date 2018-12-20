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
import { Signature } from "./elements/signature/signature";

/* Managers */
const quotesService = new QuotesService();
const avatarsService = new AvatarsService();
const agentCard = new AgentCard("agent-card-container");
const firstnameInput = document.getElementById("form-firstname") as HTMLInputElement;
const lastnameInput = document.getElementById("form-lastname") as HTMLInputElement;
const birthdateInput = document.getElementById("form-birthdate") as HTMLInputElement;
const animalInput = document.getElementById("form-animal") as HTMLSelectElement;
const signature = new Signature("window-signature", "signature-img");

/* Overlay animation */
const introTextAnimation = new Typed('#intro-overlay-text-animation', {
  stringsElement: '#intro-overlay-text',
  typeSpeed: 40
});

document.addEventListener('click', (event: MouseEvent) => {
  if (event.srcElement.id === "intro-overlay") {
    document.getElementById("intro-overlay").remove();
  }
});

document.getElementById('join-btn').addEventListener('click',()=>{
  document.getElementById("join-btn").remove();
  agentCard.append();
  (document.getElementById("window-firstname") as PCWindow).unhide();
});


let bFirstNameTriggerDone = false;
var firstnameFunction = () => {
  agentCard.firstname = firstnameInput.value;
  if (firstnameInput.value.length >= 3 && !bFirstNameTriggerDone) {
    agentCard.revealBirthDate();
    agentCard.revealLastName();
    (document.getElementById("window-lastname") as PCWindow).unhide();
    (document.getElementById("window-birthdate") as PCWindow).unhide();
    bFirstNameTriggerDone = true;
  }
}
firstnameInput.addEventListener("change", firstnameFunction);
firstnameInput.addEventListener("keyup",firstnameFunction);

let bLastNameTriggerDone = false;
var lastnameFunction = () => {
  agentCard.lastname = lastnameInput.value;
  if (firstnameInput.value.length >= 3 && !bLastNameTriggerDone) {
    agentCard.revealSignature();
    (document.getElementById("window-signature") as PCWindow).unhide();
    avatarsService.getAvatar()
      .then(avatar => {
        const image = document.getElementById("agent-picture-img") as HTMLImageElement;
        image.src = avatar.picture.large;
      });
    bLastNameTriggerDone = true;
  }
}
lastnameInput.addEventListener("change", lastnameFunction);
lastnameInput.addEventListener("keyup",lastnameFunction);

birthdateInput.addEventListener("change", () => {
  agentCard.birthdate = birthdateInput.value;
});

var animalFunction = () => {
  agentCard.animal = animalInput.options[animalInput.selectedIndex].text;

}
animalInput.addEventListener("change", animalFunction);
animalInput.addEventListener("keyup",animalFunction);

document.getElementById("signature-canvas").addEventListener("mouseup", () => {
  quotesService.getQuote()
  .then(quote => {
    document.getElementById("citation").innerHTML = `"${quote.quote}"`;
    (document.getElementById("window-pewdiepie") as PCWindow).unhide();
    agentCard.revealAnimal();
    (document.getElementById("window-animal") as PCWindow).unhide();

    setTimeout(() => {
      window.location.hash = "hacked"; // Change page
    }, 5000);
  })
  .catch(error => {
    console.warn("cannot get quote");
  })
}, {once: true});
