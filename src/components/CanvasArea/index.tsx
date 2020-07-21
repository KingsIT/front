import React, {useEffect} from 'react'
import styles from './index.scss';

export default function CanvasArea() {

    useEffect(() => {
        
    }, [])

    return (
        <div className={styles.camera}>
            <div className={styles.stage}>
                <div className={`${styles.box} ${styles.up}`}>up</div>
                <div className={`${styles.box} ${styles.down}`}>dwon</div>
                <div className={`${styles.box} ${styles.left}`}>left</div>
                <div className={`${styles.box} ${styles.right}`}>right</div>
                <div className={`${styles.box} ${styles.front}`}>front</div>
                <div className={`${styles.box} ${styles.back}`}>back</div>
            </div>
        </div>
    )
}