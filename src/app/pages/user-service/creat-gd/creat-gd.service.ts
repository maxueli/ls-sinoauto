import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';

@Injectable()
export class CreatGdService {
    constructor(
        public _api: ApiService
    ) { }

    // 获取挂单信息
    public getHangOrderList() {
        let url = "hangorderlist";
        return this._api.get(url);
    }

    // 挂单信息作废
    public deleteHangOrder(hangId) {
        let url = `deletehangorder?hangId=${hangId}`;
        return this._api.delete(url);
    }

    // 根据工单Id查询工单详情
    public getHangOrderByOrderId(id) {
        let url = "findorderbyorderid";
        return this._api.get(url, id);
    }

    // 创建工单-挂单详情
    public getHangDetail(hangId) {
        let url = "hangorderdetail";
        return this._api.get(url, hangId);
    }

    // 根据车牌、车主姓名查询客户信息
    public getUserInfo(user) {
        let url = 'getcustomerbycondition';
        return this._api.get(url, user);
    }

    // 根据客户车辆carId查询客户详细信息
    public getUserDetail(carId) {
        let url = "getcustomerdetailinfo";
        return this._api.get(url, carId);
    }

    // 查询所有维修项目
    public getRepairProject(repairParam) {
        let url = "allrepairproject";
        return this._api.get(url, repairParam);
    }

    // 获取车辆品牌信息
    public getCarBrand(brand) {
        let url = "findbrandslistbyname";
        return this._api.get(url, brand);
    }

    // 获取车辆车系信息
    public getCarSeries(series) {
        let url = "findserieslistbycondition";
        return this._api.get(url, series);
    }

    // 获取车辆车型信息
    public getCarModel(model) {
        let url = "findmodelslistbycondition";
        return this._api.get(url, model);
    }

    // 创建工单
    public setCeaterOrder(param) {
        let url = "createorderoperation";
        return this._api.post(url, param);
    }

    // 挂单操作
    public setHangOrder(param) {
        let url = "hungorderoperation";
        return this._api.post(url, param);
    }
}