// валидация формы
let inputs = document.querySelectorAll('form input');
document.querySelector('form').onsubmit = function (e) {
    let error = false;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].classList.add('err');
            error = true;
        } else {
            inputs[i].classList.remove('err');
        }
    }
    if (error) {
        e.preventDefault();
    }

};
