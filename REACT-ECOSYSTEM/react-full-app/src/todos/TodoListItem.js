import React from "react";
import styled from "styled-components";
//import "./TodoListItem.css";

const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

export const getBorderStyleForDate = (startingDate, currentDate) => {
  startingDate > new Date(currentDate - 86400000 * 5)
    ? "none"
    : "2px solid red";
};

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${(props) =>
    getBorderStyleForDate(new Date(props.createdAt), Date.now())};
`;
const ButtonContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const Button = styled.button`
  background: #fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

const CompletedButton = styled(Button)`
  display: inline-block;
  background-color: #22ee22;
`;

const RemoveButton = styled(Button)`
  display: inline-block;
  background-color: #ee2222;
  margin-left: 8px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
  const Container = todo.isCompleted
    ? TodoItemContainer
    : TodoItemContainerWithWarning;
  return (
    <Container createdAt={todo.createdAt}>
      <h3>{todo.text}</h3>
      <p>
        Created at:&nbsp;
        {new Date(todo.createdAt).toLocaleDateString()}
      </p>
      <ButtonContainer>
        {todo.isCompleted ? null : (
          <CompletedButton onClick={() => onCompletedPressed(todo.id)}>
            Mark As Completed
          </CompletedButton>
        )}

        <RemoveButton onClick={() => onRemovePressed(todo.id)}>
          Remove
        </RemoveButton>
      </ButtonContainer>
    </Container>
  );
};

export default TodoListItem;
