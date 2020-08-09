import React from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const MenuContainer = styled.div`
    ul  {
        background-color:#1D1667!important;
    }
`;

export function SiderMenu() {
    return (
        <MenuContainer>
            <Menu
                theme='dark'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <span>变压</span>
                        </span>
                    }
                >


                    <SubMenu key="sub1-1" title="变压器1">
                        <Menu.Item key="7">装置1</Menu.Item>
                        <Menu.Item key="8">装置2</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1-2" title="变压器2">
                        <Menu.Item key="9">装置1</Menu.Item>
                        <Menu.Item key="10">装置2</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1-3" title="变压器3">
                        <Menu.Item key="11">装置1</Menu.Item>
                        <Menu.Item key="12">装置2</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub2" title="电表">
                    <Menu.Item key="13">Option 5</Menu.Item>
                    <Menu.Item key="14">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="15">Option 7</Menu.Item>
                        <Menu.Item key="16">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                            <span>水表</span>
                        </span>
                    }
                >
                    <Menu.Item key="17">Option 9</Menu.Item>
                    <Menu.Item key="18">Option 10</Menu.Item>
                    <Menu.Item key="19">Option 11</Menu.Item>
                    <Menu.Item key="20">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        </MenuContainer>
    );
}