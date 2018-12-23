import React from 'react';
import {List,Icon} from 'antd'

const toDoList = (props) => {
    return(
        <List
            style= {{width: '50%', marginTop:'1rem'}}
            bordered
            dataSource={props.toDoList}
            renderItem= {item => (
                <List.Item actions={[<Icon type="edit" />, <Icon type="delete" />]}>
                     <List.Item.Meta
                        title={<a href="https://ant.design">{item}</a>}
                        description="List item"
                    />
                </List.Item> 
            )}
        />
    )
}

export default toDoList