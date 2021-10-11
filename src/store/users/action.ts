import { action, EmptyAction } from 'typesafe-actions';
import { UserActions } from './types';
import { IUser } from '../../types';

export const addUser = (user: IUser): EmptyAction<string> => action(UserActions.ADD_USER, user);
