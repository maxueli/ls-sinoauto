import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';
@Injectable()
export class SupplierManageService{
    constructor(
        public apiService:ApiService
    ){
    }
    public getlists(params){
        let url="findSuppliers";
        return this.apiService.get(url,params)
    }
    public supplierinfo(params){
         let url="findSuppliers";
        return this.apiService.get(url,params)
    }
    //编辑
    public postupdate(params){
         let url="updateSupplier";
        return this.apiService.post(url,params)
    }
    //新增
    public postsubmint(params){
         let url="addSupplier";
        return this.apiService.post(url,params)
    }
}