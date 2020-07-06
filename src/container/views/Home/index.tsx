import React from 'react';
import { a_io } from './actions'

export default function Home() {
    return (
        <div onClick={() => { a_io() }}>Home555</div>
    )
}