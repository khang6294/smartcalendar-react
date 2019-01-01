import React from 'react';
import { Layout,Col,Row } from 'antd';
import './HeaderApp.css'

const { Header } = Layout;


const headerApp = React.memo((props) => {
    return (
        <Header style={{background:'#0b66bd'}}>
            <Row type="flex">
                <Col span={18}>
                    <div style={{fontSize:'1.5em',color:'white',fontWeight:'bold'}}>
                        SmartCalendar
                    </div>
                </Col>
                <Col span={6}>
                    <div 
                        id="menu-list"
                    >
                        <div 
                            className="menu-item"
                            onClick = {() => props.onLogout()}
                        >
                            Logout
                        </div>
                    </div>
                </Col>
            </Row>
        </Header>
    )
})

export default headerApp;