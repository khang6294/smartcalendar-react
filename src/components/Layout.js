import React from 'react';
import { Layout } from 'antd';
import HeaderApp from './HeaderApp'
const { Content } = Layout;


const layout = React.memo((props) => {
    return (
        <Layout className="layout">
            <HeaderApp userInfo = {props.userInfo} onLogout = {() => props.onLogout()}/>
            <Content>
                <div style={{ background: '#fff', padding: 50 }}>
                    {props.children}
                </div>
            </Content>
        </Layout>
    )
})


export default layout