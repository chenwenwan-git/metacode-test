//首页的js实现
const slideData = [
    {
        url: 'images/1.209d7f7.png'
    },
    { url: 'images/2.002866c.png' },
    { url: 'images/3.31fdb14.png' },
]

// 获取元素
const slideImg = document.querySelector('.home .banner img')

// 右侧按钮切换实现
// 获取右侧按钮
const next = document.querySelector('.home .next')
let i = 0
// 注册点击事件
next.addEventListener('click', function () {
    i++
    i %= slideData.length
    // 调用渲染函数
    toggle()
})
// 左侧按钮切换实现
// 获取左侧按钮
const prev = document.querySelector('.home .prev')
prev.addEventListener('click', function () {
    i--
    if (i < 0) {
        i = slideData.length - 1
    }
    // 调用渲染函数
    toggle()
})


// 声明一个渲染函数作为复用
function toggle() {
    // 渲染数据
    slideImg.src = slideData[i].url
    // 把之前的响应bar去掉

    document.querySelector('.home .bar .active-bar').classList.remove('active-bar')
    // 给当前bar添加响应
    document.querySelector(`.home .bar span:nth-child(${i + 1})`).classList.add('active-bar')
}

// bar的点击事件
//采取事件委托实现切换
// 获取元素
const bar1 = document.querySelector('.home .bar')
//添加事件

bar1.addEventListener('click', function (e) {
    //对span标签进行操作
    if (e.target.tagName === 'SPAN') {
        //排他思想
        document.querySelector('.home .bar .active-bar').classList.remove('active-bar')
        //this指向函数的调用者，所以这里不可以用this
        e.target.classList.add('active-bar')
        const id = +e.target.dataset.id
        // console.log(e.target.dataset)
        // console.log(id)
        //排他，实现内容切换
        slideImg.src = slideData[id].url


    }
})


// 定时模块
// 开启定时器,应该从第一张开始
document.addEventListener('DOMContentLoaded', function () {
    let timerId = setInterval(function () {
        // 利用js自动调用点击事件！！
        next.click()
    }, 1000)
    //鼠标经过停止定时器,！！事件源应该是一整个大盒子
    const slide = document.querySelector('.home .banner')
    slide.addEventListener('mouseenter', function () {
        clearInterval(timerId)
    })
    //鼠标离开开启定时器,！！事件源应该是一整个大盒子

    slide.addEventListener('mouseleave', function () {
        //为什么还要关呢,为了把原来的计时清掉
        clearInterval(timerId)
        //开启定时器
        timerId = setInterval(function () {
            // 利用js自动调用点击事件！！
            next.click()
        }, 1000)
    })


});


//tab切换
//采取事件委托实现tab切换
// 获取ul
const ul = document.querySelector('.header .nav ul')
//添加事件
ul.addEventListener('click', function (e) {
    //对a标签进行操作
    if (e.target.tagName === 'A') {
        //排他思想
        document.querySelector('.header .nav .active').classList.remove('active')
        //this指向函数的调用者，所以这里不可以用this
        e.target.classList.add('active')
        const id = +e.target.dataset.id
        //排他，实现tab内容切换
        if (id < 3) {
            document.querySelector('.tab-content .active').classList.remove('active')
            document.querySelector(`.tab-content .item:nth-child(${id + 1})`).classList.add('active')
        }
    }
})
const footerTabToIntroduction = document.querySelector('.footer .tab-to-introduction')
footerTabToIntroduction.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.header .nav .active').classList.remove('active')
    document.querySelector('.header .nav .introduction_2').classList.add('active')
    document.querySelector('.tab-content .active').classList.remove('active')
    document.querySelector(`.tab-content .item:nth-child(2)`).classList.add('active')
})
