// определение поддержки webp
// function testWebP(callback) {
//     var webP = new Image();
//     webP.onload = webP.onerror = function () {
//         callback(webP.height == 2);
//     };
//     webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }    
// testWebP(function (support) {    
//     if (support == true) {
//         document.querySelector('body').classList.add('webp');
//     }else{
//         document.querySelector('body').classList.add('no-webp');
//     }
// });

// бургер меню 
// let iconMenu = document.querySelector('.icon-menu');
// let menu = document.querySelector('.menu');
// let stopScroll = document.querySelector('body');
// iconMenu.addEventListener('click', function() {
//     iconMenu.classList.toggle('is-active');
//     menu.classList.toggle('is-active');
//     stopScroll.classList.toggle('overflow-hidden');
// });

//  Динамический размер шапки
// window.addEventListener('scroll', progress);

// function progress(e) {
//     let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
//     let headerBody = document.querySelector('.header__body');
//     if (windowScroll > 100) {        
//         headerBody.classList.add('smaller')        
//     } else { 
//         headerBody.classList.remove('smaller')
//     }
// }