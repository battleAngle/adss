import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Table, Space, message } from 'antd';
import { SearchOutlined, PlusOutlined, FormOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import useMenu from '@src/models/use-menu';
import { saveEquipment, getMenuList } from '@src/api';

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
    .ant-form-item-control-input-content input {
        color:#F5F6F4;
    }
`;

function EditableCell(
    {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }: any
) {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `请输入 ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
}


export function EquipmentTable() {
    const { treeData, tableData, setTableData, setTreeData } = useMenu();
    const [editingKey, setEditingKey] = useState('');
    const [renderCount, setRenderCount] = useState(0);
    const [itemAdded, setItemAdded] = useState(null);
    const [form] = Form.useForm();
    const isEditing = (record: any) => record.name === editingKey;

    const edit = (record: any) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.name);
    }


    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '所属应用',
            dataIndex: 'application',
            key: 'belongApp',
            editable: true,
        },
        {
            title: '菜单名称',
            dataIndex: 'name',
            key: 'name',
            editable: true,
        },
        {
            title: '上级菜单名称',
            key: 'menu',
            dataIndex: 'menu',
            editable: true,
        },
        // {
        //     title: '菜单标识',
        //     key: 'menuTag',
        //     dataIndex: 'menuTag',
        //     editable: true,
        // },
        {
            title: '类型',
            key: 'type',
            dataIndex: 'type',
            editable: false,
        },
        {
            title: 'IP地址',
            key: 'ipAddr',
            dataIndex: 'ipAddr',
            editable: true,
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            editable: false,
        },
        // {
        //     title: '排序号',
        //     key: 'sortId',
        //     dataIndex: 'sortId',
        // },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return <Space size="middle">
                    {
                        editable ? <>
                            <Button type='primary' icon={<CheckCircleOutlined />} onClick={() => save(record.name)} >保存</Button>
                            <Button type='primary' icon={<CloseCircleOutlined />} >取消</Button>
                        </> : <>
                                <Button type='primary' icon={<FormOutlined />} onClick={() => { edit(record) }} >编辑</Button>
                                <Button type='primary' icon={<DeleteOutlined />} >删除</Button>
                            </>
                    }

                </Space>
            },
        },
    ];



    const save = async (key: React.Key) => {
        try {
            const row = await form.validateFields();
            const newData = [...tableData];
            const index = newData.findIndex(item => key === item.name);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setEditingKey('');
            } else {
                newData.push(row);
                setEditingKey('');
            }

            console.log(newData, 'newdata');
            saveEquipment(newData)
                .then(resp => {
                    if (resp.code === 0) {
                        message.success('保存成功');
                    }
                    getMenuList().then(resp => {
                        const result = resp.result;
                        setTreeData(result);
                    });
                }).catch(err => {
                    message.error('保存失败');
                })

        } catch (error) {
            console.log('校验失败:', error);
        }
    };

    const add = () => {
        setTableData([{
            index: 1,
            application: '',
            name: '',
            menu: '',
            menuTag: '',
            type: '菜单',
            ipAddr: '',
            status: '启用',
            sortId: ''
        }, ...tableData])
    }

    const mergedColumns = columns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    console.log(tableData, 'tableda')
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
                    <Button type='primary' htmlType='button' icon={<PlusOutlined />} onClick={add} >新增</Button>
                </Form.Item>
            </Form>
            <Form form={form} component={false} >
                <Table
                    components={{
                        body: {
                            cell: EditableCell
                        }
                    }}
                    columns={mergedColumns}
                    dataSource={tableData}
                />
            </Form>
        </Container>
    );
}