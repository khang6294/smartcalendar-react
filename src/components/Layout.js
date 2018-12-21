import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;


const layout = React.memo((props) => {
    return (
        <Layout className="layout">
            <Header style={{background:'#0b66bd'}}>
                <div className="logo">
                    TODOAPP
                </div>
            </Header>
            <Content style={{ padding: '' ,height:'100vh'}}>
                <div style={{ background: '#fff', padding: 24,height: '95%' }}>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                KenNguyenSideProj
            </Footer>
        </Layout>
    )
})


export default layout