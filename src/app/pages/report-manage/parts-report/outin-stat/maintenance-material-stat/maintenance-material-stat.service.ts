import { ParamMap } from '@angular/router/router';
import { ApiService } from '../../../../../privaders/apiService';
import { Injectable } from '@angular/core';

@Injectable()
export class MaintenanceMaterialStatService {
    constructor(
        public _app: ApiService
    ) { }
    // 获取用户列表
    public getList(params) {
        let url = 'repairreport'
        return this._app.get(url, params);
    }
    // 获取详情信息
    public getInfoDetail(params) {
        let url = 'repairdetail'
        return this._app.Postformdata(url, params);
    }
    // 获取门店列表
    public getStore(params) {
        let url = 'getorgbycondition'
        return this._app.get(url, params);
    }
    // 获取车辆信息
    public getCarInfo(params) {
        let url = 'findcarinfobycarno';
        return this._app.get(url, params);
    }
    // 导出
    public export(params) {
        let url = 'exportrepair';
        return this._app.downlode(url, params, '维修发料统计');
    }
}