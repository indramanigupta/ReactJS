//export const getTodos = (state) => state.todos;
//export const getTodosLoading = (state) => state.isLoading;

import { createSelector } from "reselect";
//import { todos } from "./reducers";

export const getTodos = (state) => state.todos.data;
export const getTodosLoading = (state) => state.todos.isLoading;

/* export const getIncompleteTodos = createSelector(
  getTodos,
  getTodosLoading,
  (todos, isLoading) =>
    isLoading ? [] : todos.filter((todo) => !todo.isCompleted)
); */

export const getIncompleteTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo) => !todo.isCompleted)
);

export const getCompletedTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo) => todo.isCompleted)
);

/* *
The above and below method is giving same output but, has different working ways- full load vs. when changes happen then only loads
only when the return value of the selectors that you pass as arguments changes
*/
/* export const getCompletedTodos = (state) => {
  const { data: todos } = state.todos;
  return todos.filter((todo) => todo.isCompleted);
}; */
