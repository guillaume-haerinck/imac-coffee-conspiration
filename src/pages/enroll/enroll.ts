import "./enroll.scss";
import "../../shared/custom-elements/pc-window/pc-window";
import { QuotesService } from "./services/quotes.service";
import { AvatarsService } from "./services/avatars.service";


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
  })