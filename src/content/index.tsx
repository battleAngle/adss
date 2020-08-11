import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import { ActionBar } from './action-bar';
import { SystemSetting } from './system-setting';
import {HistoryData} from './history-data';
import { RealTimeMonitor } from './realtime-monitor';

const ContentBox = styled.div`
    padding: 20px;
    width:100%;
    height:100%;
`;
const { Content } = Layout;

export function ContentLayout() {
    const [activeBar, setActiveBar] = useState<ActiveBar>('system-setting');
    let Bar = null;
    switch (activeBar) {
        case 'realtime-monitor':
            Bar = <RealTimeMonitor />
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

type ActiveBar = 'system-setting' | 'realtime-monitor'|'history-data';