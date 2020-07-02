import React from 'react';
import ReactDOM from 'react-dom';
import Test from '@components/demo01';
import Desc from '@components/decs';

import * as styles from './index.scss'

ReactDOM.render(
    <div>
        <Test />
        <Desc />
        <p className={styles.test}>jisofhsaodfhdihufaisodgofg</p>
    </div>,
    document.getElementById('app')
)