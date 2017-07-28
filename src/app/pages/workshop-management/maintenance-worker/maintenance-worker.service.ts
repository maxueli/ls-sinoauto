import { ParamMap } from '@angular/router/router';
import { ApiService } from '../../../privaders/apiService';
import { Injectable } from '@angular/core';

@Injectable()
export class MaintenanceWorkereService {
    constructor(
        public _app: ApiService
    ) { }
    // 获取用户列表
    public getList(params) {
        let url = 'findorderinfo'
        return this._app.get(url, params);
    }
    // 获取派工详情
    public getworkDetailInfo(id) {
        let url = 'findrepairorderinfo?orderId=' + id
        return this._app.get(url);
    }
    // 获取门店下所有技师列表
    public getTechncianList() {
        let url = 'getalluserbytoken'
        return this._app.get(url);
    }
    // 确认指派技师
    public sureSendTo(params) {
        let url = 'dispatchingorder'
        return this._app.post(url, params);
    }
    // 确认转派技师
    public sureTurnTo(params) {
        let url = 'turntosendorder'
        return this._app.post(url, params);
    }
    // 完工
    public finish(id) {
        let url = 'finishedorder?orderId=' + id
        return this._app.get(url);
    }
}