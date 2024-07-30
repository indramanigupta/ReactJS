import {
  createTodo,
  removeTodo,
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
  markTodoAsCompleted,
} from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    console.log("Request body:", body);
    const response = await fetch("http://localhost:8080/todos", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body,
    });

    if (!response.ok) {
      const errorResponseText = await response.text();
      console.error("Error response text:", errorResponseText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const todo = await response.json();
    console.log("Todo item:", todo);
    dispatch(createTodo(todo));
  } catch (e) {
    console.error("Error:", e);
    dispatch(displayAlert(e));
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "delete",
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const markTodoAsCompletedRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/todos/${id}/completed`,
      {
        method: "post",
      }
    );
    const updatedTodo = await response.json();
    dispatch(markTodoAsCompleted(updatedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const displayAlert = (text) => () => {
  alert(text);
};
