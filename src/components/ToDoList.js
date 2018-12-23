import React,{useState,useEffect} from 'react';
import {List,Icon} from 'antd'

const toDoList = (props) => {
    const [toDoList, setToDoList] = useState([])
    //useEffect to update the toDoList, same as ComponentDidUpdate
    useEffect(() => {
        let toDoListClone = [...toDoList]
        if(props.newToDo !== ''){
            toDoListClone.push(props.newToDo) 
            setToDoList(toDoListClone)
        }
    },[props.newToDo])

    const deleteItem = (item) => {
        let toDoListClone = [...toDoList]
        for(let i = 0; i < toDoListClone.length ; i++){
            if(item === toDoListClone[i]){
                toDoListClone.splice(i,1)
            }
        }
        setToDoList(toDoListClone)
    }
    return(
        <List
            style= {{width: '50%', marginTop:'1rem'}}
            bordered
            dataSource={toDoList}
            renderItem= {item => (
                <List.Item 
                    actions={[
                        <Icon type="edit" />, 
                        <Icon type="delete" onClick={() => deleteItem(item)}/>
                    ]}>
                     <List.Item.Meta
                        title={item}
                        description="To do thing"
                    />
                </List.Item> 
            )}
        />
    )
}

export default toDoList