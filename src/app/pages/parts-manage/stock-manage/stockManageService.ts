import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';
@Injectable()
export class storeManageService{
      constructor(
        public apiService:ApiService
    ){
    }
    public getlist(params){
        let url="findstocks";
        return this.apiService.Postformdata(url,params)
    }
    // 详情
    public postlist(params){
         let url="stock";
        return this.apiService.Postformdata(url,params)
    }
    //获取仓库
    public postdepot(params){
         let url="finddepots";
        return this.apiService.Postformdata(url,params)
    }
    //获取仓位
    public depotPosName(params){
         let url="finddepotposs";
        return this.apiService.Postformdata(url,params)
    }
    //获取车型
    public cartype(params){
        let url="findmodelslistbycondition";
        return this.apiService.get(url,params)
    }
    //获取配件信息
    public partsinfo(params){
        let url="findparts";
        return this.apiService.get(url,params)
    }
    //获取配件分类
    public partstype(params){
        let url="findpartstypes";
        return this.apiService.get(url,params)
    }
    //获取品牌
    public partsbrands(params){
        let url="findpartsbrands";
        return this.apiService.get(url,params)
    }
    //新增提交
    public addstock(params){
        let url="addstock";
        return this.apiService.post(url,params)
    }
    //编辑提交
    public stockedit(params){
        let url="updatestock";
        return this.apiService.post(url,params)
    }
    //更库存状态
    public stockstatus(params){
        let url="updatestockstatus";
        return this.apiService.post(url,params)
    }

}