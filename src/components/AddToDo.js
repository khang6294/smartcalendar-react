import React,{useState} from 'react';
import {Input,Button,Row} from 'antd';


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
            props.newToDo(inputValue);
            clearInput()
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
