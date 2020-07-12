import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from 'mobx';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import * as store from '../../store';
import App from '@shared/App';

/**
 *  用于限制被observable(也就是store中直接添加 @observable)的数据的修改方式，让其只能通过添加了@action的函数中进行修改。
 */
configure({enforceActions: 'observed'});

const render = (Component) => {
    ReactDOM.render(
        <Provider {...store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.querySelector('#app')
    )
}

render(App);

if (module.hot) {
    module.hot.accept('@shared/App', function() {
        console.log('热更新触发');
        const NextApp = require('@shared/App').default;
        render(NextApp);
    })
}