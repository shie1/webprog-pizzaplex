document.addEventListener("keydown", function (event) {
    if (document.querySelector('input:focus')) {
        return
    }
    if (event.key === " " || event.key === "Tab" ) {
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