import React, { createContext, useContext } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store'; // Adjust the import path to your actual store location

const StoreContext = createContext(null);

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a myProvider');
    }
    return context;
};

const myProvider = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        </ReduxProvider>
    );
};

export default myProvider;
