//设置preview容器
//点击图片时显示容器，同时按照实际更改图片
//底部设置预览栏，显示图片缩图
//点击缩图实现容器的图片切换
//用margin实现缩图条的运动?
//播放功能
//图片数组
slideImg1 = ['images/intro/1_1.ae69708.jpg', 'images/intro/1_2.7e475dc.jpg', 'images/intro/1_3.25e50cc.jpg', 'images/intro/1_4.d6ba91f.jpg', 'images/intro/1_5.d227626.jpg']
slideImg2 = ['images/intro/2_1.a3b3429.jpg', 'images/intro/2_2.b0a8f0a.jpg']
slideImg3 = ['images/intro/3_1.8095914.jpg', 'images/intro/3_2.99b669e.jpg', 'images/intro/3_3.0ce7d69.jpg', 'images/intro/3_4.d4550ce.jpg', 'images/intro/3_5.3549212.jpg', 'images/intro/3_6.5139928.jpg', 'images/intro/3_7.dbf9c00.jpg']
slideImg4 = ['images/intro/4_1.189ed56.jpg', 'images/intro/4_2.5f59082.jpg', 'images/intro/4_4.80a7bb3.jpg', 'images/intro/4_5.36465a2.jpg', 'images/intro/4_6.79492c9.jpg', 'images/intro/4_7.8748bd9.jpg', 'images/intro/4_8.7e8ebfd.jpg', 'images/intro/4_9.70d2928.jpg', 'images/intro/4_10.ade335f.jpg', 'images/intro/4_11.8b9bc13.jpg']
slideImg5 = ['images/intro/5_1.e46c84b.jpg', 'images/intro/5_2.e5cf117.jpg', 'images/intro/5_3.7ab6829.jpg', 'images/intro/5_4.cd489ce.jpg']
const box = document.querySelector('.environment-img-container')
const imageList = document.querySelector(".preview-container-bottom ul")
const previewImg = document.querySelector('.preview-container .big-img')
const zoom = document.querySelector('.preview-container .zoom-content')
const previewContainer = document.querySelector('.preview-container')
let targetImg;
let previewid = 0

box.addEventListener("click", function (e) {
    e.preventDefault();
    zoom.style.animationName = 'zoom1'
    previewContainer.style.display = "flex"

    if (e.target.tagName === 'IMG') {
        //重新赋值箭头部分的id
        previewid = 0;
        console.log(e.target.dataset.id)
        if (e.target.dataset.id == 1) {
            targetImg = slideImg1;
        } else if (e.target.dataset.id == 2) {
            targetImg = slideImg2;
        } else if (e.target.dataset.id == 3) {
            targetImg = slideImg3;
        } else if (e.target.dataset.id == 4) {
            targetImg = slideImg4;
        } else if (e.target.dataset.id == 5) {
            targetImg = slideImg5;
        }
        // 更改大的预览图
        previewImg.src = targetImg[0]
        // 清空之前创建的小li元素
        clearListItems();
        // 遍历targetImg数组,根据数量创建小li
        targetImg.forEach(imagePath => {

            // 创建一个新的li元素
            const listItem = document.createElement('li');

            // 创建一个img元素
            const imgElement = document.createElement('img');
            imgElement.src = imagePath;
            imgElement.alt = "图片";

            // 将img元素添加到li元素中
            listItem.appendChild(imgElement);

            // 将li元素添加到ul元素中
            imageList.appendChild(listItem);

        });
    }


});

// 清空ul中所有li的函数
function clearListItems() {
    while (imageList.firstChild) {
        imageList.removeChild(imageList.firstChild);
    }
}


//箭头切换事件
// 获取箭头元素
const previewPrev = document.querySelector('.preview-prev')
const previewNext = document.querySelector('.preview-next')


//注册右侧按钮点击事件
previewNext.addEventListener('click', function () {
    previewid++
    previewid %= targetImg.length
    changeImg()
})
//注册左侧按钮点击事件
previewPrev.addEventListener('click', function () {
    previewid--
    if (previewid < 0) {
        previewid = targetImg.length - 1
    }
    changeImg()
})

//更改预览函数
function changeImg() {
    previewImg.src = targetImg[previewid]

}

//注册关闭按钮点击事件
//获取元素
const previewClose = document.querySelector('.preview-close-button')
previewClose.addEventListener("click", function () {

    zoom.style.animationName = 'zoom2'
    // 设置计时器是为了让动画效果生效,与动画的时间一致
    setTimeout(() => {
        previewContainer.style.display = "none";
    }, 300);


})