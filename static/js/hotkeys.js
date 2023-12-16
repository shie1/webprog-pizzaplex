document.addEventListener("keydown", function (event) {
    if (event.key === " " || event.key === "Tab") {
        event.preventDefault()
        const showNavigatorEvent = new CustomEvent("showNavigator");
        window.dispatchEvent(showNavigatorEvent);
    } else if (event.key === "Escape") {
        if (document.querySelector('.overlay')) {
            document.querySelector('.overlay').remove()
            return
        }
    }
});