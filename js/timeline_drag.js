//获取图片对象
let timelineImage = document.querySelector('.develop .timeline_img')
let slider = document.querySelector('.dragger-red')
let flag = false;
let parentoffsetLeft;
let offsetX;
//拖拽功能
//鼠标放在图片上，按住不动实现拖拽
//限制拖拽范围
//鼠标点击时，距离边界的数据（x和y），可以通过e.offsetX和e.offsetY得到
timelineImage.addEventListener('mousedown', (e) => {
    offsetX = e.offsetX;


    let parent = timelineImage.parentNode;
    parentoffsetLeft = parent.getBoundingClientRect().left;

    flag = true;


})
document.addEventListener('mousemove', (e) => {
    if (flag) {
        let drag_left = e.clientX - parentoffsetLeft - offsetX;
        let parentWidth = timelineImage.parentNode.offsetWidth;
        let imgWidth = timelineImage.offsetWidth
        let minLeft = 0;
        let maxLeft = parentWidth - imgWidth;
        // 设置拖拽边界
        drag_left = Math.min(minLeft, Math.max(drag_left, maxLeft));
        console.log(drag_left)
        timelineImage.style.left = drag_left + 'px';
        // 设置滑块一起动
        // 让滑块跟着动，假设按相同比例移动
        let sliderMaxLeft = slider.parentNode.offsetWidth - slider.offsetWidth;
        // 跟图片的滑动比例
        let moveRatio = drag_left / maxLeft;
        let sliderLeft = sliderMaxLeft * moveRatio;
        slider.style.left = sliderLeft + 'px';

    }
})

// 鼠标松开事件
document.addEventListener("mouseup", () => {
    flag = false;
})


