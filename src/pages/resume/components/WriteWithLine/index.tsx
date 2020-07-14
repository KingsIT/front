import React, {useEffect, useState} from 'react'
import styles from './index.scss';

export default function WriteWithLine({
    words = ''
}: {
    words: string
}) {
    const [text, setText] = useState<string>('');
    const [countShow ,setCountShow] = useState<number>(0);
    useEffect(() => {
        if (!words) {
            return;
        }
        let index = 0;
        let seconds = 200;
        const timer = setInterval(() => {
            setText(words.substring(0, index++));
            if (index === words.length + 1) {
                clearInterval(timer);
            }
        }, seconds);
        const timer2 = setInterval(() => {
            setCountShow(pre => pre + 1);
        }, 100)
        return () => {
            clearInterval(timer);
            clearInterval(timer2);
        }
    }, [])
    return (
        <div>
            {text.substring(0, text.length - 1)}<span className={styles["writer__words--show"]}>{text[text.length - 1]}</span>
            <span className={`${countShow % 2 === 0 ? styles["writer__liner--show"] : styles["writer__liner--hide"]}`}>__</span>
        </div>
    )
}