import { ParamMap } from '@angular/router/router';
import { ApiService } from '../../../privaders/apiService';
import { Injectable } from '@angular/core';

@Injectable()
export class SellCashierService {
    constructor(
        public _app: ApiService
    ) { }
    // 获取列表
    public getList(params) {
        let url = 'ordercashselllist'
        return this._app.post(url, params);
    }
    // 获取列表详情
    public getInfoDetail(id) {
        let url = 'ordercashselldetail?sellId=' + id
        return this._app.get(url);
    }
    // 确定收银
    public casheir(params) {
        let url = 'determinecashier'
        return this._app.post(url, params);
    }
}