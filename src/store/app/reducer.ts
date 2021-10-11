import { AnyAction } from 'redux'
import { AppActions } from './types'
import { IApp } from './types'

export const appInitialState: IApp = {
  loading: false,
}

export const appReducer = (
  state = appInitialState,
  action: AnyAction
): IApp | null => {
  switch (action.type) {
    case AppActions.UPDATE_LOADING: {
      const newState = { ...state, loading: action.payload }
      return newState
    }
    default:
      return state
  }
}
