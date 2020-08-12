console.log("let's code our gallery!");

function Gallery(gallery) {

  if (!gallery) {  //If I don't have this specific parameter, it will through an arror
  throw Error('No Gallerry Found!!!');
    //through an error(no gallery found);

  }
  //Select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    console.info('Open this modal ....')

    if(modal.matches('.open')) {
      console.info('Modal already open');
      return; //stop the function from running
    }

    modal.classList.add('open');

    // Event listeners to be bound when we open from running
    window.addEventListener('keyup', handleKeyUp);
    modal.addEventListener('click', handleClickOutside);
    nextButton.addEventListener('click', showNextImage);
    // prevButton.addEventListener('click', showPrevButton);
    prevButton.addEventListener('click', showPrevImage);
  };

  function closeModal() {
    modal.classList.remove('open');

    //TODO add events listeners for click and the keyboard
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    modal.removeEventListener('click', handleClickOutside);
    prevButton.removeEventListener('click', showPrevImage);
  
  };

  function showPrevImage() {
    showImage(currentImage.previousElementSibling ||
      gallery.lastElementChild);
  }

  // function showPrevButton() {
  //   showImage(currentImage.previousElementSibling);
  // }
  
  function showNextImage() {
    showImage(currentImage.nextElementSibling ||
    gallery.firstElementChild);
  };

  function handleKeyUp(e) {
    if(e.key === 'Escape')
      closeModal();
      if(e.key === 'ArrowRight') {
        showNextImage();
      }
      if(e.key === 'ArrowLeft') {
        showPrevImage();
      }
  };

  function handleClickOutside(e) {
    if(e.currentTarget === e.target) {
      closeModal();
    }
  }

  function showImage(el) {
    if(!el) {
      console.info('no image to show');
      return;
    };

    //update the modal with this info
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    //store a reference of the current image,  
    currentImage = el;
    openModal();
  }

  images.forEach(image => {
    image.addEventListener('click', e => showImage(e.currentTarget));
  });

  //loop over each image 

  images.forEach(image =>
    //attach an event listener for each image
    image.addEventListener('keyup', e => {
      //when that is keyup'd, check if it is an enter
    if(e.key === 'Enter') {
      showImage(e.currentTarget);
    }
  }))
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));