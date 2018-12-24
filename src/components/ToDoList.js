import React from 'react';
import {List,Icon,Checkbox} from 'antd'



const toDoList = (props) => {
    const onComplete = (e,item) =>{
        console.log(`checked = ${e.target.checked}`);
        console.log({
            item: item,
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
                <List.Item 
                    actions={[
                        <Icon type="delete" onClick={() => props.deleteItem(item)}/>
                    ]}>
                    <List.Item.Meta
                        title={item}
                        description={
                            <Checkbox 
                                onChange={(event) => onComplete(event,item)}
                            >
                                Complete
                            </Checkbox>
                        }
                    />
                </List.Item> 
            )}
        />
    )
}

export default toDoList