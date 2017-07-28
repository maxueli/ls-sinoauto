import { ParamMap } from '@angular/router/router';
import { ApiService } from '../../../privaders/apiService';
import { Injectable } from '@angular/core';

@Injectable()
export class MaintenanceCashierService {
    constructor(
        public _app: ApiService
    ) { }
    // 获取用户列表
    public getList(params) {
        let url = 'ordercashrepairlist'
        return this._app.post(url, params);
    }
    public getListDetail(id) {
        let url = 'ordercashrepairdetail?orderId=' + id
        return this._app.get(url);
    }
    // 确定收银
    public casheir(params) {
        let url = 'determinecashier'
        return this._app.post(url, params);
    }
}