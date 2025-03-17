// 热招职位部分
function getCarrerList() {
    //获取数据
    axios({
        url: 'http://121.199.48.79:89/jobs/cateList',
        method: 'GET',

    }).then(result => {
        const CarrerList = result.data.data
        console.log(result.data.data)
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
            }
            CarrerListstr2.push(groupStr);
        }
        const finalstr = CarrerListstr2.map(function (ele, index) {
            return `<div class="row">${ele}</div>
`

        })

        document.querySelector('.career-boxs').innerHTML = finalstr

        console.log(finalstr)
    })
    //
}
getCarrerList()
console.log(1)

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
                            <div class="name" data-id="${item.id}">${item.name}</div>
                            <div class="time">
                                <span>发布于 2024-11-15</span>
                            </div>
                        </div>
                    </a>
                </div>`
            }).join("")
            const fliterConditionInfo = document.querySelector('.fliter-condition-info')
            fliterConditionInfo.innerHTML = `已选 0 条件 | ${allresult.length} 结果 | 清除`
            console.log(newallData)
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
        // app.style.display = 'none'
        SearchCareerIndex.style.display = 'none'
        everyCareerbox.style.display = 'flex'
        navBc.style.backgroundColor = '#DD4646'
        document.scrollingElement.scrollTop = 0
        //渲染数据
        console.log('点到了')
        console.log(e.target.dataset.id)
        axios({
            url: `http://121.199.48.79:89/jobs/jobInfo/${e.target.dataset.id}`,
            method: 'POST',


        }).then(result => {
            console.log('success')
            console.log(result.data.data)
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
                            <span class="pos" style="margin-bottom: 10px;">广东广州市</span>
                            <span class="time">发布于2025-03-05</span>
                        </div>
                        <button class="apply">申请职位</button>
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
                <button class="apply">申请职位</button>
            </div>

            </div>
        `

        })
    }
    //要链接跳转还是切换就可以
    //实现跳转
}
)