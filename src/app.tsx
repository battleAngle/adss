import { hot } from 'react-hot-loader/root'
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import { HeaderMenu } from './header';
import { SiderLayout } from './sider';
import { ContentLayout } from './content';


const { Header, Sider, Content } = Layout;

const AppContainer = styled.div`
    .ant-layout{
        height: 100%;
    }
    .ant-layout-header{
        height: 100px;
        background-color:#1E0656;
    }
`;


function App() {
    return (
        <React.Suspense fallback={<div>Loading</div>}>
            <AppContainer>
                <Layout  >
                    <Header >
                        <HeaderMenu></HeaderMenu>
                    </Header>
                    <Layout style={{ backgroundColor: '#210956' }} >
                        <SiderLayout />
                        <ContentLayout />
                    </Layout>
                </Layout>
            </AppContainer>
        </React.Suspense >
    );
}

const Root = process.env.NODE_ENV === 'development' ? hot(App) : App

ReactDOM.render(<Root />, document.getElementById('root'));
