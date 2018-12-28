import {useState, useEffect} from 'react'
import moment from 'moment'
import axios from 'axios'
export const useTodos = (initialValue = {dateWork:"",toDoList: []}) => {
    const [toDoList, setToDoList] = useState(initialValue.toDoList);
    const [dateWorkSelected, setDateWorkSelected] = useState(initialValue.dateWork)
    const [toDoAndDate, setToDoAndDate] = useState([{
        dateWork: dateWorkSelected,
        toDoList: toDoList
    }])
    const [fetch,setFetch] = useState(false)

    

    useEffect(() => {
        const fetchAllWorks = {
            query:`
                {
                    works(creator:"5c24ac21d56564235cfe8ab4"){
                        dateWork
                        toDoList{
                            toDo
                            completed
                        }
                    }
                }
            `
        } 
        axios.post('http://localhost:8080/graphql',fetchAllWorks)
            .then(res => {
                setToDoAndDate(res.data.data.works)
                setFetch(true)
            })
    },[fetch])

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
            }
        }
        
    }

    const selectDate = (date) => {
        // const queryDateWork = {
        //     query:`
        //         {
        //             work(dateWork:"${date}"){
        //                 toDo
        //             }
        //         }
        //     `
        // }
        // axios.post("http://localhost:8080/graphql",queryDateWork)
        //     .then(res => {
        //         console.log(res.data.data.work)
        //     })
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
                setToDoList(toDoListClone)
                
            }
        }
        setToDoAndDate(toDoAndDateClone) 

    }
  
    return {
        toDoAndDate: toDoAndDate,
        toDoList: toDoList,
        addToDo: addToDo,
        removeToDo: removeToDo,
        selectDate: selectDate,
        completeToDo: completeToDo
    }
};


