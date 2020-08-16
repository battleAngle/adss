import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Form, Switch, Input, InputNumber, Space Button } from 'antd';
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
        padding: 0px 70px 0px 0px;
    }
    .card-buttons button{
        float:right; 
        margin:0px 10px;
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


export function Equipment() {
    const { treeData, updateTitleById } = useMenu();
    return (
        <EquipmentContainer>
            <div className='card-buttons' style={{ textAlign: 'right' }} >
                右击列表项进行编辑
            </div>
            <Tree
                defaultExpandAll
                apperance="line"
                editable={true}
                data={treeData}
                contextMenu={() => {
                    return [{ type: 'editNode' }]
                }}
                // onBeforeSave={(saveNode, data, level) => {
                //     console.log(saveNode, data, level)
                //     return true
                // }}
                onSave={(saveNode, data) => {
                    const { id, title } = saveNode;
                    updateTitleById(id, title);
                }}
                // onBeforeDelete={(deleteNode, data, level) => {
                //     console.log(deleteNode, data, level)
                //     return true
                // }}
                // onDelete={(deleteNode, data) => {
                //     console.log(deleteNode, data)
                // }}
                onChange={data => { console.log('Tree data:', data) }}
                highlightable
            />
        </SettingContainer>
    );
}