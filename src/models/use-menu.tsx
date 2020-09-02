import React, { useState } from 'react';
import { createModel } from 'hox';
import { cloneDeep, remove, uniqueId } from 'lodash';

function useMenu() {
    const [treeData, setTreeData] = useState([]);

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