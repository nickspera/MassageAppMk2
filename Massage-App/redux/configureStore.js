import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { services } from './services';
import { reviews } from './reviews';
import { promotions } from './promotions';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            services,
            reviews,
            promotions
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}