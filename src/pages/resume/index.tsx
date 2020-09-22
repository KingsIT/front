import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = (Component) => {
    ReactDOM.render(
            <Component />,
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