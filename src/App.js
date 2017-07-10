import React , { Component } from "react";
import { Provider } from "react-redux";
import { createStore , applyMiddleware } from "redux";
import { initialState , apiMiddleware , reducer } from "./redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Container from "./Container";

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
        thunk,
        logger
    )
);

export default class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}