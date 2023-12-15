
// Get all the anchor tags on the page
const links = document.querySelectorAll('a');

// Loop through each link
links.forEach(link => {
  // Check if the link is an external link
  if (link.hostname !== window.location.hostname && !link.href.startsWith('#') && !link.href.startsWith('javascript')) {
    // Add a click event listener to the link
    link.addEventListener('click', e => {
      // Prevent the default link behavior
      e.preventDefault();

      // Display the warning modal
      createModal(link.href);
    });
  }
});

function createModal(href) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  overlay.addEventListener('click', () => {
    overlay.remove();
    showScrollbar()
  })

  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.addEventListener('click', e => {
    e.stopPropagation();
  })

  const title = document.createElement('h3');
  title.innerHTML = `${(new URL(href)).hostname.replace(/^www\./, '')}`;
  modal.appendChild(title);

  const message = document.createElement('p');
  message.innerHTML = 'Egy külső weboldalt készülsz megnyitni! Biztosan folytatni szeretnéd?';
  modal.appendChild(message);

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  hideScrollbar()

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('secondary');
  cancelButton.innerHTML = 'Mégsem';
  cancelButton.addEventListener('click', () => {
    overlay.remove();
    showScrollbar()
  });
  buttons.appendChild(cancelButton);

  const continueButton = document.createElement('button');
  continueButton.classList.add('primary');
  continueButton.innerHTML = 'Megnyitás';
  continueButton.addEventListener('click', () => {
    window.open(href, '_blank');
    overlay.remove();
    showScrollbar()
  });
  buttons.appendChild(continueButton);

  modal.appendChild(buttons);

  overlay.appendChild(modal);

  document.body.appendChild(overlay);
}
