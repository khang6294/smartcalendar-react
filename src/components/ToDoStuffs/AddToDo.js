import React,{useState} from 'react';
import {Input,Button,Row,message} from 'antd';
import './AddToDo.css'


const addToDo = React.memo((props) => {
    const [inputValue,setInputValue] = useState('');

    const onInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const clearInput = () => {
        setInputValue('')
    }

    const onSubmit = () => {
        const toDos = props.toDoList.map(ele => ele.toDo)
        if(inputValue !== ''){
            if(toDos.indexOf(inputValue) >= 0){
                message.error('You already have this stuff to do!');
                return null;
            } else {
                props.newToDo(inputValue);
                clearInput()
            }
        } else return null
    }

    const onSave = () => {
        props.onSave()
        message.success("SAVED!",1)
    }

    return (
        <>
            <Row type="flex" justify="start">
                <Input
                    className="addToDo-field" 
                    value={inputValue} 
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
                <Button 
                    onClick = {onSave}
                    disabled = {!props.edit}
                >
                    Save
                </Button>

            </Row>
            <br/>
            <Row type="flex" justify="start">
                {props.edit ? <p style={{color:'red'}}>Please click SAVE button for new changes</p>: null}
            </Row>
        </>
    )
})

export default addToDo
