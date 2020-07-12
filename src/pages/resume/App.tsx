import React from 'react';
import { HashRouter as Router, Switch, Route} from 'react-router-dom';
import Loadable from 'react-loadable'

function loading() {
    return <div>loading...</div>
}

const Area = Loadable({
    loader: () => import(/*WebpackChunkName:"area"*/ './components/area'),
    loading: loading
})

const Card = Loadable({
    loader: () => import(/*WebpackChunkName:"card"*/ './components/card'),
    loading: loading
})

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/resume/home" component={Area} />
                    <Route exact path="/resume/card" component={Card} />
                </Switch>
            </Router>
        )
    }
}

export default App;