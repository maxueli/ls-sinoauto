import { Injectable } from '@angular/core';
import { ApiService } from '../../../../privaders/apiService';
@Injectable()
export class PurchansService {
    constructor(
        public api: ApiService
    ) { }
    public findSuppliers(params) {
        let url = 'findSuppliers';
        return this.api.get(url, params);
    }
    public getfindpartsCode(params) {
        let url = 'findpartscodeandname';
        return this.api.get(url, params);
    }
    //通过配件id获取库存信息
    public stockparts(params) {
        let url = 'stockparts';
        return this.api.Postformdata(url, params);
    }
    //根据仓库id查仓位
    public getstock(params){
        let url = 'getstock';
        return this.api.Postformdata(url,params)
    }
    //生成单号
    public addpurch(params){
        let url = 'addpurch';
        return this.api.post(url,params);
    }
    //生成挂单
    public hangpurch(params){
        let url = 'hangpurch';
        return this.api.post(url,params);

    }
    //获取挂单信息
    public gethanglogs(params){
        let url = 'gethanglogs';
        return this.api.get(url,params);
    }
    
    // 作废挂单
    public deletehang(params){
        let url = `deletehang?hangId=${params.hangId}&hangType=${params.hangType}`;
        return this.api.delete(url);
    }
    // 根据hangId获取数据
    public findpurchhang(params){
        let url = 'findpurchhang';
        return this.api.Postformdata(url,params);
    }
}