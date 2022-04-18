import { createSelector, createFeatureSelector } from "@ngrx/store";
import { FilterType } from "../interfaces";
import { getRouterState } from "../route-reducers";
import * as todosState from "./todos.reducer";

export const todosSelector =
  createFeatureSelector<todosState.ITodosState>("todos");

export const allTodos = createSelector(todosSelector, todosState.todos);

export const getCurrentTypeTodos = createSelector(
  allTodos,
  getRouterState,
  (todos, router) => {
    if (router?.state?.url) {
      const filter = router.state.url;
      switch (filter) {
        default:
          return todos;
        case "/completed":
          return todos.filter((t) => t.completed);
        case "/active":
          return todos.filter((t) => !t.completed);
      }
    }
    return todos;
  }
);

export const getCurrentFilter = createSelector(getRouterState, (router) => {
  if (router.state && router.state.url) {
    const filter = router.state.url;
    switch (filter) {
      default:
        return FilterType.All;
      case "/":
        return FilterType.All;
      case "/completed":
        return FilterType.Completed;
      case "/active":
        return FilterType.Active;
    }
  }
  return "all";
});

export const getTodoCount = createSelector(
  getCurrentTypeTodos,
  (todos) => todos.length
);
