import React from 'react';
import styled from 'styled-components';
import { Space, Row, Col } from 'antd';

const Action = styled.div`
    background-color:#1C1566;
    height: 150px;
    margin: 0px 50px;
    text-align:center;
    line-height: 130px;
    font-size: 40px;
    font-weight: bold; 
    color:#F5F6F4;
    cursor:pointer;

    &.action-active {
        color:#04F8ED;
    }
    
`;

export function ActionBar() {
    return (
        <Row>
            <Col span={8}>
                <Action>实时监测</Action>
            </Col>
            <Col span={8}>
                <Action>历史数据</Action>
            </Col>
            <Col span={8} >
                <Action className='action-active' >系统设置</Action>
            </Col>
        </Row>
    )
}