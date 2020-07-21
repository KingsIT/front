import React, {useEffect, useState, useCallback} from 'react'
import styles from './index.scss';

export default function WriteWithLine({
    words = []
}: {
    words: string[]
}) {
    const [text, setText] = useState<string>('');
    const [countShow ,setCountShow] = useState<number>(0);
    const [currentLine, setCurrentLiners] = useState<string[]>([]);

    const transWords = useCallback((seconds: number, linerCount: number = 0) => {
        let index = 0;
        let timer = setInterval(() => {
            const currentWords = words[linerCount];
            setText(currentWords.substring(0, index++));
            if (index === currentWords.length + 1) {
                index = 0;
                linerCount ++;
                clearInterval(timer);
                if (linerCount < words.length) {
                    setText('');
                    currentLine.push(currentWords);
                    setCurrentLiners(currentLine);
                    transWords(300 + Math.floor((Math.random() * 300)), linerCount);
                }
            }
        }, seconds);
        return timer;
    }, []);

    useEffect(() => {
        if (!words || words.length === 0) {
            return;
        }
        const timer = transWords(200, 0);
        const timer2 = setInterval(() => {
            setCountShow(pre => pre + 1);
        }, 100)
        return () => {
            clearInterval(timer);
            clearInterval(timer2);
        }
    }, [])
    return (
        <>
            {currentLine.map((text, i) => <p key={`text-liner-${i}`}>{text}</p>)}
            <p>
                {text.substring(0, text.length - 1)}<span className={styles["writer__words--show"]}>{text[text.length - 1]}</span>
                <span className={`${countShow % 2 === 0 ? styles["writer__liner--show"] : styles["writer__liner--hide"]}`}>__</span>
            </p>
        </>
    )
}