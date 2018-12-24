import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import CalendarSchedule from './components/Calendar'
import 'antd/dist/antd.css';
import {useTodos} from './custom-hooks'


const App = (props) => {
    const { toDoList, addToDo, removeToDo, selectDate } = useTodos();
    return (
      <div className="App">
        <Layout>
          <CalendarSchedule
              dateSelected = {(date) => selectDate(date)}
              toDoList = {toDoList}
          />
          <AddToDo
              newToDo = {(newToDo) => addToDo(newToDo)} 
              toDoList = {toDoList}
          />
          <ToDoList
              toDoList = {toDoList}
              deleteItem = {item => removeToDo(item)}
          />
        </Layout>
      </div>
    );
}

export default App;
