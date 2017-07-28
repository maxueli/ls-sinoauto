import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../privaders/apiService';
@Injectable()
export class partssellService {
    constructor(
        public api: ApiService
    ) {

    }
    getpartsSellReport(params) {
        console.log(params);
        let url = 'sellreport';
        return this.api.get(url, params)
    }
    public postdateils(params) {
        let url = 'selloutdetail';
        return this.api.Postformdata(url, params)
    }
    //获取配件信息
    public partsinfo(params) {
        let url = "findparts";
        return this.api.get(url, params)
    }
}