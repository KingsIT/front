import {observable, action} from 'mobx';

export default class GlobalStore {
    @observable num: number = 0;

    @action increase = (num: number) => {
        this.num = num + 1
    }

    @action decrease = (num: number) => {
        this.num = num - 1
    }
}