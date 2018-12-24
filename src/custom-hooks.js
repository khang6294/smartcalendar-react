import {useState, useEffect} from 'react'
import moment from 'moment'
export const useTodos = (initialValue = {date:moment(Date.now()).format('YYYY-MM-DD'),toDoList: []}) => {
    const [toDoList, setToDoList] = useState(initialValue.toDoList);
    const [dateSelected, setDateSelected] = useState(initialValue.date)
    const [toDoAndDate, setToDoAndDate] = useState([{
        date: dateSelected,
        toDoList: toDoList
    }])

    const addToDo = (newToDo) => {
        let toDoAndDateClone = [...toDoAndDate]
        for(let i = 0; i < toDoAndDateClone.length; i++){
            if(dateSelected === toDoAndDateClone[i].date){
                toDoAndDateClone[i].toDoList.push(newToDo)
                setToDoAndDate(toDoAndDateClone)
                setToDoList(toDoAndDateClone[i].toDoList)
            }
        }
        
    }

    const selectDate = (date) => {
        setDateSelected(date)
        let toDoAndDateClone = [...toDoAndDate]
        let dateAvail = toDoAndDate.map(ele => ele.date)
        if(dateAvail.indexOf(date) < 0){
            toDoAndDateClone.push({
                date: date,
                toDoList: []
            })
            setToDoAndDate(toDoAndDateClone)
            setToDoList([])
        }
        for(let i = 0; i< toDoAndDate.length; i++){
            if(date === toDoAndDate[i].date){
                setToDoList(toDoAndDate[i].toDoList)
            }
        }
    }

    const removeToDo = (toDo) => {
        let toDoAndDateClone = [...toDoAndDate]
        for(let j = 0; j < toDoAndDateClone.length; j++){
            if(dateSelected === toDoAndDateClone[j].date){
                let toDoListClone = [...toDoAndDateClone[j].toDoList]
                for(let i = 0 ; i< toDoListClone.length; i++){
                    if(toDo === toDoListClone[i]){
                        toDoListClone.splice(i,1)
                    }
                }
                toDoAndDateClone[j].toDoList = [...toDoListClone]
                setToDoList(toDoListClone)
                
            }
        }
        setToDoAndDate(toDoAndDateClone) 
    }
  
    return {
        toDoList: toDoList,
        addToDo: addToDo,
        removeToDo: removeToDo,
        selectDate: selectDate
    }
};


