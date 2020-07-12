import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Loadable from 'react-loadable'

function loading() {
    return <div>loading...</div>
}

const Home = Loadable({
    loader: () => import(/*WebpackChunkName:"home"*/ '@views/Home'),
    loading: loading
})

const Page = Loadable({
    loader: () => import(/*WebpackChunkName:"page"*/ '@views/Page'),
    loading: loading
})


class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/index" component={Home} />
                    <Route exact path="/index/page" component={Page} />
                </Switch>
            </Router>
        )
    }
}

export default App;