import React from 'react';
import {List,Icon} from 'antd'



const toDoList = (props) => {
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
                        <Icon type="edit" />, 
                        <Icon type="delete" onClick={() => props.deleteItem(item)}/>
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