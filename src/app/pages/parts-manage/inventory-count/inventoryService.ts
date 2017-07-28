import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';
@Injectable()
export class InventoryService {
    constructor(
        public apiService: ApiService
    ) {
    }
    //获取清单列表
    public getlist(params){
        let url = "findinventorys";
        return this.apiService.get(url, params)
    }
    //获取清单详情
    public getdateils(params) {
        let url = "findinventorydetails";
        return this.apiService.get(url, params)
    }
    //获取清单列表
    public getdlist(params) {
        let url = "findstocksbydepotid";
        return this.apiService.get(url, params)
    }
    //获取仓库
    public postdepot(params) {
          let url="finddepots";
        return this.apiService.Postformdata(url,params)
    }
    //生成盘点清单
    public Generate(params) {
          let url="batchgenerateinventory";
        return this.apiService.post(url,params)
    }


}