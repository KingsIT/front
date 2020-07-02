import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from 'mobx';
import { Provider } from 'mobx-react';
import * as store from './store';
import Test from '@components/demo01';
import Desc from '@components/decs';
import Counter from '@views/Counter';

import * as styles from './index.scss'

/**
 *  用于限制被observable(也就是store中直接添加 @observable)的数据的修改方式，让其只能通过添加了@action的函数中进行修改。
 */
configure({enforceActions: 'observed'});

ReactDOM.render(
    <Provider {...store}>
        <Test />
        <Desc />
        <Counter />
        <p className={styles.test}>jisofhsaodfhdihufaisodgofg</p>
    </Provider>,
    document.querySelector('#app')
)