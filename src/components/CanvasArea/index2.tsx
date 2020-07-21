import React, {useEffect, useRef} from 'react'

window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function (callback) {
              setTimeout(callback, 1000/ 60);
            }
})();


const snowImage = new Image();
snowImage.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594752699692&di=ec7de8346e996b8d2692e5b6a31dd548&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F06%2F09%2F725b8c2717d295d62b6d00cd04d89193.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue';
class Snow {

    x: number;
    y: number;
    sx: number;
    sy: number;
    radius: number;
    deg: number;
    ax: number;
    context: any;

    static G = 0.01;
    static SpeedX = 1;
    static SpeedY = 1;

    constructor(x, y, radius, context) {
        this.x = x;
        this.y = y;
        this.sx = 0;
        this.sy = 0;
        this.radius = radius;
        this.deg = 0;
        this.ax = Math.random()<0.5? 0.005:-0.005;
        this.context = context;
    }

    update() {
        const degr = Math.random()*0.6 + 0.2;

        // x方向调整
        this.sx += this.ax;
        if(this.sx >= Snow.SpeedX || this.sx <= -Snow.SpeedX){
            this.ax *= -1;
        }
        
        // y方向调整
        if(this.sy < Snow.SpeedY){
            this.sy += Snow.G;
        }
        
        // 更新snow参数
        this.x += this.sx;
        this.y += this.sy; 
        this.deg += degr;
    }

    draw() {
        const radius = this.radius;
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.deg * Math.PI / 180);
        this.context.drawImage(snowImage, -radius, -radius, radius*2, radius*2);
        this.context.restore();
    }
}

export default function CanvasArea() {

    useEffect(() => {
        if (!canvasSupport) {
            console.log('不支持canvas');
            return
        }
        const width = window.screen.width;
        const height = window.screen.height;
        const canvasArea: HTMLCanvasElement = document.querySelector('#canvasOne');
        canvasArea.height = height;
        canvasArea.width = width;
        const context = canvasArea.getContext("2d");
        const drawMyBg = (ctx, width, height) => {
            // 保存当前画布状态
            ctx.save();
            // 创建渐变 圆环， 为圆环的内外援 中心点和半径
            const grd = ctx.createRadialGradient(width/2, height/2, 1, width/2, height/2, height);
            grd.addColorStop(0,"white"); 
            grd.addColorStop(1,"#0a2a39"); 
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }

        drawMyBg(context, width, height);

        const snows = [];
        

        const trickerCount = 150;
        let tricker = 0;

        let lastTime = Date.now();
        let deltaTime = 0;

        const loop = (ctx) => {
            requestAnimationFrame(() => loop(ctx));
            // ctx.clearReact(0, 0, width, height);
            const now = Date.now();
            deltaTime = now - lastTime;
            lastTime = now;
            tricker += deltaTime;
            if (tricker > trickerCount) {
                snows.push(
                    new Snow(Math.random() * width, 0, Math.random() * 5 + 5, context)
                )
                tricker %=  trickerCount;
            }

            drawMyBg(context, width, height);

            snows.map((s, i) => {
                s.update();
                s.draw();
                if (s.y > height) {
                    snows.splice(i,1)
                }
            })
        }
        loop(context);


        // 监听鼠标滚轮事件
        function scrollMouse(e){
            e = e || window.event;
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    console.log("滑轮向上滚动");
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    console.log("滑轮向下滚动");
                }
            } else if (e.detail) {  //Firefox滑轮事件
                if (e.detail> 0) { //当滑轮向上滚动时
                    console.log("滑轮向上滚动");
                }
                if (e.detail< 0) { //当滑轮向下滚动时
                    console.log("滑轮向下滚动");
                }
            }
        }

        const throttle = (fn, delay) => {
            let prev = Date.now();
            return  (args) => {
                const now = Date.now();
                if (now - prev >= delay) {
                    fn && fn(args);
                    prev = Date.now();
                }
            }
        }
        const scrollWheel = throttle(scrollMouse, 500);

        document.addEventListener('DOMMouseScroll', scrollWheel, false);

        window.onmousewheel = document.onmousewheel = scrollWheel;

        const aa = (fn, delay) => {
            let timer = null;
            return (args) => {
                clearTimeout(timer);
                setTimeout(() => {
                    fn && fn(args);
                }, delay)
            }
        }
        return () => {
            document.removeEventListener('DOMMouseScroll', scrollWheel);
        }
    }, [])

    const canvasSupport = () => {
        return !!document.createElement('canvas').getContext('2d');
    }

    return (
        <canvas id="canvasOne">
            not supported
        </canvas>
    )
}