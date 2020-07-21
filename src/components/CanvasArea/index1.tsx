import React, {useEffect} from 'react'

export default function CanvasArea() {

    useEffect(() => {
        if (!canvasSupport) {
            console.log('不支持canvas');
            return
        }
        let guesses = 0;
        const message = "111";
        const letters = ['a', 'b', 'c', 'd', 'e','f', 'g', 'h', 'i', 'j'];
        const tody = new Date();
        let letterToGuess = "";
        let highterOrLowser = "";
        let lettersGuessed;
        let gameOver = false;
        const canvasArea:HTMLCanvasElement = document.querySelector('#canvasOne');
        const context = canvasArea.getContext("2d");
        const formButton = document.querySelector('#createImage');
        const initGame = () => {
            const letterIndex = Math.floor(Math.random() * (letters.length));
            letterToGuess = letters[letterIndex];
            guesses = 0;
            lettersGuessed = [];
            gameOver = false;
            window.addEventListener('keydown', eventKeyPressed, true);
            drawScreen();
            formButton.addEventListener('click', createImage, false);
        }

        const createImage = (e) => {
            window.open(canvasArea.toDataURL("image/jpeg", 1.0), "canvasImage", `left=0,top=0,width=${canvasArea.width},height=${canvasArea.height},toolbar=0,resizable=0`);
        }

        const eventKeyPressed = (e) => {
            if (!gameOver) {
                let letterPressed = String.fromCharCode(e.keyCode);
                letterPressed = letterPressed.toLowerCase();
                guesses ++;
                lettersGuessed.push(letterPressed);
                if (letterPressed === letterToGuess) {
                    gameOver = true;
                } else {
                    let letterIndex = letters.indexOf(letterToGuess);
                    let guessIndex = letters.indexOf(letterPressed);
                    if (guessIndex < 0) {
                        highterOrLowser = "is not a letter";
                    } else if (guessIndex > letterIndex) {
                        highterOrLowser = "Lower";
                    } else {
                        highterOrLowser = "Higher";
                    }
                }
                drawScreen();
            }
        }

        const drawScreen = () => {
            context.fillStyle = "#ffffaa";
            context.fillRect(0, 0, 400, 400);
            context.strokeStyle = "black";
            context.strokeRect(5, 5, 390, 390);
            context.textBaseline = "top";
            context.fillStyle="#000000";
            context.font = "10px Sans-serif";
            context.fillText(tody, 150, 10);
            context.fillStyle="#FF0000";
            context.font="15px";
            context.fillText(`message: ${message}`, 125, 35);
            context.font="15px";
            context.fillText(`Guesses: ${guesses}`, 215, 50);
            context.fillStyle="#000000";
            context.font="16px";
            context.fillText(`highterOrLowser: ${highterOrLowser}`, 150, 140);
            context.fillStyle="#FF0000";
            context.font="16px";
            context.fillText(`Guessed: ${lettersGuessed.toString()}`, 150, 125);
            
            if (gameOver) {
                context.fillStyle="#FF0000";
                context.font = '40px';
                context.fillText('Got it', 150, 180);
            }
        }
        initGame();
        return () => {
            window.removeEventListener('keydown', eventKeyPressed);
            formButton.removeEventListener('click', createImage);
        }
    }, [])

    const canvasSupport = () => {
        return !!document.createElement('canvas').getContext('2d');
    }

    return (
        <>
            <canvas id="canvasOne" width="500px" height="500px">
                not supported
            </canvas>
            <form>
                <input type="button" id="createImage" value="抓取 canvas 图像"/>
            </form>
        </>
    )
}