import { hot } from 'react-hot-loader/root'
import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, message } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import { HeaderMenu } from './header';
import { SiderLayout } from './sider';
import { ContentLayout } from './content';
import { getMenuList, getWarnRecords } from './api';
import useMenu from './models/use-menu';
import useWarnRecords from './models/use-warn-records';

const { Header, Sider, Content } = Layout;

const AppContainer = styled.div`
    .ant-layout{
        height: 100%;
        overflow:hidden;
    }
    .ant-layout-header{
        height: 100px;
        background-color:#301e58;
        padding:0px;
    }
`;


function App() {
    const { setTreeData } = useMenu();
    const { setRecords } = useWarnRecords();
    const [ selectedEquipment, setSelectedEquipment] = useState('');

    useEffect(() => {
        getMenuList().then(resp => {
            const result = resp.result;
            setTreeData(result);
        });
        getWarnRecords().then(resp => {
            const result = resp.result;
            setRecords(result);
        });
    }, []);
    return (
        <React.Suspense fallback={<div>Loading</div>}>
            <AppContainer>
                <Layout  >
                    <Header >
                        <HeaderMenu></HeaderMenu>
                    </Header>
                    <Layout style={{ backgroundColor: '#210956' }} >
                        <SiderLayout setSelectedEquipment={setSelectedEquipment}/>
                        <ContentLayout selectedEquipment={selectedEquipment}/>
                    </Layout>
                </Layout>
            </AppContainer>
        </React.Suspense >
    );
}

const Root = process.env.NODE_ENV === 'development' ? hot(App) : App

ReactDOM.render(<Root />, document.getElementById('root'));
