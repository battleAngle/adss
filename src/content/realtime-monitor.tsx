import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Button, Input } from 'antd';
import ReactEcharts from "echarts-for-react";

import { getPieCharts, getWaveData } from '@src/api';



const MonitorContainer = styled.div`
    background-color:#1C1566;
    padding: 10px 0px;
    margin: 30px 30px;
    height: calc(100vh - 250px);
    overflow-y: scroll;
    text-align:center;
    bottom:0;
    .ant-card,.ant-card-bordered{
        background-color:#1C1566;
    }
    .row-padding{
        padding: 10px 0px;
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
        padding: 10px 70px 0px 0px;
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
        line-height: 100px;
        margin-left: 30px;
    }
    img{
        width:100%;
        height:100px;
    }
    .text-show-panel{
        float: right;
        color: #F5F6F4;
        margin-top: -150px;
        margin-right: 250px;
    }

    .charts-title{
        color: #F5F6F4;
        font-size: 26px;
        text-align: center;
        margin-top: 20px;
    }
    .time-line{
        color: #F5F6F4;
        font-size: 18px;
        text-align: right;
        padding-right: 40px;
        margin-top: 40px;
    }
    .time-line span{
        border: 1px solid #14659C;
        width: 30px;
        height: 30px;
        display: inline-block;
        text-align: center;
        margin: 0px 2px;
        border-radius: 5px;
    }
`;

// chart.setOption(option);
export function RealTimeMonitor() {
    const [timeNum, setTimeNum] = useState(null);
    const [seriesData, setSeriesData] = useState([
        { value: 1548, name: '正常' },
        { value: 535, name: '预警' },
        { value: 510, name: '一般报警' },
        { value: 634, name: '重要报警' },
        { value: 735, name: '危急报警' }
    ]);
    const [runTime, setRunTime] = useState([5, 15, 25, 30]);


    useEffect(() => {
        getPieCharts().then(resp => {
            const result = resp.result[0];
            const nextResult = [
                { value: result.normal, name: '正常' },
                { value: result.warning, name: '预警' },
                { value: result.alarm, name: '一般报警' },
                { value: result.important, name: '重要报警' },
                { value: result.critical, name: '危急报警' }
            ];
            setSeriesData(nextResult);
            setRunTime(result.duration);
        });

        getWaveData({ "equipment": "cp200001" }).then(resp => {
            console.log(resp, 'resp');
        });
    }, [])

    const option = {
        title: {
            // text: '设备正常运行状态统计',
            subtext: '',
            left: 'center',
            textStyle: {
                color: '#F5F6F4',
                fontSize: 26
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['正常', '预警', '一般报警', '重要报警', '危急报警'],
            textStyle: {
                color: '#F5F6F4',
                bottom: '10px'
            }
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return <MonitorContainer>

        <Row>
            <Col span={10}>
                <div className='charts-title'>设备正常运行状态统计</div>
                <div className='time-line' >
                    <span>{runTime[0]}</span>
                    天
                    <span>{runTime[1]}</span>
                    小时
                    <span>{runTime[2]}</span>
                    分
                    <span>{runTime[3]}</span>
                    秒
                </div>
                <ReactEcharts
                    style={{ marginTop: '50px' }}
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onEvents={{
                        'click': (evt) => setTimeNum(evt.value)
                    }}
                />
            </Col>
            <Col span={14}>
                <>
                    <Row className='row-padding'  >
                        <Col span={22}  >
                            <img src='https://battleangle.github.io/adss/assets/charts.png' />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20} className='sub-name'>
                            时域
                        </Col>
                    </Row>
                    <Row className='row-padding' >
                        <Col span={22} >
                            <img src='https://battleangle.github.io/adss/assets/charts.png' />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20} className='sub-name'>
                            频域
                        </Col>
                    </Row>
                    <Row className='row-padding' >
                        <Col span={22}   >
                            <img src='https://battleangle.github.io/adss/assets/charts.png' />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20} className='sub-name'>
                            时频域
                        </Col>
                    </Row>
                </>
            </Col>
        </Row>



    </MonitorContainer >
}