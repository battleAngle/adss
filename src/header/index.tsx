import React from 'react';
import styled from 'styled-components';
import { Typography, Row, Col, Badge, Space } from 'antd';

import { CurrentTime } from './current-time';
import { UserLogined } from './user-login';
import useTabBar from '@src/models/use-tabbar';
import useWarnRecords from '@src/models/use-warn-records';

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
        text-align:center;
        margin-top:5px;
    }
    .ant-typography.sub-title{
        font-size:15px;
        text-align:center;
        top: -4px;
        margin-top:-10px;
    }
    .right-panel{
        padding: 0px 30px;
        height: 80px;
        font-size:19px;
        top: 0;
        right: 20px;
        position: absolute;
    }
    .right-panel .ant-space-item .badge-count {
        color:#296FB2;
        font-size:19px;
        text-align: center;
    }
    .right-panel-time{
        padding: 0px 30px;
        cursor: pointer;
    }
`;

export function HeaderMenu() {
    const { setActiveBar } = useTabBar();
    const { records } = useWarnRecords();
    return <HeaderContainer className='right'>
        <Row>
            <Col span={24}>
                <Title className='main-title'>变电站声学检测系统</Title>
                <Title className='sub-title' level={4}>Acoustic detection system for Substation</Title>
                <Space className='right-panel' align='end' >
                    <span className='right-panel-time' onClick={() => setActiveBar('history-data')} >
                        <Badge count={records.length} className='badge-count' offset={[15, 0]}  >
                            <span>报警数目</span>
                        </Badge>
                    </span>
                    {/* <span className='right-panel-time' > */}
                    <CurrentTime />
                    {/* </span> */}
                    <UserLogined />
                </Space>
            </Col>
            {/* <Col span={9}> */}

            {/* </Col> */}
        </Row>

    </HeaderContainer>
}