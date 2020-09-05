import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Button, Input } from 'antd';
import { FolderOpenTwoTone } from '@ant-design/icons';

import { Acq, Alarm, setAcquisition, setAlarm } from '@src/api';

const SettingContainer = styled.div`
    background-color:#1C1566;
    margin: 0px 30px 10px 30px;
    text-align:center;
    height: 100%;
    overflow-y: scroll;
    bottom:0;
    .ant-card,.ant-card-bordered{
        background-color:#1C1566;
    }
    .row-padding{
        padding: 20px 20px 10px;
    }
    .sub-row-padding{
        padding: 5px 0;
    }
    
    .ant-card-body{
        height: 150px;
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
        min-height: 30px;
        border-bottom: 1px solid #07EFE2;
    }
    .ant-card-bordered{
        border:1px solid #07EFE2;
    }
    .ant-card-head-title{
        color:#fff;
        font-size: 20px;
        padding: 0px;
    }
    .ant-card-body{
        color:#fff;
    }
    .title{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display:block
    }
`;

export function System() {
    const [acqData, setAcqData] = useState<Acq>({});
    const [alarmData, setAlarmData] = useState<Alarm>({});


    const onRrChange = (evt: any) => {
        const { value } = evt.target;
        setAcqData(Object.assign({}, acqData, { Rr: value }));
    }
    const onSrChange = (evt: any) => {
        const { value } = evt.target;
        setAcqData(Object.assign({}, acqData, { SR: value }));
    }
    const onSNRChange = (evt: any) => {
        const { value } = evt.target;
        setAcqData(Object.assign({}, acqData, { SNR: value }));
    }

    const onUpChange = (evt: any) => {
        const { value } = evt.target;
        setAlarmData(Object.assign({}, alarmData, { up: value }));
    }
    const onDownChange = (evt: any) => {
        const { value } = evt.target;
        setAlarmData(Object.assign({}, alarmData, { down: value }));
    }
    const onDbChange = (evt: any) => {
        const { value } = evt.target;
        setAlarmData(Object.assign({}, alarmData, { db: value }));
    }

    const saveParamsSettings = () => {
        setAcquisition(acqData);
        setAlarm(alarmData);
    }


    return (
        <SettingContainer>
            <div className='card-buttons'>
                <Button type='primary' onClick={saveParamsSettings}  >
                    保存
            </Button>
                <Button type='primary' >
                    取消
            </Button>
            </div>
            <Row className='row-padding' >
                <Col span={10} offset={1}  >
                    <Card title='采集设置'>
                        <Row align="middle" className='sub-row-padding'>
                            <Col span={6} offset={1}>
                                <span className='title'>灵敏度</span>
                            </Col>
                            <Col span={15}>
                                <Input size="small" value={acqData.Rr} onChange={onRrChange} />
                            </Col>
                        </Row>
                        <Row align="middle" className='sub-row-padding' >
                            <Col span={6} offset={1}>
                                <span className='title'>采样率</span>
                            </Col>
                            <Col span={15}>
                                <Input size="small" value={acqData.SR} onChange={onSrChange} />
                            </Col>
                        </Row>
                        <Row align="middle" className='sub-row-padding' >
                            <Col span={6} offset={1}>
                                <span className='title'>信噪比</span>
                            </Col>
                            <Col span={15}>
                                <Input size="small" value={acqData.SNR} onChange={onSNRChange} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={10} offset={2} >
                    <Card title='报警设置'>
                        <Row align="middle" className='sub-row-padding' style={{ paddingTop: '20px' }} >
                            <Col span={6} offset={1}>
                                <span className='title'> 频率报警区域</span>
                            </Col>
                            <Col span={7}>
                                <Input size="small" prefix='上限' suffix='HZ' value={alarmData.up} onChange={onUpChange} />
                            </Col>
                            <Col span={7} offset={1}>
                                <Input size="small" prefix='下限' suffix='HZ' value={alarmData.down} onChange={onDownChange} />
                            </Col>
                        </Row>
                        <Row align="middle" className='sub-row-padding' style={{ paddingTop: '10px' }} >
                            <Col span={6} offset={1}>
                                <span className='title'> 最大报警分贝</span>
                            </Col>
                            <Col span={15}>
                                <Input size="small" value={alarmData.db} onChange={onDbChange} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className='row-padding'>
                <Col title='存储路径' span='22' offset={1} >
                    <Card title='存储路径'>
                        <Row align="middle" className='sub-row-padding' style={{ paddingTop: '20px' }} >
                            <Col span={4}>
                                <span className='title'> 存储路径</span>
                            </Col>
                            <Col span={17}>
                                <Input size="small" defaultValue={120} />
                            </Col>
                            <Col span={2}>
                                <FolderOpenTwoTone style={{ fontSize: '22px' }} />
                            </Col>
                        </Row>
                        <Row align="middle" className='sub-row-padding' style={{ paddingTop: '20px' }} >
                            <Col span={4} >
                                <span className='title'> 导出路径</span>
                            </Col>
                            <Col span={17}>
                                <Input size="small" defaultValue={120} />
                            </Col>
                            <Col span={2}>
                                <FolderOpenTwoTone style={{ fontSize: '22px' }} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </SettingContainer>
    );
}