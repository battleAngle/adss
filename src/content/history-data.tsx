
import React from 'react';
import styled from 'styled-components';
import { Table, Button, } from 'antd';
const HistoryDataStyle = styled.div`

.history-body{
    background: #1c1565;
    padding: 20px 30px;
    margin: 30px 50px;
    height: calc(100vh - 270px);
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
`
const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        // sorter: (a:any)=>{
        //     console.log(a)
        // },
        // render: (text:any,index:any )=>{
        //     console.log(text,index)
        //     // <a>{text}</a>
        // },
        // render: (props) => (
        //     console.log(props)
        //     //   <a>Delete</a>
              
             
        //   ),
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
        title: '人员',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
];
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        time:'2020-05-06',
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        time:'2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '3',
        name: '胡彦祖',
        time:'2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '4',
        name: '胡彦祖',
        age: 42,
        time:'2020-05-06',
        address: '西湖区湖底公园1号',
    },
    {
        key: '5',
        name: '胡彦祖',
        time:'2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '6',
        name: '胡彦祖',
        time:'2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '7',
        name: '胡彦祖',
        time:'2020-05-06',
        age: 42,
        address: '西湖区湖底公园1号',
    }

]
export function HistoryData() {

    return (
        <HistoryDataStyle>
            <div className='history-body'>
                <div className='history-header'>
                    <div className='title'>报警记录</div>
                    <Button className='history-export' type="link">Link Button</Button>
                </div>
                <Table  size='small' columns={columns} dataSource={dataSource} />
            </div>
          
        </HistoryDataStyle>
    )
}