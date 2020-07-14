import React from 'react';
import WriteWithLine from '../../components/WriteWithLine';
import CanvasArea from '../../components/CanvasArea/index';
import styles from './index.scss';

export default function FirstFloor() {
    return (
        <>
            <div className={styles["first__floor--body"]}>
                <WriteWithLine words="你好是世界" />
                <CanvasArea />
            </div>
        </>
    )
}