import { Injectable } from '@angular/core';
import { ApiService } from '../../../../privaders/apiService';
@Injectable()
export class outputSummaryService{
    constructor(
        public apiService:ApiService
    ){
    }
    public getlists(params){
        let url="outputsummary";
        return this.apiService.get(url,params)
    }
   
}