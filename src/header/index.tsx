import React from 'react';
import styled from 'styled-components';
import { Typography, Row, Col, Badge, Space } from 'antd';

import { CurrentTime } from './current-time';
import { UserLogined } from './user-login';

const { Title } = Typography;

const HeaderContainer = styled.div`
    .right {
        float: right;
        margin-left: auto;
        overflow: hidden;
    }
    .ant-typography{
        color: #00FFF4;
    }
    .ant-typography.main-title{
        text-align:right;
        margin-top:5px;
    }
    .ant-typography.sub-title{
        text-align:right;
        top: -4px;
        margin-top:-10px;
    }
    .right-panel{
        float: right;
        height:60%;
    }
    .badge-count{
        color:#296FB2;
    }
    .badge-count span{

    }
`;

export function HeaderMenu() {
    return <HeaderContainer className='right'>
        <Row>
            <Col span={15}>
                <Title className='main-title'>变电站声学检测系统</Title>
                <Title className='sub-title' level={4}>Acoustic detection system for Substation</Title>
            </Col>
            <Col span={9}>
                <Space className='right-panel' align='end' >
                    <Badge count='9' className='badge-count' offset={[15, 0]} >
                        <span>报警数目</span>
                    </Badge>
                    <CurrentTime />
                    <UserLogined />
                </Space>
            </Col>
        </Row>

    </HeaderContainer>
}