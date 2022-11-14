// arrow animation 

const topIcon = document.getElementById('topIcon');
const backText = document.getElementById('back');

backText.addEventListener('mouseover', () => {
    topIcon.style.cssText = 'transform: translateX(-1rem); transition: all .3s';
});

backText.addEventListener('mouseout', () => {
    topIcon.style.cssText = 'margin-right:0rem; transition: all .3s';
});


const passwordIcon = document.querySelector('.details__icon');
const passwordInput = document.querySelector('.details__input--password');
const togglePassword = document.querySelector("#togglePassword");

passwordIcon.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === "password" ? "text" : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle("bi-eye");

})

