import React from 'react';
import Test from '@components/demo01';
import Desc from '@components/decs';
import Counter from '@views/Counter';

import * as styles from './index.scss'

export default function App() {
    return (
        <React.Fragment>
            <Test />
            <Desc />
            <Counter />
            <p className={styles.test}>jisofhsaodfhdihufaisodgofg</p>
        </React.Fragment>
    )
}