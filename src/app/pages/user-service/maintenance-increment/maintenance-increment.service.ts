import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';

@Injectable()
export class MaintenanceIncrementService {
    constructor(
        public _api: ApiService
    ) { }

    // 挂单列表
    public getHangOrderList(param) {
        // let url = "getrepairhangorderlist";
        let url = "gethanglogs";
        return this._api.get(url, param);
    }

    // 挂单信息作废
    public deleteHangOrder(hangId) {
        let url = `deletehangorder?hangId=${hangId}`;
        return this._api.delete(url);
    }

    // 根据车牌号或工单编号查询工单简要信息
    public getOrderInfo(orderParam) {
        let url = "findorderinfobycondition";
        return this._api.get(url, orderParam);

    }

    // 根据工单Id查询工单详情
    public getHangOrderByOrderId(id) {
        let url = "findorderbyorderid";
        return this._api.get(url, id);
    }

    // 查询所有维修项目
    public getRepairProject(repairParam) {
        let url = "allrepairproject";
        return this._api.get(url, repairParam);
    }

    // 根据orderId 查询额外维修项目列表
    public getExtraProject(orderId) {
        let url = "findextraprojectlist";
        return this._api.get(url, orderId);
    }

    // 根据工单Id查询建议维修项目
    public getAdviceProject(orderId) {
        let url = "getadviseprojects";
        return this._api.get(url, orderId);
    }

    // 提交维修增项
    public addHangProject(addParam) {
        let url = "addmaintenanceincrement";
        return this._api.post(url, addParam);
    }

    // 挂单--维修增项
    public setHangUpProject(param) {
        let url = "hangupproject";
        return this._api.post(url, param);
    }
}