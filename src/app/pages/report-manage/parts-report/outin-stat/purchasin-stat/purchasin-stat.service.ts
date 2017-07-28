import { ParamMap } from '@angular/router/router';
import { ApiService } from '../../../../../privaders/apiService';
import { Injectable } from '@angular/core';

@Injectable()
export class PurchasinStatService {
    constructor(
        public _app: ApiService
    ) { }
    // 获取用户列表
    public getList(params) {
        let url = 'purchreport'
        return this._app.get(url, params);
    }
    // 获取详情信息
    public getInfoDetail(params) {
        let url = 'purchdetail'
        return this._app.Postformdata(url, params);
    }
    // 获取供应商列表
    public getSupplier(params) {
        let url = 'findSuppliers'
        return this._app.get(url, params);
    }
    // 获取门店列表
    public getStore(params) {
        let url = 'getorgbycondition'
        return this._app.get(url, params);
    }
    // 导出
    public export(params) {
        let url = 'exportpurch';
        return this._app.downlode(url, params, '采购入库统计');
    }
}