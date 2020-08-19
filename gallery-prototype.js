console.log("let's code our gallery!");

function Gallery(gallery) {

  if (!gallery) {  //If I don't have this specific parameter, it will through an arror
  throw Error('No Gallerry Found!!!');
    //through an error(no gallery found);
  }
  this.gallery = gallery;

  //Select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  this.images.forEach(image => {
    image.addEventListener('click', e => this.showImage(e.currentTarget));
  });

  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  //loop over each image 

  this.images.forEach(image =>
    //attach an event listener for each image
    image.addEventListener('keyup', e => {
      //when that is keyup'd, check if it is an enter
    if(e.key === 'Enter') {
      this.showImage(e.currentTarget);
    }
  }))
}

Gallery.prototype.openModal = function () {
    console.info('Open this modal ....')

    if(this.modal.matches('.open')) {
      console.info('Modal already open');
      return; //stop the function from running
    }

    this.modal.classList.add('open');

    // Event listeners to be bound when we open from running
    window.addEventListener('keyup', this.handleKeyUp);
    this.modal.addEventListener('click', this.handleClickOutside);
    this.nextButton.addEventListener('click', this.showNextImage);
    // prevButton.addEventListener('click', showPrevButton);
    this.prevButton.addEventListener('click', this.showPrevImage);
  };

  Gallery.prototype.closeModal = function () {
    this.modal.classList.remove('open');

    //TODO add events listeners for click and the keyboard
    window.removeEventListener('keyup', this.handleKeyUp);
    this.nextButton.removeEventListener('click', this.showNextImage);
    this.modal.removeEventListener('click', this.handleClickOutside);
    this.prevButton.removeEventListener('click', this.showPrevImage);
  
  };

  Gallery.prototype.showPrevImage = function () {
    this.showImage(this.currentImage.previousElementSibling ||
      this.gallery.lastElementChild);
  }

  // function showPrevButton() {
  //   showImage(currentImage.previousElementSibling);
  // }
  
  Gallery.prototype.showNextImage = function () {
    this.showImage(this.currentImage.nextElementSibling ||
    this.gallery.firstElementChild);
  };

  Gallery.prototype.handleKeyUp = function (e) {
    if(e.key === 'Escape')
      this.closeModal();
      if(e.key === 'ArrowRight') {
        this.showNextImage();
      }
      if(e.key === 'ArrowLeft') {
        this.showPrevImage();
      }
  };

  Gallery.prototype.handleClickOutside = function (e) {
    if(e.currentTarget === e.target) {
      this.closeModal();
    }
  }

  Gallery.prototype.showImage = function (el) {
    if(!el) {
      console.info('no image to show');
      return;
    };

    //update the modal with this info
    console.log(el);
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    //store a reference of the current image,  
    this.currentImage = el;
    this.openModal();
  }


const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
console.log(gallery1, gallery2);