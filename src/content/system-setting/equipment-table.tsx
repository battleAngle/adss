import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Table, Space } from 'antd';
import { SearchOutlined, PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

import useMenu from '@src/models/use-menu';

const Container = styled.div`
    .ant-table{
        background-color: #1C1566;
    }
    .ant-table-wrapper{
        background-color: #1C1566;
    }
    .ant-form-item-label > label{
        color:#F5F6F4;
    }
    .ant-table td {
        color:#F5F6F4;
    }
    .ant-table-thead{
        background-color: #1C1566;
    }
    .ant-table-thead > tr > th {
        color:#F5F6F4;
        background-color: #123D9D;
    }
    .ant-input{
        background-color: #1C1566;
    }
    .ant-table-tbody > tr.ant-table-row:hover > td{
        color: #1890ff;
        background-color: #1C1566;
    }
    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #005EC3;
    }
`;


export function EquipmentTable() {
    const { treeData } = useMenu();
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '所属应用',
            dataIndex: 'belongApp',
            key: 'belongApp',
        },
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            key: 'menuName',
        },
        {
            title: '上级菜单名称',
            key: 'fatherMenuName',
            dataIndex: 'fatherMenuName',
        },
        {
            title: '菜单标识',
            key: 'menuTag',
            dataIndex: 'menuTag',
        },
        {
            title: '类型',
            key: 'type',
            dataIndex: 'type',
        },
        {
            title: 'IP地址',
            key: 'ipAddress',
            dataIndex: 'ipAddress',
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
        },
        {
            title: '排序号',
            key: 'sortId',
            dataIndex: 'sortId',
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type='primary' icon={<FormOutlined />} >编辑</Button>
                    <Button type='primary' icon={<DeleteOutlined />} >删除</Button>
                </Space>
            ),
        },
    ];

    const tableData: any[] = [];
    let index = 0;
    const parseTreeData = (data: any[], belongApp: string, fatherTitle?: string) => {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (item.children && item.children.length > 0) {
                let fatherTitle = item.title;
                parseTreeData(item.children, belongApp, fatherTitle);
            } else {
                tableData.push({
                    index: ++index,
                    belongApp: belongApp,
                    menuName: item.title,
                    fatherMenuName: fatherTitle || belongApp,
                    menuTag: item.id,
                    type: '菜单',
                    ipAddress: item.ipAddress,
                    status: '启用',
                    sortId: item.id,
                });
            }
        }
    };

    for (let i = 0, len = treeData.length; i < len; i++) {
        const item = treeData[i];
        const belongApp = item.title;
        parseTreeData(treeData, belongApp);
    }



    return (
        <Container>
            <Form
                layout='inline'
                style={{ margin: '10px' }}
            >
                <Form.Item name='name' label='菜单名称' >
                    <Input type='text' />
                </Form.Item>
                <Form.Item name='id' label='菜单标识' >
                    <Input type='text' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' icon={<SearchOutlined />} style={{ marginRight: '10px' }}  >查询</Button>
                    <Button type='primary' htmlType='button' icon={<PlusOutlined />} >新增</Button>
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={tableData} />
        </Container>
    );
}