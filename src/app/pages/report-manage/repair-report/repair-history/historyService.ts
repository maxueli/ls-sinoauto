import { Injectable } from '@angular/core';
import { ApiService } from '../../../../privaders/apiService';

import { Headers, Http, RequestMethod, RequestOptionsArgs, Response, RequestOptions } from '@angular/http';
@Injectable()

export class historyService{
    constructor(
        public apiService:ApiService
    ){}

    public getlist(params) {
        let url = 'orderreport';
        return this.apiService.get(url,params)
    }
    
    public detail(params) {
        let url = `repairhisdetail`;
        return this.apiService.Postformdata(url,params);
    }
    
}

