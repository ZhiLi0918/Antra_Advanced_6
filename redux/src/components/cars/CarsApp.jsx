import React from 'react'
import Car from './Car';
import { useSelector } from 'react-redux'; // select some information in the store, and when that information change, re-rendering the application, similar to useState. 

export default function CarsApp() {

    const cars = useSelector(state => state);

    return (   
        <div> 
            {cars.map(car => <Car car={car} key={car.id} />)}
        </div>
    )
}
