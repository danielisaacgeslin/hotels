import { ActionReducerMap } from '@ngrx/store';
import { RouterStateSnapshot, Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const initialState = { };

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer
};
