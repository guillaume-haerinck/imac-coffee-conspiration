import "./enroll.scss";

// TODO use get api + use a service for external request + add typings for api
let caption = new XMLHttpRequest();
caption.open("GET", 'http://quotes.rest/qod.json?category=inspire', false);
caption.send(null);
caption = JSON.parse(caption.responseText);

document.querySelector(`input[type="submit"]`).addEventListener('click', event => {
  event.preventDefault();
  document.getElementById(`citation`).innerHTML = `"` + caption.contents.quotes[0].quote+`"`;
});

document.querySelectorAll(`input`).addEventListener('input', () => {
  updateText();
});

function updateText() {
  document.querySelector(`#badge-fname`).innerHTML = document.querySelector(`input[name="fname"]`).value || 'First Name';
  document.querySelector(`#badge-lname`).innerHTML = document.querySelector(`input[name="lname"]`).value || 'Last Name';
  document.querySelector(`#badge-bdate`).innerHTML = document.querySelector(`input[name="date"]`).value || 'Your birthday';
}

(window as any).updateText = updateText;