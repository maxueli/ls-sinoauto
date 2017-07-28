import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../app.animation';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { historyService } from './historyService';
import { helpers } from '../../../../privaders/helper';
import { historyModal, historyDetail, historyinfo, Tolllist, historyinfoTime, historyMaterial } from './historyModal'

@Component({
    moduleId: module.id,
    selector: 'repair-history',
    templateUrl: 'repair-history.component.html',
    styleUrls: ['repair-history.component.scss'],
    animations: [flyIn]
})
export class RepairHistoryComponent {
    @ViewChild('lgModal') public lgModal: ModalDirective;
    public historyParams: historyModal = new historyModal();
    public detailInfo: historyDetail = new historyDetail();
    public historyinfo: historyinfo = new historyinfo();//维修详情
    public hisTolllist: Tolllist = new Tolllist();//收费结算单
    //public historymanHour:historyinfoTime = new historyinfoTime();//工时明细
    public list: Array<historyModal>;
    public historyMaterial: Array<historyMaterial>;
    public historymanHour: Array<historyinfoTime>;
    public historyDetail = { 'info': {}, 'cars': [] };
    public totalItems: number;
    public total: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public searchLoad: boolean = true;
    public tableLoad: boolean = true;
    public ishistory: boolean = false;
    public printDate;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    public endError: boolean = false;
    constructor(
        public historyService: historyService,
        public _helpers: helpers
    ) { }
    ngOnInit() {
        this.historylist();


    }
    //获取维修历史列表
    private historylist() {
        // console.log(this.historyParams);
        this.list = null;
        this.printDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        this.historyService.getlist(this.historyParams).then(res => {
            console.log(res);
            this.totalItems = 0;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.total = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.historyParams.pageSize);
            }
        }).catch(res => {
            console.log(res);
        })
    }
    private Detail(contentid) {
        this.detailInfo.orderId = contentid;
        this.lgModal.show();
        this.historyService.detail(this.detailInfo).then(res => {
            console.log(res);
            this.historyinfo = res.result;
            this.hisTolllist = res.result.settlement;
            this.historymanHour = res.result.manHourDetails
            this.historyMaterial = res.result.materialDetails
            this.lgModal.show();
        }).catch(res => {
            console.log(res);
        })
    }
    //车牌下拉
    public isCollapsed() {
        this.ishistory = true;
    }

    //车牌下拉item
    public selectCarsInfo(content) {
        this.historyParams.carNo = content.carNo;
        this.ishistory = false;
    }
    //维修历史查询
    public historysubmit(){
        this.historylist();
    }
    //维修历史分页
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.historyParams.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.historyParams.setPage(this.index);
        }
        this.historylist();
    }
    // 车辆品牌分页条页数更改
    private pageChange(event, temp) {
        if (temp == 'carNo') {
            this.historyParams.setPage(event.page);
            this.historylist();
        }
    }
     // 时间校验
    private timeChange() {
        if (this.historyParams.inBeginTime && this.historyParams.inEndTime) {
            this.historyParams.inBeginTime <= this.historyParams.inEndTime ? this.timeError = false : this.timeError = true;
            // console.log(this.searchParam.beginTime <= this.searchParam.endTime)
        }
         if (this.historyParams.outBeginTime && this.historyParams.outEndTime) {
            this.historyParams.outBeginTime <= this.historyParams.outEndTime ? this.timeError = false : this.timeError = true;
            
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }
    // 打印详情页
    private orderPrint() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock()

    }

}
