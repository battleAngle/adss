import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Form, Switch, Input, InputNumber, Space, Button } from 'antd';
import { FolderOpenTwoTone } from '@ant-design/icons';
import Tree from '@hi-ui/hiui/es/tree';

import useMenu from '@src/models/use-menu';

const EquipmentContainer = styled.div`
    background-color:#1C1566;
    margin: 0px 30px 10px 30px;
    text-align:center;
    height: 100%;
    overflow-y: scroll;
    bottom:0;
  
    .card-buttons{
        height: 55px;
        width: 100%;
        padding: 0px 20px 0px 0px;
        margin: 0px 10px 30px 10px;
    }
    .card-buttons button{
        float:right; 
        margin:0px 10px;
    }
    .card-buttons input {
        margin-bottom: 3px;
        width: 100%;
        background-color: #1C1566;
        border-color: 1px solid #0090FF;
    }
    .editable-row .ant-form-item-explain {
        position: absolute;
        top: 100%;
        font-size: 12px;
    }
    .hi-tree{
        color:#F5F6F4;
    }
    .hi-tree_item-text:hover:not(.hi-tree_item-text--disabled) {
        background-color: rgba(66,133,244,0.08);
        color: #1890ff;
    }
`;


export function EquipmentTree() {
    const { treeData, updateTitleById, deleteById, setTreeData } = useMenu();
    return (
        <EquipmentContainer>
            <div className='card-buttons' style={{ textAlign: 'right' }} >
                <Input placeholder='请选择' />
                <Input placeholder='请输入关键词搜索' />
            </div>
            <Tree
                defaultExpandAll
                apperance="line"
                editable={false}
                data={treeData}
                contextMenu={() => {
                    return [{ type: 'editNode' }, { type: 'deleteNode' }]
                }}
                onSave={(saveNode, data) => {
                    const { id, title } = saveNode;
                    console.log(saveNode, data, 'xx')
                    // updateTitleById(id, title);
                    setTreeData(data);
                }}
                onDelete={(deleteNode, data) => {
                    deleteById(deleteNode.id);
                }}
                highlightable
            />
        </SettingContainer>
    );
}