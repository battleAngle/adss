import axios from 'axios';



export async function getMenuList() {
    const resp = await axios.get('http://119.3.88.226/equipmentList');
    return resp.data;
}

export async function getWarnRecords() {
    const resp = await axios.get('http://119.3.88.226/alarmRecord');
    return resp.data;
}

export async function getWaveData(params: WaveDataParams) {
    const resp = await axios.get('http://119.3.88.226/waveData', { params });
    return resp.data;
}

export async function setAcquisition(data: Acq) {
    const resp = await axios.post('http://119.3.88.226/acquisitionSetting', { ...data });
    return resp.data;
}

export async function setAlarm(data: Alarm) {
    const resp = await axios.post('http://119.3.88.226/alarmSetting', { ...data });
    return resp.data;
}

export async function getPieCharts() {
    const resp = await axios.get('http://119.3.88.226/pieChart');
    return resp.data;
}

export async function saveEquipment(data: any) {
    const resp = await axios.post('http://119.3.88.226/equipmentSetting', { reqSave: data });
    return resp.data;
}

export async function getTimeWaveData(params: TimeWaveDataParams) {
    const resp = await axios.get('http://119.3.88.226/showWave', { params });
    return resp.data;
}

export interface Result {
    code: number;
    result: any;
    status: number;
    timestamp: number;
}
export interface Acq {
    Rr?: string;
    SR?: string;
    SNR?: string;
}

export interface Alarm {
    down?: string;
    up?: string;
    db?: string;
}

export interface WaveDataParams {
    equipment: string;
}

export interface TimeWaveDataParams {
    equipment: string;
    time: string;
}