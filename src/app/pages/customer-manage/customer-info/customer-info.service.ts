import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';
import { Http } from '@angular/http';

@Injectable()
export class CustomerInfoService {

    constructor(
        private _api: ApiService,
        private _http: Http,
    ) { }

    // 获取客户列表
    public getCustomer(search) {
        let url = "customer";
        return this._api.get(url, search);
    }

    // 根据客户Id查询客户信息
    public getCustomerDetail(search) {
        let url = `customer/${search}`;
        return this._api.get(url);
    }

    // 获取地区信息列表
    public getlocation() {
        const URL = "http://42.159.202.20:9999/location";
        return this._http.get(URL).toPromise()
            .then(res => this._api.extractData(res))
            .catch(err => this._api.handleError(err))
    }

    // 保存编辑的客户信息
    public saveEditInfo(customer) {
        let url = "customer";
        return this._api.put(url, customer);
    }

    // 保存新增的客户信息
    public saveAddInfo(customer) {
        let url = "customer";
        return this._api.post(url, customer);
    }

    // 导出Excel
    public exportExcel(name) {
        let url = 'customer/excel';
        return this._api.downlode(url, '', name);
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
}