import React from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';
import { BulbTwoTone } from '@ant-design/icons';

import useMenu from '@src/models/use-menu';

const { SubMenu } = Menu;

const MenuContainer = styled.div`
    ul  {
        background-color:#1D1667!important;
        overflow:scroll;
    }
`;

export function SiderMenu() {
    const { treeData } = useMenu();

    const setupMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return <SubMenu key={item.id} title={item.title}>{setupMenu(item.children)}</SubMenu>
            } else {
                return <Menu.Item key={item.id} icon={<BulbTwoTone twoToneColor={`rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`} />} >{item.title}</Menu.Item>
            }
        });
    }

    return (
        <MenuContainer>
            <Menu
                theme='dark'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                {setupMenu(treeData)}
            </Menu>
        </MenuContainer>
    );
}