//获取热招职位信息
// 封装函数
function getCarrerList() {
    //获取数据
    axios({
        url: 'http://121.199.48.79:89/jobs/cateList',

    }).then(result => {
        console.log(result)
    })


}

// 网页加载时调用一次


// 登陆按钮点击事件
document.querySelector('.login-button').addEventListener('click', function () {
    //用户信息
    const phone = document.querySelector('.phone-login-form input').value
    const vertnumber = document.querySelector('.vert input').value
    //提交数据到服务器
    axios({
        url: 'http//121.199.48.79:89//users/register',
        method: 'POST',
        data: {
            userId: 0,
            passWord: vertnumber,
            phoneNumber: phone

        }
    }).then(result => {
        console.log(result)
    })
})