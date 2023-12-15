const images = document.querySelectorAll('img');
images.forEach(image => {
  image.style.cursor = 'pointer';
  if(image.alt){
    image.title = image.alt
  }
  const draggable = document.createAttribute('draggable');
  draggable.value = false;
  image.attributes.setNamedItem(draggable)
  image.addEventListener('click', () => {
    if (window.innerWidth < 1000) return;
    hideScrollbar()

    // Create big picture overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Create image element for the clicked image
    const bigImage = document.createElement('img');
    bigImage.src = image.src;

    const closeIcon = document.createElement('span');
    closeIcon.classList.add('close');
    closeIcon.innerHTML = 'x';

    closeIcon.addEventListener('click', () => {
      overlay.remove();
      showScrollbar()
    });

    overlay.addEventListener('click', () => {
      overlay.remove();
      showScrollbar()
    });

    bigImage.addEventListener('click', e => {
      e.stopPropagation();
    });
    
    // Append the big image to the overlay
    overlay.appendChild(bigImage);
    overlay.appendChild(closeIcon);

    // prepend the overlay to the body
    document.body.prepend(overlay);
  });
});