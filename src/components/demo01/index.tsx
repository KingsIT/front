import React from 'react';
import { ComponentExt } from '@utils/reactExt';
class Test<TestProps, TestState> extends ComponentExt {
    handleClick = () => {
        this.$message.success('通知');
    }
    render() {
        return (
            <div onClick={this.handleClick}>
                点击
            </div>
        )
    }
}

export default Test;