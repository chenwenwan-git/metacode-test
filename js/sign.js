
const usernameInput = document.querySelector('.username .input-group input')
const passwordFirstInput = document.querySelector('.password-first .input-group input')
const passwordVertInput = document.querySelector('.password-vert .input-group input')
const errorbox = document.querySelector('.error-box')

const loginButton2 = document.querySelector('.popup-content .bottom .login-button')





const inputsToCheck = [usernameInput, passwordFirstInput, passwordVertInput];
inputsToCheck.forEach(input => {
    input.addEventListener('input', checkInputs);
});

//实时监测第二次密码的输入是否与第一次输入的代码相同
function checkInputs() {
    passwordVertInput.addEventListener('input', function () {
        if (passwordVertInput.value == passwordFirstInput.value && passwordFirstInput.value) {


            errorbox.style.visibility = 'hidden';

        } else {
            errorbox.style.visibility = 'visible';


        }
    }
    )
    passwordFirstInput.addEventListener('input', function () {
        if (passwordVertInput.value == passwordFirstInput.value && passwordFirstInput.value) {


            errorbox.style.visibility = 'hidden';

        } else {
            errorbox.style.visibility = 'visible';


        }
    })

    // 判断登陆按钮是否可以点击
    if ((passwordVertInput.value == passwordFirstInput.value) && usernameInput.value) {
        loginButton2.disabled = false;
        loginButton2.style.cursor = 'pointer';
    } else {
        loginButton2.disabled = true;
        loginButton2.style.cursor = 'not-allowed';
    }
}

