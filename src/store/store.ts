import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from '.';
import { IUser } from '../types';
import { IApp } from './app/types';
import { appReducer } from './app/reducer';

/** Store Type */
export interface StoreState {
	app: IApp;
	user: IUser | null;
}

const appReducers = combineReducers({
	app: appReducer,
	user: userReducer,
});

export const store = createStore(appReducers, composeWithDevTools());
