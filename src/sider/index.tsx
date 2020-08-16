import React from 'react';
import { Layout, Typography } from 'antd';

import { SiderMenu } from './sider-menu';

const { Sider } = Layout;
const { Title } = Typography;

const styles = {
    sider: {
        width: '400px',
        backgroundColor: '#1D1667',
        margin: '20px',
        overflow: 'scroll'
    },
    title: {
        color: '#4186CA',
        textAlign: 'center',
        marginTop: '10px'
    }
}

export function SiderLayout() {
    return (
        <Sider theme='light' style={styles.sider}  >
            <Title level={2} style={styles.title}>设备列表</Title>
            <SiderMenu />
        </Sider>
    );
}