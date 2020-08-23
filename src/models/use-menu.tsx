import React, { useState } from 'react';
import { createModel } from 'hox';
import { cloneDeep, remove, uniqueId } from 'lodash';

function useMenu() {
    const [treeData, setTreeData] = useState([
        {
            id: 1, title: '主变压器',
            children: [
                {
                    id: 2, title: '主变1',
                    children: [
                        { id: 3, title: '音频设备分析1', ipAddress: '192.168.1.100' },
                        { id: 4, title: '音频设备分析2', ipAddress: '192.168.1.101' },
                        { id: 5, title: '音频设备分析3', ipAddress: '192.168.1.102' }
                    ]
                },
                {
                    id: 6, title: '主变2',
                    children: [
                        { id: 7, title: '音频设备分析4', ipAddress: '192.168.1.103' },
                        { id: 8, title: '音频设备分析5', ipAddress: '192.168.1.104' },
                        { id: 9, title: '音频设备分析6', ipAddress: '192.168.1.105' }
                    ]
                },
            ]
        },
        {
            id: 11, title: '控制装置',
            children: [
                {
                    id: 22, title: '主变3',
                    children: [
                        { id: 33, title: '音频设备分析7', ipAddress: '192.168.1.106' },
                        { id: 44, title: '音频设备分析8', ipAddress: '192.168.1.107' },
                        { id: 55, title: '音频设备分析9', ipAddress: '192.168.1.108' }
                    ]
                },
            ]
        },
    ]);

    const updateTitleById = (id: number, title: string) => {
        let existed = false;
        const nextTreeData = cloneDeep(treeData);
        const findById = (items) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.id === id) {
                    item.title = title;
                    existed = true;
                    return;
                } else if (item.children && item.children.length > 0) {
                    findById(item.children);
                }
            }
        }

        findById(nextTreeData);
        setTreeData(nextTreeData);
    }

    const deleteById = (id: string) => {
        const nextTreeData = cloneDeep(treeData);
        const removeById = (items) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.id === id) {
                    remove(items, (n: any) => n.id === id)
                    return;
                } else if (item.children && item.children.length > 0) {
                    removeById(item.children);
                }
            }
        }
        removeById(nextTreeData);
        setTreeData(nextTreeData);
    }

    const addNode = (id: string, value: string) => {
        const nextTreeData = cloneDeep(treeData);
        const addSublingsNode = (items) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.id === id) {
                    items.push({ id: uniqueId(), value })
                    return;
                } else if (item.children && item.children.length > 0) {
                    addSublingsNode(item.children);
                }
            }
        }
        addSublingsNode(nextTreeData);
        setTreeData(nextTreeData);
    }

    const addSubNode = (id: string, value: string) => {
        const nextTreeData = cloneDeep(treeData);
        const addChildrenNode = (items) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.id === id) {
                    // items.push({ id: uniqueId(), value })
                    item.children = item.children || [];
                    item.children.push({ id: uniqueId(), value })
                    return;
                } else if (item.children && item.children.length > 0) {
                    addChildrenNode(item.children);
                }
            }
        }
        addChildrenNode(nextTreeData);
        setTreeData(nextTreeData);
    }

    return {
        treeData,
        setTreeData,
        updateTitleById,
        deleteById,
        addSubNode,
        addNode,
    }
}

export default createModel(useMenu);