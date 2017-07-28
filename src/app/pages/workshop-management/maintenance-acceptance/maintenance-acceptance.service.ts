import { ParamMap } from '@angular/router/router';
import { ApiService } from '../../../privaders/apiService';
import { Injectable } from '@angular/core';

@Injectable()
export class MaintenanceAcceptanceService {
    constructor(
        public _app: ApiService
    ) { }
    // 获取列表
    public getList(params) {
        let url = 'findcheckorderinfo'
        return this._app.get(url, params);
    }
    // 获取列表详情
    public getDetail(id) {
        let url = 'findrepairorderinfo?orderId=' + id
        return this._app.get(url);
    }
    // 获取列表详情
    public getParts(id) {
        let url = 'findrepairpartslist?orderId=' + id
        return this._app.get(url);
    }
    // 获取预检单
    public getPreView(params) {
        let url = 'findpreview'
        return this._app.Postformdata(url, params);
    }
    // 通过
    public pass(params) {
        let url = 'checkorder'
        return this._app.post(url, params);
    }
}