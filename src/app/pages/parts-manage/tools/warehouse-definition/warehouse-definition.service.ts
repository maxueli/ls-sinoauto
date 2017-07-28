import { ParamMap } from '@angular/router/router';
import { ApiService } from '../../../../privaders/apiService';
import { Injectable } from '@angular/core';

@Injectable()
export class WarehouseService {
    constructor(
        public _app: ApiService
    ) { }
    // 获取用户列表
    public getList(params) {
        let url = 'finddepots'
        return this._app.Postformdata(url, params);
    }
    // 添加仓库
    public addDepot(params) {
        let url = 'depot'
        return this._app.Postformdata(url, params);
    }
}