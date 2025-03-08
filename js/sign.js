// const closeButton = document.querySelector('.close');
const loginPopup = document.getElementById('login-popup');
const phoneLoginTab = document.getElementById('phone-login-tab');
const emailLoginTab = document.getElementById('email-login-tab');
const phoneLoginForm = document.querySelector('.phone-login-form');
const emailLoginForm = document.querySelector('.email-login-form');

// closeButton.addEventListener('click', function () {
//     loginPopup.style.display = 'none';
// });

phoneLoginTab.addEventListener('click', function () {
    phoneLoginTab.classList.add('active');
    emailLoginTab.classList.remove('active');
    phoneLoginForm.style.display = 'block';
    emailLoginForm.style.display = 'none';
});

emailLoginTab.addEventListener('click', function () {
    phoneLoginTab.classList.remove('active');
    emailLoginTab.classList.add('active');
    phoneLoginForm.style.display = 'none';
    emailLoginForm.style.display = 'block';
});