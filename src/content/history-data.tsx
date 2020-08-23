
import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';
import { PrinterTwoTone } from '@ant-design/icons';
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

export function HistoryData() {
    const [visible, setVisible] = useState(false);
    const [viewState, setViewState] = useState('waveform');

    const playAudio = () => {
        const mp3 = document.createElement('audio');
        mp3.src = 'https://www.w3school.com.cn/i/horse.mp3';
        mp3.play();
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '设备',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '报警时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '状态',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '详细',
            dataIndex: 'address',
            key: 'address',
            render: (_, record) => {
                const editable;
                return (
                    <span>
                        <a
                            onClick={() => setVisible(true)}
                            style={{
                                marginRight: 8,
                            }}>
                            波形显示 </a>
                        <a onClick={playAudio} >音频播放</a>
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
                    visible && <div className='history-detial'>
                        <img src='https://battleangle.github.io/adss/assets/charts.png' />
                    </div>
                }
            </div>

        </HistoryDataStyle >
    )
}