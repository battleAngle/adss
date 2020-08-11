import React from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Button, Input } from 'antd';

const SettingContainer = styled.div`
    background-color:#1C1566;
    margin: 35px 50px;
    text-align:center;
    bottom:0;
    .ant-card,.ant-card-bordered{
        background-color:#1C1566;
    }
    .row-padding{
        padding: 30px 20px;
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
`;

export function SystemSetting() {
    return (
        <SettingContainer>
            <div className='card-buttons'>
                <Button>
                    保存
            </Button>
                <Button>
                    编辑
            </Button>
            </div>
            <Row className='row-padding' >
                <Col span={10} offset={1}  >
                    <Card title='采集设置'>
                        <Row align="middle" className='sub-row-padding'>
                            <Col span={6} offset={1}>
                                灵敏度
					        </Col>
                            <Col span={15}>
                                <Input defaultValue={120} />
                            </Col>
                        </Row>
                        <Row align="middle" className='sub-row-padding' >
                            <Col span={6} offset={1}>
                                采样率
					        </Col>
                            <Col span={15}>
                                <Input defaultValue={120} />
                            </Col>
                        </Row>
                        <Row align="middle" className='sub-row-padding' >
                            <Col span={6} offset={1}>
                                信噪比
					        </Col>
                            <Col span={15}>
                                <Input defaultValue={120} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={10} offset={2} >
                    <Card title='报警设置'>
                        报警设置
                    </Card>
                </Col>
            </Row>
            <Row className='row-padding'>
                <Col title='存储路径' span='22' offset={1} >
                    <Card title='存储路径'>
                        存储路径
                    </Card>
                </Col>
            </Row>
        </SettingContainer>
    );
}