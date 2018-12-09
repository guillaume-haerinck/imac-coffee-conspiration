const render = (event: HashChangeEvent) => {
    const pageName = event.newURL.split('#')[1];
    fetch(pageName + ".html")
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            document.write(html);
        })
}

window.onload = () => {
    history.pushState("", document.title, window.location.pathname); // Removes hash
    window.addEventListener("hashchange", render, false);
};


