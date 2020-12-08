
import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';
import { PrinterTwoTone } from '@ant-design/icons';
import ReactEcharts from "echarts-for-react";

import useWarnRecords from '@src/models/use-warn-records';
import { getTimeWaveData, getPlayAudioPath } from '@src/api';
import { setupOptions } from './realtime-monitor';

// const BASE_URL = 'http://119.3.88.226';
const BASE_URL = 'http://127.0.0.1:5000';

const HistoryDataStyle = styled.div`
    .history-body{
        background: #1c1565;
        padding: 10px 0px;
        margin: 30px 30px;
        height: calc(100vh - 250px);
        overflow-y: scroll;
        
    }
    .title{
        text-align: center;
        color: #04f8ed;
        font-size: 2rem;
    }
    .history-header{
        position: relative;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
    }
    .history-export{
        float: right;
        top: 0;
        right: 0;
        position: absolute;
    }
    .detial{
    color:white;  
    }
    .history-detial{
        height:120px;
        margin:20px;
    }


    .ant-table{
        background-color: #1C1566;
    }
    .ant-table-wrapper{
        background-color: #1C1566;
    }
    .ant-form-item-label > label{
        color:#F5F6F4;
    }
    .ant-table td {
        color:#F5F6F4;
    }
    .ant-table-thead{
        background-color: #1C1566;
    }
    .ant-table-thead > tr > th {
        color:#F5F6F4;
        background-color: #123D9D;
    }
    .ant-input{
        background-color: #1C1566;
    }
    .ant-table-tbody > tr.ant-table-row:hover > td{
        color: #1890ff;
        background-color: #1C1566;
    }
    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #005EC3;
    }
`

const dataSource = [
    {
        key: '1',
        name: '正常',
        age: 32,
        time: '2020-05-06',
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '预警',
        time: '2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '3',
        name: '一般预警',
        time: '2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '4',
        name: '重要预警',
        age: 42,
        time: '2020-05-06',
        address: '西湖区湖底公园1号',
    },
    {
        key: '5',
        name: '危急预警',
        time: '2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '6',
        name: '重要预警',
        time: '2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '7',
        name: '重要预警',
        time: '2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    }

]
let currentFrame = 0;
let totalFrame = 0;

export function HistoryData() {
    const [visible, setVisible] = useState(false);
    const { records } = useWarnRecords();
    const [chartsData, setChartsData] = useState<{ x?: [], y?: [] }>({});

    const dataSource = records.map((record, index) => ({
        index: index + 1,
        equipment: record.equipment,
        time: record.time,
        status: record.status
    }));

    const playAudio = (equipment: string, time: string) => {
        const mp3 = document.createElement('audio');
        getPlayAudioPath({equipment, time}).then((resp)=>{
            console.log(resp.result[0].audioPath)
            mp3.src = BASE_URL + resp.result[0].audioPath;
            mp3.play();
        });
    };

    const showCharts = (record: any) => {
        setVisible(true);
        console.log(record, 'redd')
        const { equipment, time } = record;
        if(window._timer) {
            window.clearInterval(window._timer);
            currentFrame = 0;
            totalFrame = 0;
        }
        window._timer = window.setInterval(() => {

            if(currentFrame !== totalFrame || (currentFrame === 0 && totalFrame === 0)) {
                getTimeWaveData({ equipment, time, currentFrame ,totalFrame}).then(resp => {
                    console.log(resp, 'resp')
                    const result = resp.result[0];
                    setChartsData({
                        x: result.timeDomainDataX,
                        y: result.timeDomainDataY
                    });
                });
            }
        },1000)
        
    };

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '设备',
            dataIndex: 'equipment',
            key: 'equipment',
        },
        {
            title: '报警时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '详细',
            dataIndex: 'address',
            key: 'address',
            render: (_, record) => {
                return (
                    <span>
                        <a
                            onClick={() => showCharts(record)}
                            style={{
                                marginRight: 8,
                            }}>
                            波形显示 </a>
                        <a onClick={()=> {playAudio(record.equipment, record.time)}} >音频播放</a>
                    </span>
                )
            },
        },
    ];
    return (
        <HistoryDataStyle>
            <div className='history-body'  >
                <div className='history-header'>
                    <div className='title'>报警记录</div>
                    <Button className='history-export' type="link" icon={<PrinterTwoTone />} >导出报表</Button>
                </div>
                <Table columns={columns} dataSource={dataSource} style={{ margin: '20px' }} />
                {
                    visible && <ReactEcharts
                        option={setupOptions(chartsData.x, chartsData.y)}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                    />
                }
            </div>

        </HistoryDataStyle >
    )
}