document.querySelector('#reservation-form').addEventListener('submit', (event) => {
    event.preventDefault()
    // log out the form values
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    
    //értesítés: a foglalás sikeresen elküldve
    const notification = document.createElement('div')
    notification.classList.add('notification')
    notification.textContent = "Sikeres foglalás!"
    if(document.querySelector('.notification')) {
        return
    }
    document.querySelector('body').appendChild(notification)
    setTimeout(() => {
        notification.remove()
    }, 4000)
})

window.addEventListener('keydown', (event) => {
    if (event.key === "x" && event.ctrlKey) {
        event.preventDefault()
        document.querySelector('#name').value = "John Doe"
        document.querySelector('#email').value = "asdf@asdf.hh"
        document.querySelector('#phone').value = "1234567890"
        document.querySelector('#date').value = "2021-01-01"
        document.querySelector('#time').value = "12:00"
        document.querySelector('#guests').value = "2"
    }
})