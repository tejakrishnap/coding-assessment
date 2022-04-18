import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
} from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import { RouterStateUrl } from "./route-serializer";

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>("router");
