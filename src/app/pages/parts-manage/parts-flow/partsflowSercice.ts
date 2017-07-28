import { Injectable } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';
@Injectable()
export class partsflowSercice {
    constructor(
        public apiService: ApiService
    ) {
    }

    public postlist(params) {
        let url = "findstocks";
        return this.apiService.Postformdata(url, params)
    }
    public getlist(params) {
        let url = "bills";
        return this.apiService.get(url, params)
    }
}