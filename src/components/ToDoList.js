import React from 'react';
import {List,Icon,Checkbox} from 'antd'



const toDoList = (props) => {
    const onComplete = (e,item) =>{
        props.completeItem({
            toDo: item.toDo,
            completed: e.target.checked
        })
    }
    return(
        <List
            style= {{width: '50%', marginTop:'1rem'}}
            bordered
            dataSource={props.toDoList}
            locale = {{
                emptyText:'You have nothing to do!'
            }}
            renderItem= {item => (
                <div>
                    {/* {item.completed ? 
                    <Icon 
                        type="check-circle" 
                        style={{
                            position: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height:'100%',
                            zIndex: 100
                        }}/> : 
                    null 
                    } */}

                <List.Item 
                    style ={ item.completed ? {opacity: 0.3} : {}}
                    actions={[
                        <Icon type="delete" onClick={() => props.deleteItem(item.toDo)}/>
                    ]}>
                    <List.Item.Meta
                        title={item.toDo}
                        description={
                            <Checkbox 
                                checked = {item.completed}
                                onChange={(event) => onComplete(event,item)}
                            >
                                Complete
                            </Checkbox>
                        }
                    />
                </List.Item> 
                </div>
            )}
        />
    )
}

export default toDoList