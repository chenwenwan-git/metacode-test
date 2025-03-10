const loginPopup = document.getElementById('login-popup');
const phoneLoginTab = document.getElementById('phone-login-tab');
const emailLoginTab = document.getElementById('email-login-tab');
const phoneLoginForm = document.querySelector('.phone-login-form');
const emailLoginForm = document.querySelector('.email-login-form');
let flagLogin = false;
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



//正则表达式实现部分
//  手机号输入框失去焦点时的校验
const phoneInput = document.querySelector('.phone-login-form .input-group input')
const emailInput = document.querySelector('.email-login-form .input-group input')
const vertInput = document.querySelector('.vert .input-group input')
const phoneErrorBox = document.querySelector('.phone-login-form .error-box')
const emailErrorBox = document.querySelector('.email-login-form .error-box')
const vertErrorBox = document.querySelector('.vert .error-box')
const phoneRegex = /^1[3-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.com$/;
const vertRegex = /^\d{6}$/;
const phoneErrorText = document.querySelector('.phone-login-form .error-box .error-text')
const emailErrorText = document.querySelector('.email-login-form .error-box .error-text')
const vertErrorText = document.querySelector('.vert .error-box .error-text')
const loginButton2 = document.querySelector('.popup-content .bottom .login-button')



//封装函数
function handleFocus(inputbox, errorbox) {
    errorbox.style.visibility = 'hidden';
    inputbox.style.outline = '1px solid #0068FF';
}
function handleBlur(inputbox, regex, errorbox, errorText, emptyErrorMsg, formatErroeMsg) {

    if (!regex.test(inputbox.value)) {
        errorbox.style.visibility = 'visible';
        inputbox.style.outline = '1px solid #F03E3E';
        if (!inputbox.value) {
            errorText.innerHTML = emptyErrorMsg;
        }
        else {
            errorText.innerHTML = formatErroeMsg;
        }
        return false;
    } else {
        errorbox.style.visibility = 'hidden';
        inputbox.style.outline = 'none';
        return true;
    }
}

//手机号输入模块
phoneInput.addEventListener('blur', function () {
    handleBlur(phoneInput, phoneRegex, phoneErrorBox, phoneErrorText, '请输入手机号', '请输入正确的手机号');
}
)
phoneInput.addEventListener('focus', function () {
    handleFocus(phoneInput, phoneErrorBox);
})

//邮箱输入模块
emailInput.addEventListener('blur', function () {
    handleBlur(emailInput, emailRegex, emailErrorBox, emailErrorText, '请输入邮箱', '请输入正确的邮箱');
}
)
emailInput.addEventListener('focus', function () {
    handleFocus(emailInput, emailErrorBox);
})

//验证码输入模块
vertInput.addEventListener('blur', function () {
    handleBlur(vertInput, vertRegex, vertErrorBox, vertErrorText, '请输入验证码', '请输入六位验证码');
}
)
vertInput.addEventListener('focus', function () {
    handleFocus(vertInput, vertErrorBox);
})

//如果输入框内容没有完善的话，登陆按钮不可点
// 监听手机号,邮箱和验证码输入框的input事件，控制登录按钮的可点击状态
// loginButton2.addEventListener('click', function () {
//     console.log(2222222222222)
// })

const inputsToCheck = [phoneInput, emailInput, vertInput];
inputsToCheck.forEach(input => {
    input.addEventListener('input', checkInputs);
});

function checkInputs() {
    const isPhoneValid = handleBlur(phoneInput, phoneRegex, phoneErrorBox, phoneErrorText, '请输入手机号', '请输入正确的手机号');
    const isEmailValid = handleBlur(emailInput, emailRegex, emailErrorBox, emailErrorText, '请输入邮箱', '请输入正确的邮箱');
    const isVertValid = handleBlur(vertInput, vertRegex, vertErrorBox, vertErrorText, '请输入验证码', '请输入六位验证码');

    let isValid = false;
    // !!需要区分是哪一种登陆方式
    // if ((isPhoneValid && isVertValid) || (isEmailValid && isVertValid)) 错误？
    if (phoneLoginForm.style.display === 'block') {
        isValid = isPhoneValid && isVertValid;
    } else if (emailLoginForm.style.display === 'block') {
        isValid = isEmailValid && isVertValid;
    }

    if (isValid) {
        loginButton2.disabled = false;
        loginButton2.style.cursor = 'pointer';
    } else {
        loginButton2.disabled = true;
        loginButton2.style.cursor = 'not-allowed';
    }
}