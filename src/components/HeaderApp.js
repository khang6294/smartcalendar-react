import React from 'react';
import { Layout,Col,Row } from 'antd';
import './HeaderApp.css'

const { Header } = Layout;


const headerApp = React.memo((props) => {
    return (
        <Header style={{background:'#0b66bd'}}>
            <Row type="flex">
                <Col xs={10} sm={12} md={15} lg={18} xl={18}>
                    <div id = "logo">
                        SmartCalendar
                    </div>
                </Col>
                <Col xs={7} sm={6} md={4} lg={3} xl={3}>
                    <div 
                        id="menu-list"
                    >
                        <div 
                            className="menu-item-name"
                        >
                            Hi, {props.userInfo.name}
                        </div>
                    </div>
                </Col>
                <Col xs={7} sm={6} md={4} lg={3} xl={3}>
                    <div 
                        id="menu-list"
                    >
                        <div 
                            className="menu-item-logout"
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