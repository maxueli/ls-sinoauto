import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../privaders/apiService';
@Injectable()
export class intePickingService {
    constructor(
        public apiService: ApiService
    ) {
    }
    public getinfo(params) {
        let url = "insidereport";
        return this.apiService.get(url, params)
    }
    public postdateilds(params) {
        let url = "insidepackdetail";
        return this.apiService.Postformdata(url, params)
    }
    //获取领料人
    public findusersinorg() {
        let url = 'findusersinorg';
        return this.apiService.get(url);
    }
    //获取部门
    public departments(id) {
        let url = `departments/${id}`;
        return this.apiService.get(url);
    }
}