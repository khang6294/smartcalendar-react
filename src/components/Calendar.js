import React,{useState} from 'react'
import { Calendar, Alert } from 'antd';
import moment from 'moment';

const calendarSchedule = React.memo((props) => {
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
    
    return(
        <div>
            <Alert 
                message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} 
            />
            <Calendar 
                fullscreen={false} 
                value={value} 
                onSelect={onSelect} 
                onPanelChange={onPanelChange} 
            />
        </div>    
    )
})



export default calendarSchedule