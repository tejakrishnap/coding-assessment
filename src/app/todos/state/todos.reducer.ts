import { Action, createReducer, on } from "@ngrx/store";
import * as TodoActions from "./todo.actions";
import _ from "lodash";
import { FILTER_MODES } from "./../constants/filter-modes";
import { ITodo } from "../interfaces/ITodo";

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: "All",
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [
        {
          id: Math.floor(Math.random() * (300 - 200)) + 50,
          text,
          completed: false,
        },
        ...existingState.todos,
      ],
    })),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      return {
        ...existingState,
        todos: existingState.todos.filter((item) => item.id !== index),
      };
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter((todo) => !todo.completed)],
    })),
    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      const itemIndex = existingState.todos.findIndex(
        (val) => val.id === index
      );
      let updatedTodos = _.cloneDeep(existingState.todos);
      updatedTodos[itemIndex].text = text;
      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      const itemIndex = existingState.todos.findIndex(
        (val) => val.id === index
      );
      let updatedTodos = _.cloneDeep(existingState.todos);
      updatedTodos[itemIndex].completed = !updatedTodos[itemIndex].completed;

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleAllCompleted, (existingState) => {
      let updatedTodos = _.cloneDeep(existingState.todos).filter(
        (todo) => (todo.completed = true)
      );
      return {
        ...existingState,
        todos: updatedTodos,
      };
    })
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
