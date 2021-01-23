
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    540: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    960: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
});