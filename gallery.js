const viewer = document.querySelector('#viewer');
for (const button of document.querySelectorAll('.stills button')) {
  button.onclick = () => {
    const image = viewer.querySelector('img');
    image.src = button.firstElementChild.src;
    image.alt = button.firstElementChild.alt;
    viewer.showModal();
  };
}

