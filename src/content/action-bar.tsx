import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Space, Row, Col } from 'antd';

const Action = styled.div`
background-color: #1C1566;
    height: 80px;
    margin: 0px 30px;
    text-align: center;
    line-height: 80px;
    font-size: 25px;
    color: #F5F6F4;
    cursor: pointer;
    &.action-active {
        color:#04F8ED;
    }
    
`;

export function ActionBar(props: any) {
    const { changeBar, activeBar } = props;
    return (
        <Row>
            <Col span={8}>
                <Action
                    className={classnames({
                        'action-active': activeBar === 'realtime-monitor'
                    })}
                    onClick={() => changeBar('realtime-monitor')} >实时监测</Action>
            </Col>
            <Col span={8}>
                <Action
                    className={classnames({
                        'action-active': activeBar === 'history-data'
                    })}
                    onClick={() => changeBar('history-data')} >历史数据</Action>
            </Col>
            <Col span={8} >
                <Action className={classnames({
                    'action-active': activeBar === 'system-setting'
                })} onClick={() => changeBar('system-setting')}  >系统设置</Action>
            </Col>
        </Row >
    )
}