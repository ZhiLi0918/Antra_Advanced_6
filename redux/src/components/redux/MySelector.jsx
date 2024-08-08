import React, { useEffect, useState } from 'react'
import store from '.'
import { shallowEqual } from 'react-redux';

export default function useMySelector(selectorFn, equalityFn = shallowEqual) {

    if(typeof selectorFn !== 'function'){
        throw new Error('The selectorFn must be a function');
    }

    const [selectedState, setSelectedState] = useState(() => selectorFn(store.getState()));

    useEffect(() => {
        const checkForUpdates = () => {
            const newSelectedState = selectorFn(store.getState());
            if(!equalityFn(newSelectedState, selectedState)){
                setSelectedState(newSelectedState)
            }
        }

        const unsubscribe = store.subscribe(checkForUpdates);

        checkForUpdates();

        return () => unsubscribe();
    }, [selectorFn, equalityFn, selectedState]);

    return selectedState;
}

