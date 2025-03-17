// 设置箭头效果
// 当箭头hover时，透明度变高，加上transition
// 设置定时器，同首页的效果

const slideData = [
    {
        url: '../images/1.png'
    },
    { url: '../images/2.png' },

]

// 获取元素
const slideImg = document.querySelector('.banner img')

// 右侧按钮切换实现
// 获取右侧按钮
const next = document.querySelector('.banner .next')
let i = 0
// 注册点击事件
next.addEventListener('click', function (e) {
    e.preventDefault();
    i++
    i %= slideData.length
    // 调用渲染函数
    toggle()
})
// 左侧按钮切换实现
// 获取左侧按钮
const prev = document.querySelector('.banner .prev')
prev.addEventListener('click', function (e) {
    // 阻止默认事件
    e.preventDefault();
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

    document.querySelector('.banner .bar .active-bar').classList.remove('active-bar')
    // 给当前bar添加响应
    document.querySelector(`.banner .bar span:nth-child(${i + 1})`).classList.add('active-bar')
}

// 定时模块
// 开启定时器,应该从第一张开始
document.addEventListener('DOMContentLoaded', function () {
    let timerId = setInterval(function () {
        // 利用js自动调用点击事件！！
        next.click()
    }, 2000)
    //鼠标经过停止定时器,！！事件源应该是一整个大盒子
    const slide = document.querySelector('.banner')
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
        }, 2000)
    })


});


//导航栏模块
const recruimentNav = document.querySelector('.tab-sign .tab')
const hot = document.querySelector('.hot')
const tab1 = document.querySelector('.tab-sign .tab .tab1')
const tab2 = document.querySelector('.tab-sign .tab .tab2')

//监听页面高度
window.addEventListener('scroll', function () {

    const oldtab = document.querySelector('.tab-sign .tab .active')
    //到达hot区域


    const n = document.documentElement.scrollTop
    if (n >= hotCareer.getBoundingClientRect().top) {
        if (oldtab)
            oldtab.classList.remove('active')
        tab2.classList.add('active')

    } else {
        if (oldtab)
            oldtab.classList.remove('active')
        tab1.classList.add('active')
    }

})
const SearchCareerIndex = document.querySelector('.search-career-index')
const navBc = document.querySelector('.background-box')
const everyCareerbox = document.querySelector('.everyCareerinfobox')
recruimentNav.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.tagName === "A") {
        //这部分由其他页面跳转回去的先搁置
        // MainContent.style.display = 'flex'

        // SearchCareerIndex.style.display = 'none'
        // navBc.style.backgroundColor = 'transparent'
        //实现页面跳转
        const tabid = +e.target.dataset.id
        if (tabid == 0) {

            document.documentElement.scrollTop = 0;

        } else if (tabid == 1) {
            document.documentElement.scrollTop = hot.offsetHeight + 100;
        }
        const oldtab = document.querySelector('.tab-sign .tab .active')
        if (oldtab)
            oldtab.classList.remove('active')
        e.target.classList.add('active')
    }
})

//底部bar点击事件
// bar的点击事件
//采取事件委托实现切换
// 获取元素
const RecruimentBar = document.querySelector('.recruitment-bar')
//添加事件


RecruimentBar.addEventListener('click', function (e) {
    //对span标签进行操作
    if (e.target.tagName === 'SPAN') {
        //排他思想
        document.querySelector('.recruitment-bar .active-bar').classList.remove('active-bar')

        e.target.classList.add('active-bar')
        const id = +e.target.dataset.id

        //排他，实现内容切换
        slideImg.src = slideData[id].url


    }
})