const slideData2 = [
    {
        url: '../images/1.9f9e1bc.png', icon: '../images/icon.24806db.png', p: '末世科幻题材，二次元3D动作手游<br>游戏中你将化身为指挥官，带领人类最后的希望---仿生人形<br>构造体，共同对抗被“帕弥什”侵蚀的机械大军。', h2: '<br>指挥官，你准备好了吗？', gamename: 'GRAY<br>RAVEN', line: '——'
    },
    {
        url: '../images/mc.763c1de.jpg', icon: '../images/mc-logo.773afe6.png', p: '《鸣潮》是一款开放世界动作游戏，<br>主打高自由度的动作战斗玩法与丰富多样的开放世界探索。<br>而你，在这个世界苏醒的漂泊者，<br>将在找回记忆、寻找自我身份的同时结实无数的共鸣者同伴，<br>并和伙伴们一起踏上跨越悲鸣的旅途。', h2: '鸣潮往复，文明不屈', gamename: 'WUTHERING <br>WAVES', line: '——'
    },
    {
        url: '../images/kurobbs.638109e.jpg', icon: '../images/kurobbs-logo.47d6996.png', p: '库街区是库洛游戏官方社区APP，<br>在这里集合了游戏资讯、社交聊天、<br>实用工具、攻略干货、游戏福利等内容。', h2: '<br>期待与你在库街区相遇', gamename: '', line: ''
    }
]

// 获取元素
const slideImg2 = document.querySelector('.product .banner img')
const iconImg = document.querySelector('.product .icon img')
const pText = document.querySelector('.product .banner p')
const hText = document.querySelector('.product .banner h2')
const gamenameText = document.querySelector('.product .banner .game-name h2')
const line = document.querySelector('.product .game-name h3')

// 右侧按钮切换实现
// 获取右侧按钮
const next2 = document.querySelector('.product .next')
let j = 0
// 注册点击事件
next2.addEventListener('click', function () {
    j++

    j %= slideData2.length
    // 调用渲染函数
    toggle2()
})
// 左侧按钮切换实现
// 获取左侧按钮
const prev2 = document.querySelector('.product .prev')
prev2.addEventListener('click', function () {
    j--
    if (j < 0) {
        j = slideData2.length - 1
    }
    // 调用渲染函数
    toggle2()
})



// 声明一个渲染函数作为复用
function toggle2() {
    // 渲染数据
    slideImg2.src = slideData2[j].url
    iconImg.src = slideData2[j].icon
    pText.innerHTML = slideData2[j].p
    hText.innerHTML = slideData2[j].h2
    gamenameText.innerHTML = slideData2[j].gamename
    line.innerHTML = slideData2[j].line

    // 把之前的响应bar去掉
    document.querySelector('.product .bar .active-bar').classList.remove('active-bar')

    // 给当前bar添加响应
    document.querySelector(`.product .bar span:nth-child(${j + 1})`).classList.add('active-bar')
}
document.addEventListener('DOMContentLoaded', function () {
    // 定时模块
    // 开启定时器,应该从第一张开始
    let timerId2 = setInterval(function () {
        // 利用js自动调用点击事件！！
        next2.click()
    }, 1000)

    //鼠标经过停止定时器,！！事件源应该是一整个大盒子
    const slide2 = document.querySelector('.product .banner')
    slide2.addEventListener('mouseenter', function () {
        clearInterval(timerId2)
    })
    //鼠标离开开启定时器,！！事件源应该是一整个大盒子

    slide2.addEventListener('mouseleave', function () {
        //为什么还要关呢,为了把原来的计时清掉
        clearInterval(timerId2)
        //开启定时器
        timerId2 = setInterval(function () {
            // 利用js自动调用点击事件！！
            next2.click()
        }, 1000)
    })
});