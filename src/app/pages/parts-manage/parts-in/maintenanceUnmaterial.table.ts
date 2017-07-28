import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../privaders/apiService';
import { allTableModal } from '../../../privaders/common.modal';
import { mainmaterSearchTable, mainUnmaterialorderNoTable } from './maintenance-unmaterial/maintenanceModal';
import { sellUser } from './sell-in/sellinModal';

@Component({
    selector: 'maintenance-unmaterial-table',
    templateUrl: './maintenanceUnmaterial.table.html',
    styleUrls: ['./maintenanceUnmateerial.table.scss']
})
export class MaintenanceUnmaterialTable {
    constructor(
        public api: ApiService
    ) {

    }
    //内部变量
    public _mainUnTable: allTableModal = new allTableModal();
    public _mainUnTableList: Array<mainmaterSearchTable> = new Array<mainmaterSearchTable>();
    public _mainUnOrderNo: mainUnmaterialorderNoTable = new mainUnmaterialorderNoTable();
    public _sellNameTable: allTableModal = new allTableModal();
    public _sellUser: Array<sellUser> = new Array<sellUser>();
    public _findallselloutcode: allTableModal = new allTableModal();
    public findallselloutcodelist: Array<any> = new Array<any>()
    //维修退料的接受值
    @Input('mainUnTable') set mainUnTable(val) {
        this._mainUnTable = val;
        if (val.code == 'mainUntable') {
            this.gettablelistAll(val);
        }
    }

    //维修退料的数据请求
    public gettablelistAll(opt) {
        this.api.get(opt.url, opt.params).then(resp => {
            this._mainUnTableList = resp.result;
        })
            .catch(resp => {
                // console.log(resp)
            })
    }
    @Input('sellNameTable') set sellNameTable(val) {
        this._sellNameTable = val;
        console.log(val)
        if (val.code == 'sellUser') {
            this.getSellNameTable(val);
        }
    }
    public getSellNameTable(opt) {
        this.api.get(opt.url, opt.params).then(resp => {
            console.log(resp);
            this._sellUser = resp.result;
            console.log(this._sellUser)
        }).catch(resp => {
            console.log(resp)
        })
    }
    @Input('findallselloutcode') set findallselloutcode(val) {
        // console.log(val);
        this._findallselloutcode = val;
        if (val.code == "findallselloutcode") {
            this.getfindallselloutcode(val);
        }
    }
    public getfindallselloutcode(opt) {
        this.api.get(opt.url, opt.params).then(resp => {
            // console.log(resp);
            this.findallselloutcodelist = resp.result;
        }).catch(resp => {
            console.log(resp);
        })
    }
    //给父组件传值 
    @Output() gobackItem: EventEmitter<any> = new EventEmitter<any>()
    public gobackfather(item) {
        let url = "findrepairretreats";
        this._mainUnOrderNo.orderNo = item.orderNo;
        this.api.get(url, this._mainUnOrderNo).then(resp => {
            console.log(resp);
            this.gobackItem.emit(resp.result);

        })
    }
    @Output() gobackSellUser: EventEmitter<any> = new EventEmitter<any>()
    public gotoSell(item) {
        this.gobackSellUser.emit(item);
    }
    @Output() goSellOutCode:EventEmitter<any>=new EventEmitter<any>()
    public getSellOutCode(item){
        let url="findsellretreats";
        this.api.get(url,{sellOutCode:item}).then(res=>{
            this.goSellOutCode.emit(res.result);
            // console.log(res);
        })
    }
    // public getorderNoDeltail(orderNo) {
    //     let url = "findrepairretreats";
    //     this.api.get(url, { orderNo: orderNo }).then(resp => {
    //         console.log(resp);
    //     })
    // }
}