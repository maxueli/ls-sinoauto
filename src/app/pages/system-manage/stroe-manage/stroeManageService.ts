import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';

@Injectable()
export class StroeManService {
    constructor(
        private api: ApiService,
    ) { }
    //获得一级目录
    public getfirstStore(params) {
        let url = "getorgbylevel";
        return this.api.get(url, params)
    }
    //获得列表
    public getStroelist(params) {
        let url = "getorgbycondition";
        return this.api.get(url, params);

    }
    //门店禁用
    public deletestroe(param) {
        let url = "deleteorg";
        return this.api.get(url, { orgId: param })
    }
    //门店添加
    public addstroe(params) {
        let url = "addorg";
        return this.api.post(url, params);
    }
    //获得地区
    public getlocalarea() {
        let url = "http://42.159.202.20:9999/location";
        return this.api.get(url)
    }
    //获得tree树
    public getstroeTreelist(){
        let url="gettree";
        return this.api.get(url);
    }
    //修改门店
    public getupdateorg(params){
        let url="updateorg";
        return this.api.post(url,params)
    }

}