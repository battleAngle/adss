import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import { ActionBar } from './action-bar';
import { SystemSetting } from './system-setting';

const ContentBox = styled.div`
    padding: 20px;
    width:100%;
    height:100%;
`;
const { Content } = Layout;

export function ContentLayout() {
    return <ContentBox>
        <Content>
            <ActionBar />
            <SystemSetting />
        </Content>
    </ContentBox>

}