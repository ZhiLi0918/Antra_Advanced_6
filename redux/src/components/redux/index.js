import { createStore } from 'redux';

const carInitialValue = [
    {   
        id: 1,
        name: 'Toyta',
        quantity: 10
    },
    {   
        id: 2,
        name: 'nissan',
        quantity: 10
    },
    {   
        id: 3,
        name: 'ford',
        quantity: 10
    }
]

const carsReducer = (state = carInitialValue, { type, payload }) => { // action => { type, payload}
    switch(type){
        case 'SELL': 
            return state.map(car => {
                if(car.id === payload){
                    return {
                        ...car, 
                        quantity: car.quantity - 1
                    }
                }else{
                    return car;
                }
            });
        default: 
            return state; // at the initialization state, there is no action passed in, so return the initialState. 
    }
}

const store = createStore(carsReducer, carInitialValue);  // when the createStore get called, reducer will be called with the initialValue


function createMyStore(reducer, preloadedState = {}, enhancer = undefined){

    if(enhancer) return enhancer()

    const store = {};
    store.state = preloadedState;
    store.callbacksFns = [];

    store.getState = () => {
        return store.state;
    }

    store.subscribe = (callbackFn) => {
        store.callbacksFns.push(callbackFn);
        return () => {
            store.callbacksFns.filter(fn => fn !== callbackFn);
        }
    }

    store.dispatch = (action) => {
        store.state = reducer(store.state, action);
        store.callbacksFns.forEach(fn => fn(action));
    }

    store.dispatch({ type: 'redux/INIT' });

    return store;

}

export default store;