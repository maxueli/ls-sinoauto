import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../privaders/apiService';
import { allTableModal } from '../../privaders/common.modal';
import { partsSellSelectTable, partsSellNamelist } from './tableModal';

@Component({
    moduleId: module.id,
    selector: 'ba-table',
    templateUrl: 'ba-table.component.html',
    styleUrls: ['ba-table.component.scss']
})
export class BaTableComponent {
    constructor(
        public api: ApiService
    ) {
    }
    public _partsSellReTable: allTableModal = new allTableModal();
    public _partsTypeName: allTableModal = new allTableModal();
    public _partspartsName: allTableModal = new allTableModal();
    public _partsSellname: allTableModal = new allTableModal();
    public _partsSellReTablelist: Array<partsSellSelectTable> = new Array<partsSellSelectTable>();
    public _partsSellNameList: Array<partsSellNamelist> = new Array<partsSellNamelist>();
    //配件销售统计的接受值
    @Input('partsSellReTable') set partsSellReTable(val) {
        this._partsSellReTable = val;
        if (val.code == "partsCode") {
            this.gettablelist(val);
        }
    }


    @Input('partsTypeName') set partsTypeName(val) {
        this._partsTypeName = val;
        if (val.code == "partsTypeName") {
            this.gettablelist(val);
        }
    }

    @Input('partspartsName') set partspartsName(val) {
        this._partspartsName = val;
        console.log(this._partspartsName);
        if (val.code == "partsName") {
            this.gettablelist(val);
        }
    }
    @Input('partsSellname') set partsSellname(val) {
        this._partsSellname = val;
        if (val.code == "partsSellname") {
            this.getPartsSellNamelist(val);
        }
    }
    //配件销售统计查询table的请求
    public gettablelist(opt) {
        let url = opt.url;
        this.api.get(url, opt.params).then(resp => {
            console.log(resp);
            this._partsSellReTablelist = resp;
        })
            .catch(resp => {
                console.log(resp)
            })
    }
    public getPartsSellNamelist(opt) {
        let url = opt.url;
        this.api.get(url, opt.params).then(resp => {
            console.log(resp);
            this._partsSellNameList = resp.result;
        })
            .catch(resp => {
                console.log(resp)
            })
    }
    @Output() gobackItem: EventEmitter<any> = new EventEmitter<any>()
    @Output() gobackItemName: EventEmitter<any> = new EventEmitter<any>()
    //给父组件传值
    public gobackfather(item) {
        console.log("zq");
        console.log(item)
        this.gobackItem.emit(item);
    }
    //用户信息
    public gobackfatherCC(item) {
        this.gobackItemName.emit(item);
    }
}
