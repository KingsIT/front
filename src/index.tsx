import React from 'react';
import ReactDOM from 'react-dom';
import Test from './components/demo01';
import * as styles from './index.scss'

ReactDOM.render(
    <div className={styles.test}>
        <Test />
    </div>,
    document.getElementById('app')
)