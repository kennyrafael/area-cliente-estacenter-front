import { action, EmptyAction } from 'typesafe-actions';
import { AppActions } from './types';

export const updateLoading = (status: boolean): EmptyAction<string> => action(AppActions.UPDATE_LOADING, status);
