```
import React, {useEffect} from 'react'

export default function CanvasArea() {

    useEffect(() => {
        if (!canvasSupport) {
            console.log('不支持canvas');
            return
        }
        const canvasArea = document.getElementById('canvasOne');
        const context = canvasArea.getContext('2d');
        context.fillStyle = 'yellow';
        context.fillRect(100, 100, 200, 200);
        
        context.fillStyle = "red";
        context.font = "20px";
        context.fillText('Hello Word', 100, 100);

        const helloWordImage = new Image();
        console.log(helloWordImage)
        helloWordImage.onload = function() {
            console.log("aaa");
            helloWordImage.src="helloWordImage.gif";
            context.drawImage(helloWordImage, 120, 120);
        }

        context.strokeStyle = "green";
        context.strokeRect(5,5, 190, 190);
    }, [])

    const canvasSupport = () => {
        return !!document.createElement('canvas').getContext('2d');
    }

    return (
        <>
            <canvas id="canvasOne" width="200px" height="200px">
                not supported
            </canvas>
        </>
    )
}
```