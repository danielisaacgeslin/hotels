import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Hotel, Pagination } from '../../models';
import { stateName } from './state-name';
import { actionTypes } from './actions';

export interface State {
  list: Hotel[];
  maxCount: number;
}

export const initialState: State = {
  list: [],
  maxCount: 0
};

export function reducerFn(state: State = initialState, action: any): State {
  switch (action.type) {
    case actionTypes.SET_HOTELS:
      return { ...state, list: action.payload.list, maxCount: action.payload.count };
    default:
      return state;
  }
}

export const getState = createFeatureSelector<State>(stateName);
export const getList = createSelector(getState, state => state.list || []);
export const getMaxCount = createSelector(getState, state => state.maxCount);
