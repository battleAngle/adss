import ajax, { ResponseCallback } from './utils/ajax';

export function getMenuList(callback: ResponseCallback<Result>) {
    ajax.get({ url: 'http://119.3.88.226/equipmentList' }, callback)
}

export function getWarnRecords(callback: ResponseCallback<Result>) {
    ajax.get({ url: 'http://119.3.88.226/alarmRecord' }, callback);
}


export interface Result {
    code: number;
    result: any;
    status: number;
    timestamp: number;
}