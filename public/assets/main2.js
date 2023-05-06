
const addSpeakerButton = document.getElementById('add-speaker');
const speakersGallery = document.getElementById('speakers');

addSpeakerButton.addEventListener('click', function() {
  // create new gallery item
  const newGalleryItem = document.createElement('div');
  newGalleryItem.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');
  newGalleryItem.innerHTML = `
    <div class="speakers-gallery-item" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="400">
      <div class="speakers-gallery-item-thumb overflow-hidden position-relative">
        <img src="assets/images/gallery/gallery1.jpg" alt="Gallery Image 1">
      </div>
      <div class="">
        <ul class="social-icons social">
          <li>
            <a href=""><i class="fa-brands fa-facebook-f"></i></a>
          </li>
          <li>
            <a href=""><i class="fa-brands fa-linkedin-in"></i></a>
          </li>
          <li>
            <a href=""><i class="fa-brands fa-twitter"></i></a>
          </li>
        </ul>
      </div>
      <div class="item-content">
        <h3 class="title">New Speaker Name</h3>
        <span class="sub">New Speaker Title</span>
      </div>
    </div>
  `;
  
  // add new gallery item to speakers gallery
  speakersGallery.querySelector('.speakers-gallery-items-wrap .row').appendChild(newGalleryItem);
});