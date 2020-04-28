import React from 'react'
import { Provider } from 'react-redux'
import AppContainer from './app_container'
import { BrowserRouter } from "react-router-dom"


export default ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
    </Provider>
);