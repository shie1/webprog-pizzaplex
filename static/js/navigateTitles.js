let indexedElements = document.querySelectorAll('*[data-indexed="true"]');
let i = 0

let selectedIndex = -1
let currentlyViewing = -1

indexedElements.forEach((elem) => {
    const attr = document.createAttribute("navigator-index")
    attr.value = i++
    elem.setAttributeNode(attr)
})

const clearSelection = () => {
    document.querySelectorAll('*[data-selected="true"]').forEach((elem) => {
        elem.removeAttribute('data-selected')
    })
}

const selectElement = (index) => {
    clearSelection()
    const dataSel = document.createAttribute("data-selected")
    dataSel.value = "true"
    document.querySelector(`*[navigator-to="${index}"]`).setAttributeNode(dataSel)
}

const keyHandler = (event) => {
    // on up
    if (event.key === "ArrowUp") {
        event.preventDefault()
        if (selectedIndex > 0) {
            selectedIndex--
            selectElement(selectedIndex)
        }
        else {
            selectedIndex = i - 1
            selectElement(selectedIndex)
        }
    }
    // on down
    else if (event.key === "ArrowDown") {
        event.preventDefault()
        if (selectedIndex < i - 1) {
            selectedIndex++
            console.log(selectedIndex)
            selectElement(selectedIndex)
        }
        else {
            selectedIndex = 0
            console.log(selectedIndex)
            selectElement(selectedIndex)
        }
    }
    // on enter
    else if (event.key === "Enter") {
        event.preventDefault()
        document.querySelector(`a[navigator-to="${selectedIndex}"]`).click()
    }
}

document.addEventListener("keydown", keyHandler, true)

window.addEventListener("showNavigator", function () {
    hideScrollbar()
    if (document.querySelector('.overlay')) {
        document.querySelector('.overlay').remove()
        clearSelection()
        selectedIndex = -1
        showScrollbar()
        return
    }

    clearSelection()
    selectedIndex = -1

    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    overlay.addEventListener('click', () => {
        overlay.remove()
        clearSelection()
        selectedIndex = -1
        showScrollbar()
    })

    const note = document.createElement('span')
    note.classList.add('note', 'hide-on-phone')
    note.innerHTML = 'Tip: Használd a "Space", vagy a "Tab" billentyűt a menü megnyitásához!'
    overlay.appendChild(note)

    const itemsContainer = document.createElement('ul')
    itemsContainer.classList.add('items-container')
    itemsContainer.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    indexedElements.forEach((item) => {
        let title
        if (item.children.length > 0) {
            title = item.querySelector('h1, h2, h3, h4, h5, h6').innerHTML.replace(/<[^>]*>?/gm, ' ')
        } else {
            title = item.innerHTML.replace(/<[^>]*>?/gm, ' ')
        }

        const listElem = document.createElement('li')
        const link = document.createElement('a')
        const attr = document.createAttribute("navigator-to")
        attr.value = item.getAttribute('navigator-index')
        link.setAttributeNode(attr)
        link.innerText = title
        link.addEventListener('click', () => {
            // if item is bigger than the screen, scroll to the top of it, otherwise scroll to the center
            // use scrollintoview
            if (item.getBoundingClientRect().height > window.innerHeight) {
                item.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
            }
            else {
                item.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
            }

            overlay.remove()
            clearSelection()
            selectedIndex = -1
            showScrollbar()
        })
        listElem.appendChild(link)
        itemsContainer.appendChild(listElem)
    })
    overlay.appendChild(itemsContainer)
    document.body.appendChild(overlay)

    itemsContainer.focus()

    if (currentlyViewing !== -1) {
        selectedIndex = currentlyViewing
        selectElement(currentlyViewing)
    }
});


// on scroll use IntersectionObserver to find out which element is currently taking up the most space
// and update the currentlyViewing variable
// if no element is intersecting, set currentlyViewing to -1

const observer = new IntersectionObserver((entries) => {
    if(document.documentElement.scrollTop === 0){
        currentlyViewing = -1
        return
    }

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            currentlyViewing = entry.target.getAttribute('navigator-index')
        }
    })
    console.log(currentlyViewing)
}, { threshold: 1 })


indexedElements.forEach((elem) => {
    observer.observe(elem)
})