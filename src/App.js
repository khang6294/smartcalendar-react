import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import CalendarSchedule from './components/Calendar'
import 'antd/dist/antd.css';
import {useTodos} from './custom-hooks'


const App = (props) => {
    const { toDoAndDate,toDoList, edit, addToDo, removeToDo, selectDate ,completeToDo,onSave} = useTodos();
    return (
      <div className="App">
        <Layout>
          <CalendarSchedule
              toDoAndDate = {toDoAndDate}
              dateSelected = {(date) => selectDate(date)}
              toDoList = {toDoList}
          />
          <AddToDo
              newToDo = {(newToDo) => addToDo(newToDo)} 
              toDoList = {toDoList}
              onSave = {onSave}
              edit = {edit}
          />
          <ToDoList
              toDoList = {toDoList}
              deleteItem = {item => removeToDo(item)}
              completeItem = {item => completeToDo(item)}
          />
        </Layout>
      </div>
    );
}

export default App;
