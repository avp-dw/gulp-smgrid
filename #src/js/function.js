// определение поддержки webp
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}    
testWebP(function (support) {    
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
        document.querySelector('body').classList.add('no-webp');
    }
});

// замена img на background-image
function ibg() {
    $.each($('.ibg'), function(index, val) {
        if($(this).find('img').length>0) {
            $(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
        }
    });
}
ibg();

// бургер меню 
let iconMenu = document.querySelector('.icon-menu');
let menu = document.querySelector('.menu');
let stopScroll = document.querySelector('body');
iconMenu.addEventListener('click', function() {
    iconMenu.classList.toggle('is-active');
    menu.classList.toggle('is-active');
    stopScroll.classList.toggle('overflow-hidden');
});


