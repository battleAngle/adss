import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Form, Switch, Input, InputNumber, Space Button } from 'antd';
import { FolderOpenTwoTone } from '@ant-design/icons';
import Tree from '@hi-ui/hiui/es/tree'

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
    const [treeData, setTreeData] = useState([
        {
            id: 1, title: '主变压器',
            children: [
                {
                    id: 2, title: '主变1',
                    children: [
                        { id: 3, title: '音频设备分析1' },
                        { id: 4, title: '音频设备分析2' },
                        { id: 5, title: '音频设备分析3' }
                    ]
                },
                {
                    id: 6, title: '主变2',
                    children: [
                        { id: 7, title: '音频设备分析4' },
                        { id: 8, title: '音频设备分析5' },
                        { id: 9, title: '音频设备分析6' }
                    ]
                },
            ]
        },
        {
            id: 11, title: '控制装置',
            children: [
                {
                    id: 22, title: '主变3',
                    children: [
                        { id: 33, title: '音频设备分析7' },
                        { id: 44, title: '音频设备分析8' },
                        { id: 55, title: '音频设备分析9' }
                    ]
                },
            ]
        },
    ])
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
                onBeforeSave={(saveNode, data, level) => {
                    console.log(saveNode, data, level)
                    return true
                }}
                onSave={(saveNode, data) => {

                    console.log(saveNode, data)
                }}
                onBeforeDelete={(deleteNode, data, level) => {
                    console.log(deleteNode, data, level)
                    return true
                }}
                onDelete={(deleteNode, data) => {
                    console.log(deleteNode, data)
                }}
                onChange={data => { console.log('Tree data:', data) }}
                highlightable
            />
        </SettingContainer>
    );
}