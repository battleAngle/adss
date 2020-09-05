import React, { useState } from 'react';
import { createModel } from 'hox';
import { cloneDeep, remove, uniqueId } from 'lodash';

const setupTableData = (treeData: any) => {
    const tableData: any[] = [];
    let index = 0;
    const parseTreeData = (data: any[], belongApp: string, fatherTitle?: string) => {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (item.children && item.children.length > 0) {
                let fatherTitle = item.title;
                parseTreeData(item.children, belongApp, fatherTitle);
            } else {
                tableData.push({
                    index: ++index,
                    application: belongApp,
                    name: item.title,
                    menu: fatherTitle || belongApp,
                    menuTag: item.id,
                    type: '菜单',
                    ipAddr: item.ipAddress,
                    status: '启用',
                    sortId: item.id,
                });
            }
        }
    };

    for (let i = 0, len = treeData.length; i < len; i++) {
        const item = treeData[i];
        const belongApp = item.title;
        parseTreeData(treeData, belongApp);
    }
    return tableData;
}


function useMenu() {
    const [treeData, setPeerTreeData] = useState([]);
    const [tableData, setTableData] = useState<any>([]);

    const setTreeData = (treeData: any) => {
        setPeerTreeData(treeData);
        const table: any = setupTableData(treeData);
        setTableData(table);
    }

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
        tableData,
        setTableData,
        setTreeData,
        updateTitleById,
        deleteById,
        addSubNode,
        addNode,
    }
}

export default createModel(useMenu);