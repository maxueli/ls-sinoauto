import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';
@Injectable()
export class partsPriceService{
    constructor(
        public apiService:ApiService
    ){
    }
    public getlists(params){
        let url="findparts";
        return this.apiService.get(url,params)
    }
    //获取配件分类
    public partstype(params){
        let url="findpartstypes";
        return this.apiService.get(url,params)
    }
}