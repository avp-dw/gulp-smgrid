
window.addEventListener('scroll', progress);

function progress(e) {
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let headerBody = document.querySelector('.header__body');
    if (windowScroll > 100) {        
        headerBody.classList.add('smaller')        
    } else { 
        headerBody.classList.remove('smaller')
    }
}
