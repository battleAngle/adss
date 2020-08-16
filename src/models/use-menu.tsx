import React, { useState } from 'react';
import { createModel } from 'hox';
import { cloneDeep } from 'lodash';

function useMenu() {
    const [treeData, setTreeData] = useState([
        {
            id: 1, title: '主变压器',
            children: [
                {
                    id: 2, title: '主变1',
                    children: [
                        { id: 3, title: '音频设备分析1' },
                        { id: 4, title: '音频设备分析2' },
                        { id: 5, title: '音频设备分析3' }
                    ]
                },
                {
                    id: 6, title: '主变2',
                    children: [
                        { id: 7, title: '音频设备分析4' },
                        { id: 8, title: '音频设备分析5' },
                        { id: 9, title: '音频设备分析6' }
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
                        { id: 33, title: '音频设备分析7' },
                        { id: 44, title: '音频设备分析8' },
                        { id: 55, title: '音频设备分析9' }
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
        console.log(nextTreeData, 'nex')
        setTreeData(nextTreeData);
    }

    return {
        treeData,
        setTreeData,
        updateTitleById
    }
}

export default createModel(useMenu);