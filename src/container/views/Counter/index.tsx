import * as React from 'react';
import {observer, inject} from 'mobx-react'
// import { ComponentExt } from '@utils/reactExt';

interface IProps {
    globalStore?: IGlobalStore.GlobalStore;
    props: object;
}

interface IState {
    a: number;
}

@inject('globalStore')
@observer
class Counter extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            a: 1,
        }
    }
    increase = () => {
        this.props.globalStore?.increase(this.props.globalStore.num);
    }
    decrease = () => {
        this.props.globalStore?.decrease(this.props.globalStore.num);
    }
    render() {
        return (
            <React.Fragment>
                {this.props.globalStore?.num}
                <button onClick={this.increase}>+llll</button>
                <button>-</button>
            </React.Fragment>
        )
    }
}

export default Counter;