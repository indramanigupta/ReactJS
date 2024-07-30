import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
//import { /* removeTodo, */ markTodoAsCompleted } from "./actions";
import {
  //getTodos,
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from "./thunks";

//import "./TodoList.css";
//import { isLoading } from "./reducers";

/* const BigRedText = styled.div`
  fonnt-size: 48px;
  color: #ff0000;
`; */

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  //todos = [],
  completedTodos,
  incompleteTodos,
  onRemovePressed,
  onCompletedPressed,
  //onDisplayAlertClicked,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    //<div className="list-wrapper">
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {
        incompleteTodos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}
          />
        ))
        //todos.map((todo) => ( <TodoListItem key={todo.id} todo={todo} onRemovePressed={onRemovePressed}onCompletedPressed={onCompletedPressed} //{onDisplayAlertClicked}/>))
      }
      <h3>Completed:</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </ListWrapper>
    //</div>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
  //todos: getTodos(state),
  //isLoading: state.isLoading,
  //todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  //onRemovePressed: (text) => dispatch(removeTodo(text)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
  //onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
  // onDisplayAlertClicked: (text) => dispatch(displayAlert(text)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
