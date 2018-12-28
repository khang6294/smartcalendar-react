import React,{useState} from 'react'
import { Calendar, Alert, Badge } from 'antd';
import moment from 'moment';

const calendarSchedule = React.memo((props) => {
    //console.log(props.toDoAndDate)
    function getListData(value) {
        const availDate = props.toDoAndDate.map(ele => ele.dateWork)
        console.log(availDate)
        const valueFormat = moment(value).format('YYYY-MM-DD')
        let listData = [];
        if(availDate.indexOf(valueFormat) > -1){
            listData = props.toDoAndDate[availDate.indexOf(valueFormat)].toDoList.filter(toDo => toDo.completed === false)
            // console.log(listData)
            
        }
        return listData
    }
        
    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <Badge count={listData.length} offset = {[18,-20]}/>
        )
    }
    const [value,setValue] = useState(moment(Date.now()));
    const [selectedValue, setSelectedValue] = useState(moment(Date.now()));
    const onSelect = (value) => {
        setValue(value)
        setSelectedValue(value)
        props.dateSelected(value.format('YYYY-MM-DD'))
    }
    
    const onPanelChange = (value) => {
        setValue(value)
    }

    const incompletedStuffs = props.toDoList.filter(toDo => toDo.completed === false)
    
    return(
        <div>
            <Alert 
                message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} 
            />
            <br/>
            <Alert 
                message={`You have ${incompletedStuffs.length <= 1 ? `${incompletedStuffs.length} stuff`: `${incompletedStuffs.length} stuffs`}  to do`} 
            />
            <Calendar 
                fullscreen={false} 
                value={value} 
                onSelect={onSelect} 
                onPanelChange={onPanelChange} 
                dateCellRender={dateCellRender}
            />
        </div>    
    )
})



export default calendarSchedule