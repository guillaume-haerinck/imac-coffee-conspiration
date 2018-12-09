// TODO handle error, notify user with overlay
const render = (event: HashChangeEvent) => {
    console.log("hash changed");
    

    const pageName = event.newURL.split('#')[1];
    fetch(pageName + ".html")
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            document.open();
            document.write(html);
            document.close();
            // TODO remove existing html
        })
}

window.addEventListener("hashchange", render, false);

window.onload = () => {
    history.pushState("", document.title, window.location.pathname); // Removes hash
    
};


