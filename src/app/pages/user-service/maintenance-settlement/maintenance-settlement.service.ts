import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';

@Injectable()
export class MaintenanceSettlementService {

    constructor(
        public _api: ApiService
    ) { }

    // 获取维修结算信息
    public getOrderSettlementList(search) {
        let url = "ordersettlementlist";
        return this._api.post(url, search);
    }

    // 获取维修结算详细信息
    public getOrderByOrderid(orderId) {
        let url = "ordersettlementdetail";
        return this._api.get(url, orderId);
    }

    // 结算操作
    public setSettlement(setParam) {
        let url = "settlementoperation";
        return this._api.get(url, setParam);
    }

    // 撤销结算操作
    public revokeSettlementInfo(param) {
        let url = "revokesettlementoperation";
        return this._api.get(url, param);
    }
}
