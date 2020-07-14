import React, {useEffect} from 'react'

export default function CanvasArea() {

    useEffect(() => {
        if (!canvasSupport) {
            console.log('不支持canvas');
            return
        }
        let alpha = 0;
        let fadeIn = true;
        const text = 'hello word';
        const canvasArea = document.querySelector('#canvasOne');
        const context = canvasArea.getContext("2d");
        const HelloWordImage = new Image();
        HelloWordImage.src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg";

        const gameLoop = () => {
            setTimeout(gameLoop, 20);
            drawScreen();
        };

        const drawScreen = () => {
            context.globalAlpha = 1;
            context.fillStyle = "#000000";
            context.fillRect(0, 0, 640, 480);
            context.globalAlpha = .25;
            context.drawImage(HelloWordImage, 0, 0);
            if (fadeIn) {
                alpha += 0.1;
                if (alpha > 1) {
                    alpha = 1;
                    fadeIn = false
                }
            } else {
                alpha -= 0.1;
                if (alpha <0) {
                    alpha = 0;
                    fadeIn = true;
                }
            }
            context.globalAlpha = alpha;
            context.font = "20px";
            context.textBaseline = "top";
            context.fillStyle="#ffffff";
            context.fillText(text, 150, 200);
        }
        gameLoop();
    }, [])

    const canvasSupport = () => {
        return !!document.createElement('canvas').getContext('2d');
    }

    return (
        <canvas id="canvasOne" width="500px" height="500px">
            not supported
        </canvas>
    )
}