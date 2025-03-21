//axios 公共配置
axios.defaults.baseURL = 'http://121.199.48.79:89'


// 热招职位部分
function getCarrerList() {
    //获取数据
    axios({
        url: '/jobs/cateList',
        method: 'GET',

    }).then(result => {
        const CarrerList = result.data.data

        //渲染数据
        const CarrerListstr = CarrerList.map(item => {
            return `  <div data-id="${item.categoryId}">
                            <span class='name'>${item.name}</span>
                            <span class='number'>共${item.count}个职位</span>
                            <span class='arrow' style="font-size: 16px;">&gt;</span>
                        </div>`
        })
        //解决每一个row的问题
        const CarrerListstr2 = [];
        for (let i = 0; i < CarrerListstr.length; i += 3) {
            const group = CarrerListstr.slice(i, i + 3);
            // 把当前组的元素组合成一个字符串
            let groupStr = group.join('');
            // 如果不足三个，补充空的 div
            for (let j = group.length; j < 3; j++) {
                groupStr += '<div style="visibility: hidden;"></div>';
                //将多出的盒子隐藏
            }
            CarrerListstr2.push(groupStr);
        }
        const finalstr = CarrerListstr2.map(function (ele, index) {
            return `<div class="row">${ele}</div>
`

        })

        document.querySelector('.career-boxs').innerHTML = finalstr


    })
    //
}
getCarrerList()


//搜索框搜索职位部分的数据渲染
//搜索框跳转,键盘输入
//取得input数据
//axios进行匹配渲染


//热招职位点击切换
const careerboxs = document.querySelector(".career-boxs")
// const MainContent = document.querySelector('.main-content-box')
const app = document.querySelector('#app')
// const SearchCareerIndex = document.querySelector('.search-career-index')
const searchResultBox = document.querySelector('.search-result-box')
// const navBc = document.querySelector('.background-box')
careerboxs.addEventListener("click", function (e) {
    if (e.target.tagName === 'DIV' && !e.target.classList.contains('row')) {
        MainContent.style.display = 'none'
        // app.style.display = 'none'
        SearchCareerIndex.style.display = 'flex'
        navBc.style.backgroundColor = '#DD4646'
        everyCareerbox.style.display = 'none'
        document.scrollingElement.scrollTop = 0

        // 获取数据
        axios({
            url: `http://121.199.48.79:89/jobs/jobList/${e.target.dataset.id}`,
            method: 'POST',


        }).then(result => {
            const allresult = result.data.data

            const newallData = allresult.map(item => {
                return ` <div class="every-result">
                    <a href="">
                        <div class="info">
                        <div style="display: flex;justify-content: flex-start;align-items: center;">
                                 <span
                            style="margin-right: 4px;height: 20px;width:20px;text-align:center;font-size: 12px;color:rgb(251,100,100);background-color: rgb(255,227,227);line-height: 20px;border-radius:5px;">急</span>
                            <div class="name" data-id="${item.id}">${item.name}</div></div>
                            <div class="time">
                                <span>发布于 2024-11-15</span>
                            </div>
                        </div>
                    </a>
                </div>`
            }).join("")
            const fliterConditionInfo = document.querySelector('.fliter-condition-info')
            fliterConditionInfo.innerHTML = `已选 0 条件 | ${allresult.length} 结果 | 清除`

            searchResultBox.innerHTML = newallData

        })
    }
})

