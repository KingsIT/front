import React from 'react';
import { a_io } from './actions'
import mk from '../../../../build/webpack/webpack.md';

export default function Home() {
    return (
        <div onClick={() => { a_io() }}>
            <div dangerouslySetInnerHTML={{__html: mk}}></div>
        </div>
        )
    }