import axios from 'axios';

// const BASE_URL = 'http://119.3.88.226';
const BASE_URL = 'http://127.0.0.1:5000';


export async function getMenuList() {
    const resp = await axios.get(BASE_URL + '/equipmentList');
    return resp.data;
}

export async function getWarnRecords() {
    const resp = await axios.get(BASE_URL + '/alarmRecord');
    return resp.data;
}

export async function getWaveData(params: WaveDataParams) {
    const resp = await axios.get(BASE_URL + '/waveData', { params });
    return resp.data;
}

export async function setAcquisition(data: Acq) {
    const resp = await axios.post(BASE_URL + '/acquisitionSetting', { ...data });
    return resp.data;
}

export async function setAlarm(data: Alarm) {
    const resp = await axios.post(BASE_URL + '/alarmSetting', { ...data });
    return resp.data;
}

export async function getPieCharts() {
    const resp = await axios.get(BASE_URL + '/pieChart');
    return resp.data;
}

export async function saveEquipment(data: any) {
    const resp = await axios.post(BASE_URL + '/equipmentSetting', { reqSave: data });
    return resp.data;
}

export async function getTimeWaveData(params: TimeWaveDataParams) {
    const resp = await axios.get(BASE_URL + '/showWave', { params });
    return resp.data;
}

export async function getPlayAudioPath(params: AudioPathParams) {
    const resp = await axios.get(BASE_URL + '/getPlayAudioPath',{params});
    return resp.data;
}

export async function getTime() {
    const resp = await axios.get(BASE_URL + '/getTime');
    return resp.data;
}

export async function getAlarmNum() {
    const resp = await axios.get(BASE_URL + '/alarmNum');
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
    currentFrame: number;
    totalFrame: number;
}

export interface TimeWaveDataParams {
    equipment: string;
    time: string;
    currentFrame: number;
    totalFrame: number;
}

export interface AudioPathParams {
    equipment: string;
    time: string;
}