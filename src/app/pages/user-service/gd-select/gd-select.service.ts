import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';

@Injectable()
export class gdSelectService {

    constructor(
        public _api: ApiService
    ) { }

    // 获取工单信息列表
    public getOrdersList(search) {
        let url = "findorderlist";
        return this._api.post(url, search);
    }

    // 根据工单Id查询工单详情
    public getOrdersDetail(orderId) {
        let url = "findorderbyorderid";
        return this._api.get(url, orderId);
    }

    // 根据orderId 查询维修配件列表
    public getRepairPart(orderId) {
        let url = "findrepairpartslist";
        return this._api.get(url, orderId);
    }

    // 根据orderId查询预检单信息
    public getPreview(orderId) {
        let url = "findpreview";
        return this._api.Postformdata(url, orderId);
    }
}