const middleBox = document.querySelector('.middle')
//每条职位数据的点击事件
searchResultBox.addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.tagName === 'DIV' && e.target.classList.contains('name')) {
        MainContent.style.display = 'none'

        SearchCareerIndex.style.display = 'none'
        everyCareerbox.style.display = 'flex'
        navBc.style.backgroundColor = '#DD4646'
        document.scrollingElement.scrollTop = 0
        //渲染数据

        axios({
            url: `http://121.199.48.79:89/jobs/jobInfo/${e.target.dataset.id}`,
            method: 'POST',


        }).then(result => {
            const inforesult = result.data.data

            middleBox.innerHTML = `             <div class="info-box">
                <div class="box-top">
                    <div class="name-share">
                        <div class="career-name" style="font-size: 25px;">
                            <span>${inforesult.jobName}</span>
                        </div>
                      
                          <div style="text-align: center;">
                    <span style="color:rgb(133, 137, 166)";font-size: 14px;>分享</span>
                    <span style="font-family: 'icomoon';color:rgb(133, 137, 166);"></span>
                </div>
                    </div>
                    <div class="pos-time-apply">
                        <div class="pos-time">
                            <span class="pos" style="margin-bottom: 10px;color:#989CB2;">广东广州市</span>
                            <span class="time" style="color:#989CB2;">发布于2025-03-05</span>
                        </div>
                        <button class="apply" style="cursor:pointer">申请职位</button>
                    </div>
                </div>
                <div class="box-middle">
                    <h2 style="font-weight: normal;">职位描述</h2>
                    <span>${inforesult.jobDesc}</span>
                </div>
                <div class="box-bottom">
                    <h2 style="font-weight: normal;">职位信息</h2>
                    <div class="container-box">
                        <div class="time">
                            <span class="title-span">发布日期</span>
                            <span>2025-03-05</span>
                        </div>
                        <div class="kind">
                            <span class="title-span">职位类别</span>
                            <span></span>
                        </div>
                        <div class="name">
                            <span class="title-span">职位名称</span>
                            <span>${inforesult.jobName}</span>
                        </div>
                    </div>
                </div>
                 <div class="footer-button">
                <button class="apply" style="cursor:pointer">申请职位</button>
            </div>

            </div>
        `

        })
    }
    //要链接跳转还是切换就可以
    //实现跳转


}
)
middleBox.addEventListener('click', function (e) {
    if (e.target.classList.contains('apply')) {
        if (localStorage.getItem('token')) {
            alert("可以申请职位")

        } else {
            alert('请先登陆')
            //弹出登陆框
            overlay.style.display = 'flex';

            popup.style.display = 'flex';
        }
    }
})

loginButton2.addEventListener('click', function () {
    if (document.querySelector('.agreement input').checked) {
        axios({
            url: 'http://121.199.48.79:89/users/register',
            method: 'post',
            data: {

                // cww
                // 111111
                userName: usernameInput.value,
                passWord: passwordFirstInput.value,

            }
        }).then(result => {

            console.log(result.data.data)
            axios({
                url: 'http://121.199.48.79:89/users/login',
                method: 'post',
                data: {

                    userName: usernameInput.value,
                    passWord: passwordFirstInput.value,
                }
            }).then(result => {
                //存储token，对应是result.data.data
                localStorage.setItem('token', result.data.data)
                signBtn.style.display = 'none'
                personinfo.style.display = 'block'
                //让登陆弹框消失
                overlay.style.display = 'none';
                popup.style.display = 'none';
            })
        })
    } else {
        // 后面修改这里的样式
        alert('请先勾选隐私协议')
    }
})


// //登陆按钮的点击事件
// loginButton2.addEventListener('click', function () {
//     const phoneNumberValue = document.querySelector('.phone-login-form input').value
//     const vertNumberValue = document.querySelector('.vert input').value

//     //本地存储登陆状态，下次加载可以登陆？
//     if (document.querySelector('.agreement input').checked) {
//         console.log('可以提交请求了')
//         axios({
//             url: '/users/register',
//             method: 'post',
//             data: {
//                 "userId": 0,
//                 "userName": "chen",
//                 "passWord": vertNumberValue,
//                 "phoneNumber": phoneNumberValue,
//                 "email": "none"


//             }
//         }).then(result => {
//             console.log(result)

//             // 如果成功了的话，就让person显示
//             loginINg = 1
//             signBtn.style.display = 'none'
//             personinfo.style.display = 'block'
//             localStorage.setItem('token', result.data.data.token)
//         }).catch(error => {
//             console.dir(error)
//         })


//     }
//     else {
//         // 后面修改这里的样式
//         alert('请先勾选隐私协议')
//     }
// })
