import * as React from 'react';
import {observer, inject} from 'mobx-react'
// import { ComponentExt } from '@utils/reactExt';
import UserIcon from '@assets/user.svg';

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
                <UserIcon color="red" width={20} height={20} />{this.props.globalStore?.num}
                <button onClick={this.increase}>sss+</button>
                <button>-</button>
            </React.Fragment>
        )
    }
}

export default Counter;