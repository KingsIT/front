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

        const gameLoop = () => {
            setTimeout(gameLoop, 20);
            drawScreen();
        };

        const drawScreen = () => {
            context.globalAlpha = 1;
            context.fillStyle = "#000000";
            context.fillRect(0, 0, 640, 480);
            context.globalAlpha = .25;
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