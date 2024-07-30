import React from "react";
import TodoList from "./todos/TodoList";
import styled from "styled-components";
//import "./App.css";

const AppContainer = styled.div`
  margin: 1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #29e214;
`;
const App = () => (
  <AppContainer>
    <TodoList />
  </AppContainer>
);

export default App;
