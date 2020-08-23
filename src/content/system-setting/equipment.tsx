import React from 'react';
import { Layout } from 'antd';

import { EquipmentTree } from './equipment-tree';
import { EquipmentTable } from './equipment-table';

const { Sider, Content } = Layout;

export function Equipment() {
    return (
        <div>
            <Layout style={{ backgroundColor: '#1C1566' }} >
                <Sider width='300' style={{ backgroundColor: '#1C1566' }} >
                    <EquipmentTree />
                </Sider>
                <Layout>
                    <Content style={{ backgroundColor: '#1C1566', color: '#F5F6F4' }}>
                        <EquipmentTable />
                    </Content>
                </Layout>
            </Layout>
        </div >
    );
}