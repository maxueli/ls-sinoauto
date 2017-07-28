import { Injectable } from '@angular/core';
import { ApiService } from '../../../../privaders/apiService';
@Injectable()
export class maintenanceService {
    constructor(
        public api: ApiService
    ) {

    }
    //查询挂单信息
    public gethandLogs(params) {
        console.log(params);
        let url = 'gethanglogs';
        return this.api.get(url, params)
    }
    public postdateils(params) {
        let url = 'findrepairretreats';
        return this.api.get(url, { orderNo: params })
    }
    public generate_mainten_unmaterial(params) {
        let url = "generaterepairretreat";
        return this.api.post(url, params)
    }
    public posters_mainten_unmaterial(params) {
        let url = "repairretreataddhang";
        return this.api.post(url, params)
    }
    public gobackfather(item) {
        let url = "findrepairretreats";
       return  this.api.get(url, item);
    }
    public deletehang(params){
        let url = `deletehang?hangId=${params}&hangType=7`;
        return this.api.delete(url);
    }
}