import React from 'react';
import { a_io } from './actions'
// import mk from '../../../../build/webpack/webpack.md';
import styles from './index.scss';

export default function Home() {
    return (
        <div onClick={() => { a_io() }} className={styles.test}>
            {/* <div dangerouslySetInnerHTML={{__html: mk}}></div> */}
        </div>
    )
}