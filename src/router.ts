// TODO handle error, notify user with overlay
const render = (event: HashChangeEvent) => {
    const pageName = event.newURL.split('#')[1];
    fetch(pageName + ".html")
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            document.open();
            document.write(html);
            document.close();
        })
}

window.addEventListener("hashchange", render, false);

window.onload = () => {
    history.pushState("", document.title, window.location.pathname); // Removes hash
};


