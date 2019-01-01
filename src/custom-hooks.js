import {useState, useEffect} from 'react'
import moment from 'moment'
import axios from 'axios'
import {message} from 'antd'
export const useTodos = (initialValue = {dateWork:moment(Date.now()).format('YYYY-MM-DD'),toDoList: []}) => {
    const [toDoList, setToDoList] = useState(initialValue.toDoList);
    const [dateWorkSelected, setDateWorkSelected] = useState(initialValue.dateWork)
    const [toDoAndDate, setToDoAndDate] = useState([{
        dateWork: dateWorkSelected,
        toDoList: toDoList,
        editted:false
    }])
    const [edit, setEdit] = useState(false)
    const [dateOri, setDateOri] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [isAuth, setIsAuth] = useState(false)
    const [userCreation, setUserCreation] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        if (!token || !expiryDate) {
            return;
        }
        if (new Date(expiryDate) <= new Date()) {
            logout();
            return;
        }
        const userId = localStorage.getItem('userId');
        const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
        setIsAuth(true)
        setUserInfo({
            token:token,
            userId: userId
        })
        autoLogout(remainingMilliseconds);
    },[isAuth])

    useEffect(() => {
        if(isAuth){
            const fetchAllWorks = {
                query:`
                    {
                        works(creator:"${userInfo.userId}"){
                            dateWork
                            toDoList{
                                toDo
                                completed
                            }
                        }
                    }
                `
            } 
            axios.post('http://localhost:8080/graphql',fetchAllWorks,{
                headers: {
                  Authorization: 'Bearer ' + userInfo.token
                }
              })
                .then(res => {
                    const toDoAndDateFormat = res.data.data.works.map(work => {
                        return {
                            ...work,
                            editted: false
                        }
                    })
                    setToDoAndDate(toDoAndDateFormat)
                    setToDoList(toDoAndDateFormat.filter(ele => ele.dateWork === dateWorkSelected)[0].toDoList)
                    const dateOri = res.data.data.works.map(work => work.dateWork)
                    setDateOri(dateOri)
                })
                .catch(err => console.log(err))
        }
    },[isAuth])

    const addToDo = (newToDo) => {
        let toDoAndDateClone = [...toDoAndDate]
        for(let i = 0; i < toDoAndDateClone.length; i++){
            if(dateWorkSelected === toDoAndDateClone[i].dateWork){
                toDoAndDateClone[i].toDoList.push({
                    toDo: newToDo,
                    completed: false
                })
                setToDoAndDate(toDoAndDateClone)
                setToDoList(toDoAndDateClone[i].toDoList)
                toDoAndDateClone[i].editted = true
                setEdit(toDoAndDateClone[i].editted)
            }
        }
        
    }

    const selectDate = (date) => {
        setDateWorkSelected(date)
        let toDoAndDateClone = [...toDoAndDate]
        let dateAvail = toDoAndDate.map(ele => ele.dateWork)
        if(dateAvail.indexOf(date) < 0){
            toDoAndDateClone.push({
                dateWork: date,
                toDoList: []
            })
            setToDoAndDate(toDoAndDateClone)
            setToDoList([])
        }
        for(let i = 0; i< toDoAndDate.length; i++){
            if(date === toDoAndDate[i].dateWork){
                setToDoList(toDoAndDate[i].toDoList)
                setEdit(toDoAndDate[i].editted)
            }
        }
    }

    const removeToDo = (toDo) => {
        let toDoAndDateClone = [...toDoAndDate]
        for(let j = 0; j < toDoAndDateClone.length; j++){
            if(dateWorkSelected === toDoAndDateClone[j].dateWork){
                let toDoListClone = [...toDoAndDateClone[j].toDoList]
                for(let i = 0 ; i< toDoListClone.length; i++){
                    if(toDo === toDoListClone[i].toDo){
                        toDoListClone.splice(i,1)
                    }
                }
                toDoAndDateClone[j].toDoList = [...toDoListClone]
                setToDoList(toDoListClone)
                toDoAndDateClone[j].editted = true
                setEdit(toDoAndDateClone[j].editted)
            }
        }
        setToDoAndDate(toDoAndDateClone) 
    }

    const completeToDo = (item) => {
        let toDoAndDateClone = [...toDoAndDate]
        for(let j = 0; j < toDoAndDateClone.length; j++){
            if(dateWorkSelected === toDoAndDateClone[j].dateWork){
                let toDoListClone = [...toDoAndDateClone[j].toDoList]
                for(let i = 0 ; i< toDoListClone.length; i++){
                    if(item.toDo === toDoListClone[i].toDo){
                        toDoListClone[i] = {...item}
                    }
                }
                toDoAndDateClone[j].toDoList = [...toDoListClone]
                toDoAndDateClone[j].editted = true
                setToDoList(toDoListClone)
                setEdit(toDoAndDateClone[j].editted)
            }
        }
        setToDoAndDate(toDoAndDateClone) 
    }

    const onSave = () => {
        const toDoListJSON = JSON.stringify(toDoList);
        const graphQlToDoList = toDoListJSON.replace(/"([^(")"]+)":/g,"$1:");
        let updateWork;
        if(dateOri.indexOf(dateWorkSelected) > -1){
            updateWork = {
                query:`
                mutation {
                    updateWork(dateWork:"${dateWorkSelected}", workInput:{
                          dateWork:"${dateWorkSelected}",
                          toDoList: ${graphQlToDoList}
                        }){
                      dateWork
                      toDoList{
                        toDo
                        completed
                      }
                    }
                  }
                `
            }
        } else {
            updateWork = {
                query:`
                mutation {
                    createWork(workInput:{
                          dateWork:"${dateWorkSelected}",
                          toDoList:${graphQlToDoList} 
                        }){
                        dateWork
                        toDoList{
                            toDo
                            completed
                      }
                    }
                  }
                `
            }
        }
        
        axios.post('http://localhost:8080/graphql',updateWork,{
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            }
          })
            .then(res => {
                toDoAndDate.filter(ele => ele.dateWork === dateWorkSelected)[0].editted = false
                setEdit(toDoAndDate.filter(ele => ele.dateWork === dateWorkSelected)[0].editted)
            })
            .catch(err => console.log(err.response.data))

    }

    const login = (loginInfo) => {
        const loginQuery = {
            query:`
                {
                    login(email:"${loginInfo.email}",password:"${loginInfo.password}"){
                        token
                        userId
                    }
                  }
            `
        }
        axios.post('http://localhost:8080/graphql',loginQuery)
            .then(res => {
                setUserInfo(res.data.data.login)
                setIsAuth(true)
                localStorage.setItem('token', res.data.data.login.token);
                localStorage.setItem('userId', res.data.data.login.userId);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                autoLogout(remainingMilliseconds)
            })
            .catch(err => {
                message.error(err.response.data.errors[0].message);
            });
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
        setUserInfo({})
        setIsAuth(false)
    }

    const autoLogout = milliseconds => {
        setTimeout(() => {
            logout();
        }, milliseconds);
    };

    const signup = (userInfo) => {
        const signupQuery = {
            query: `
            mutation{
                createUser(userInput:{email:"${userInfo.email}",name:"${userInfo.name}",password:"${userInfo.password}"}){
                  email
                  _id
                }
              }
              
            `
        }
        axios.post('http://localhost:8080/graphql',signupQuery)
            .then(res => {
                setUserCreation(true)
                message.success("Create user successfully");
            })
            .catch(err => message.error(err.response.data.errors[0].message))
    }
  
    return {
        userInfo: userInfo,
        userCreation: userCreation,
        isAuth:isAuth,
        login: login,
        logout:logout,
        signup: signup,
        toDoAndDate: toDoAndDate,
        toDoList: toDoList,
        addToDo: addToDo,
        removeToDo: removeToDo,
        selectDate: selectDate,
        completeToDo: completeToDo,
        onSave: onSave,
        edit: edit
    }
};


