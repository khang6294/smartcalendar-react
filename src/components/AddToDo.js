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
    return (
        <>
            <Row type="flex" justify="start">
                <Input 
                    value={inputValue} 
                    style={{width:'200px'}}
                    onChange ={onInputChange}
                />
                <Button
                    onClick = {() => {
                        if(inputValue !== ''){
                            props.newToDo(inputValue);
                            clearInput()
                        } else return null
                        
                    }}
                >
                    Add
                </Button>
            </Row>
        </>
    )
})

export default addToDo
