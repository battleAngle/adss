import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import { ActionBar } from './action-bar';
import { SystemSetting } from './system-setting';
import { HistoryData } from './history-data';
import { RealTimeMonitor } from './realtime-monitor';
import useTabBar from '@src/models/use-tabbar';

const ContentBox = styled.div`
    padding: 20px 0px;
    width:100%;
    height:100%;
`;
const { Content } = Layout;

export function ContentLayout(props) {

    const { activeBar, setActiveBar } = useTabBar();
    let Bar = null;
    switch (activeBar) {
        case 'realtime-monitor':
            Bar = <RealTimeMonitor selectedEquipment={props.selectedEquipment}/>
            break;
        case 'history-data':
            Bar = <HistoryData />
            break;
        case 'system-setting':
            Bar = <SystemSetting />
            break;
        default:
            break;
    }
    return <ContentBox>
        <Content>
            <ActionBar changeBar={setActiveBar} activeBar={activeBar} />
            {Bar}
        </Content>
    </ContentBox>
}
