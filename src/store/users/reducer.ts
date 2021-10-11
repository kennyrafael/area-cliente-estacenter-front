import { AnyAction } from 'redux';
import { UserActions } from './types';
import { IUser } from '../../types';

export const userInitialState: IUser | null = null;

export const userReducer = (state = userInitialState, action: AnyAction): IUser | null => {
	switch (action.type) {
		case UserActions.ADD_USER: {
			return action.payload;
		}
		default:
			return state;
	}
};
