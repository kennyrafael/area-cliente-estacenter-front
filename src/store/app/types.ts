/** define the available action of reducer */
export enum AppActions {
	UPDATE_LOADING = 'UPDATE_LOADING',
}

export interface IApp {
	loading: boolean;
}
