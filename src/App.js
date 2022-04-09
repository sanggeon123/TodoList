import React from 'react';
import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/todoTemplate';
import TodoHeader from './components/todoHeader';
import TodoList from './components/todoList';
import TodoCreate from './components/todoCreate';
import {TodoProvider} from './todoContext';

const GlobalStyle = createGlobalStyle`
  body{
    background-color: skyblue;
  }
`;

function App(){
  return (
    <>
      <TodoProvider>
          <GlobalStyle/>
          <TodoTemplate>
            <TodoHeader/>
            <TodoList/>
            <TodoCreate/>
          </TodoTemplate>
      </TodoProvider>
    </>
  );
}

export default App;
