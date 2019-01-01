import React, { useState,useEffect } from 'react';
import './App.css';
import Layout from './components/Layout'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import CalendarSchedule from './components/Calendar'
import 'antd/dist/antd.css';
import {useTodos} from './custom-hooks'
import IndexAuth from './components/Auth/indexAuth'


const App = (props) => {

    const { toDoAndDate,
            toDoList,
            isAuth,
            userCreation,
            signup,
            login, 
            logout,
            edit, 
            addToDo, 
            removeToDo, 
            selectDate ,
            completeToDo,
            onSave
        } = useTodos();
    
    
    let renderView = null;
    const [loading,setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
    },[loading])

    if(isAuth){
        renderView = (
            <Layout onLogout = {logout}>
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
        )
    } else if(!isAuth && loading) {
        renderView = <IndexAuth 
            getLoginInfo = {(userInfo) => login(userInfo)}
            getSignUpInfo = {(userInfo) => signup(userInfo)}
            userCreation = {userCreation}
        />
    }
    
    return (
        <div className="App">
            {renderView}
        </div>
    );
}

export default App;
