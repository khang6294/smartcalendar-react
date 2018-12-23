import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;


const headerApp = React.memo((props) => {
    return (
        <Header style={{background:'#0b66bd'}}>
            <div style={{fontSize:'1.5em',color:'white',fontWeight:'bold'}}>
                TODOAPP
            </div>
        </Header>
    )
})

export default headerApp;