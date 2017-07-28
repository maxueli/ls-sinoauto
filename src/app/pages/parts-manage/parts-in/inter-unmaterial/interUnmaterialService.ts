import { Injectable } from '@angular/core';
import { ApiService } from '../../../../privaders/apiService';
@Injectable()
export class interUnmaterialService {
    constructor(
        public api: ApiService
    ) {

    }
    //get领料人
    // 需要改接口
    public getfindpackusers() {
        let url = "findpackusers";
        return this.api.get(url)
    }
    //get 领料人部门
    public getfinddeparts(packUserId){
        let url="finddeparts";
        return this.api.get(url,{packUserId:packUserId})
    }
    //
    public getIpcode(params){
        let url="findipcodes";
        return this.api.get(url,{userId:params.userId,departId:params.departId})
    }
    public getfindinsideretreats(ipcode){
        let url="findinsideretreats";
        return this.api.get(url,{ipCode:ipcode})
    }
    public batchgenerateinsideretreat(params){
        let url = 'batchgenerateinsideretreat';
        return this.api.post(url,params);
    }
    public insideretreataddhang(params){
        let url = 'insideretreataddhang';
        return this.api.post(url,params);
    }

    public gethanglogs(params){
        let url = 'gethanglogs';
        return this.api.get(url,params);
    }
    public deletehang(params){
        let url = `deletehang?hangId=${params}&hangType=9`;
        return this.api.delete(url)
    }
}