import React from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Button, Input } from 'antd';

import charts from '../assets/charts.png';


const MonitorContainer = styled.div`
    background-color:#1C1566;
    padding: 20px 30px;
    margin: 30px 50px;
    height: calc(100vh - 270px);
    overflow-y: scroll;
    text-align:center;
    bottom:0;
    .ant-card,.ant-card-bordered{
        background-color:#1C1566;
    }
    .row-padding{
        padding: 20px 0px;
    }
    .sub-row-padding{
        padding: 5px 0;
    }

    .ant-card-body{
        height:180px;
    }
    .card-buttons{
        height: 55px;
        width: 100%;
        padding: 20px 70px 0px 0px;
    }
    .card-buttons button{
        float:right; 
        margin:0px 10px;
    }
    .ant-card-head{
        border-bottom: 1px solid #07EFE2;
    }
    .ant-card-bordered{
        border:1px solid #07EFE2;
    }
    .ant-card-head-title{
        color:#fff;
        font-size: 20px;
    }
    .ant-card-body{
        color:#fff;
    }
    .monitor-charts{
        background-image: url('/assets/charts.png');
    }
    .sub-name{
        font-size: 25px;
        color:#27EDF5;
        text-align:center;
        line-height: 140px;
        margin-left: 30px;
    }
`;

export function RealTimeMonitor() {
    return <MonitorContainer>
        <Row className='row-padding'  >
            <Col span={18} offset={1}  >
                <img src='https://battleangle.github.io/adss/assets/charts.png' />
            </Col>
            <Col span={3} className='sub-name'>
                时域
            </Col>
        </Row>
        <Row className='row-padding' >
            <Col span={18} offset={1}  >
                <img src='/assets/charts.png' />
            </Col>
            <Col span={3} className='sub-name'>
                频域
            </Col>
        </Row>
        <Row className='row-padding' >
            <Col span={18} offset={1}  >
                <img src='/assets/charts.png' />
            </Col>
            <Col span={3} className='sub-name'>
                时频域
            </Col>
        </Row>

    </MonitorContainer >
}