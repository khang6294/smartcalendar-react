import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import 'antd/dist/antd.css';
const App = (props) => {
    const [toDoList, setToDoList] = useState([])
    return (
      <div className="App">
        <Layout>
          <AddToDo
              newToDo = {(toDo) => {
                toDoList.push(toDo)
                setToDoList(toDoList)
              }} 
          />
          <ToDoList
              toDoList = {toDoList}
          />
        </Layout>
      </div>
    );
}

export default App;
