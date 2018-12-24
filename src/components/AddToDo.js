import React,{useState} from 'react';
import {Input,Button,Row,message} from 'antd';
import toDoList from './ToDoList';


const addToDo = React.memo((props) => {
    const [inputValue,setInputValue] = useState('');
    
    const onInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const clearInput = () => {
        setInputValue('')
    }

    const onSubmit = () => {
        if(inputValue !== ''){
            if(props.toDoList.indexOf(inputValue) >= 0){
                message.error('You already have this stuff to do!');
                return null;
            } else {
                props.newToDo(inputValue);
                clearInput()
            }
        } else return null
    }

    return (
        <>
            <Row type="flex" justify="start">
                <Input 
                    value={inputValue} 
                    style={{width:'200px'}}
                    onChange ={onInputChange}
                    onKeyPress = {(event) => {
                        if (event.which === 13 || event.keyCode === 13) {
                            onSubmit()
                        }
                    }}
                />
                <Button
                    onClick = {onSubmit}
                >
                    Add
                </Button>
            </Row>
        </>
    )
})

export default addToDo
