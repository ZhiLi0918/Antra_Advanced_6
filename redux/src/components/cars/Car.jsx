import React from 'react'
import { useDispatch } from 'react-redux'

export default function Car({car }) {

    const dispatch = useDispatch();

    return (
        <div>
            <div>{car.name}</div>
            <div>{car.quantity}</div>
            <button onClick={() => dispatch({ type: 'SELL', payload: car.id })}>Sell</button>
        </div>
    )
}