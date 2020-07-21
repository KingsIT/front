import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable'

function loading() {
    return <div>loading...</div>
}

const FirstFloor = Loadable({
    loader: () => import(/*WebpackChunkName:"area"*/ './containers/firstFloor'),
    loading: loading
})

const Card = Loadable({
    loader: () => import(/*WebpackChunkName:"card"*/ './components/card'),
    loading: loading
})

const Page404 = Loadable({
    loader: () => import(/*WebpackChunkName:"card"*/ './components/Page404'),
    loading: loading
})

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact render={() => <Redirect to="/resume/me" />} />
                    <Route exact path="/resume/me" component={FirstFloor} />
                    <Route exact path="/resume/card" component={Card} />
                    <Route path="*" component={Page404} />
                </Switch>
            </Router>
        )
    }
}

export default App;