import React from 'react';
import styled from 'styled-components';
import { Tabs, } from 'antd';
import { FolderOpenTwoTone } from '@ant-design/icons';
import { System } from './system-setting/system'
import { Equipment } from './system-setting/equipment'

const { TabPane } = Tabs;

const SystemContainer = styled.div`
    background-color:#1C1566;
    margin: 35px 30px;
    text-align:center;
    height: calc(100vh - 250px);
    overflow-y: scroll;
    bottom:0;
    .ant-tabs.ant-tabs-top{
        color:white;
    }
//     .ant-card,.ant-card-bordered{
//         background-color:#1C1566;
//     }
//     .row-padding{
//         padding: 20px 20px 10px;
//     }
//     .sub-row-padding{
//         padding: 5px 0;
//     }

//     .ant-card-body{
//         height: 150px;
//     }
//     .card-buttons{
//         height: 55px;
//         width: 100%;
//         padding: 20px 70px 0px 0px;
//     }
//     .card-buttons button{
//         float:right; 
//         margin:0px 10px;
//     }
//     .ant-card-head{
//         min-height: 30px;
//         border-bottom: 1px solid #07EFE2;
//     }
//     .ant-card-bordered{
//         border:1px solid #07EFE2;
//     }
//     .ant-card-head-title{
//         color:#fff;
//         font-size: 20px;
//         padding: 0px;
//     }
//     .ant-card-body{
//         color:#fff;
//     }
//     .title{
//         white-space: nowrap;
//         text-overflow: ellipsis;
//         overflow: hidden;
//         display:block
//     }
`;

export function SystemSetting() {
    return (
        <SystemContainer>
            <Tabs defaultActiveKey="1" style={{ margin: '10px' }} >
                <TabPane tab="设备设置" key="equipment-setting">
                    <Equipment />
                </TabPane>
                <TabPane tab="参数设置" key="params-setting">
                    <System />
                </TabPane>
            </Tabs>
        </SystemContainer>
    );
}