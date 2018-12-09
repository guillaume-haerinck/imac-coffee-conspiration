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

window.addEventListener("hashchange", render, false);

