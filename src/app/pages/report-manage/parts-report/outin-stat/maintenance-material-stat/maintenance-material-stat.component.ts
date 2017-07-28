import { Component } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../../app.animation';
import { MaintenanceMaterialStatService } from './maintenance-material-stat.service';
import { repairreport, repairdetail, detailInfo, partsInfo, storesearch, carnosearch, exportInfos } from './maintenance-material-stat';
import { helpers } from '../../../../../privaders/helper';

@Component({
    moduleId: module.id,
    selector: 'maintenance-material-stat',
    templateUrl: 'maintenance-material-stat.component.html',
    styleUrls: ['maintenance-material-stat.component.scss'],
    animations: [flyIn]
})
export class MaintenanceMaterialStatComponent {
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public list: Array<any>;
    public materialstateparams: repairreport = new repairreport();
    public listInfo: detailInfo = new detailInfo(); //详情信息
    public partsInfo: partsInfo = new partsInfo(); //配件信息
    public detailparams: repairdetail = new repairdetail();
    public storeparams: storesearch = new storesearch();   // 供应商查询参数
    public store: Array<any>
    public totalItems2: number; //记录名店信息总条数
    public totalItems3: number; //记录车牌号信息总条数
    public storeCollapsed: boolean = true;
    public storeisShow: boolean = false; //门店下拉显示
    public carnoisShow: boolean = false; //车牌号下拉显示
    public orgName: string;
    public carNo: string;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    public carsearchparams: carnosearch = new carnosearch();
    public carlist: Array<any>;
    public exportparams: exportInfos = new exportInfos(); //导出

    constructor(
        public _service: MaintenanceMaterialStatService,
        public _helpers: helpers
    ) {

    }
    ngOnInit() {
        this.getListInfo();
        this.loadStores();
        this.getCarNo();
    }
    dyHtml() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock();
    }
    openTime: Date = new Date();//开单时间
    public getListInfo() {
        this.list = null;
        this._service.getList(this.materialstateparams).then(res => {
            console.log(res);
            this.totalItems = 0;
            this.list = null;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.materialstateparams.pageSize);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    // 分页条选择
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.materialstateparams.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                if (this.choosePage > this.maxPageSize) {
                    this.index = this.choosePage = this.maxPageSize;
                } else {
                    this.index = this.choosePage;
                }
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.materialstateparams.setPage(this.index);
        }
        this.getListInfo();
    }
    private pageChanged2(event, temp) {
        if (temp == 'store') {
            this.storeparams.setPage(event.page);
            this.loadStores();
        } else if (temp == 'carno') {
            this.carsearchparams.setPage(event.page);
            this.getCarNo();
        }
    }
    // 列表详情
    public getInfoDetail(id) {
        this.listInfo = new detailInfo();
        this.partsInfo = new partsInfo();
        this.detailparams.rpCode = id;
        this._service.getInfoDetail(this.detailparams).then(res => {
            console.log(res);
            this.listInfo = res.result;
            this.partsInfo = res.result.parts;
        }).catch(err => {
            console.log(err);
        });
    }
    // 按条件查询列表信息
    public search() {
        if (this.materialstateparams.beginTime) {
            this.materialstateparams.beginTime = this.materialstateparams.beginTime.toString();
        }
        if (this.materialstateparams.endTime) {
            this.materialstateparams.endTime = this.materialstateparams.endTime.toString();
        }
        this.getListInfo();
    }
    // 重置筛选条件
    public reset() {
        this.exportparams = new exportInfos();
        this.timeError = false;
        this.notSubmit = false;
        this.orgName = '';
        this.carNo = '';
        this.storeisShow = false;
        this.carnoisShow = false;
        this.materialstateparams = new repairreport();
        this.getListInfo();
    }
    // 加载门店列表数据
    public loadStores() {
        this._service.getStore(this.storeparams).then(res => {
            console.log(res);
            this.store = res.result;
            this.totalItems2 = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    // 根据输入内容实时查询相关信息
    private reloadSupplierInfo(event, temp) {
        if (temp == 'carno') {
            this.carsearchparams.carNo = event.target.value;
            this.getCarNo();
        } else if (temp == 'store') {
            this.storeparams.orgName = event.target.value;
            this.loadStores();
        }
    }
    //获取焦点执行
    public partsNameinfo(sign) {
        if (sign == 1) {
            this.carnoisShow = true;
            this.storeisShow = false;
        } else if (sign == 2) {
            this.storeisShow = true;
            this.carnoisShow = false;
        }
    }
    //失去焦点执行
    public blurflowinfo(sign) {
        if (sign == 1) {
            setTimeout(() => {
                this.carnoisShow = false;
            }, 200);
        } else if (sign == 2) {
            setTimeout(() => {
                this.storeisShow = false;
            }, 200);
        }
    }
    //修改筛选参数
    public stockitem(sign, content) {
        if (sign == 1) {
            this.carNo = content.carNo;
            this.materialstateparams.carNo = content.carNo;
        } else if (sign == 2) {
            this.orgName = content.orgName;
            this.materialstateparams.orgId = content.orgId;
        }
    }
    // 获取车牌号信息
    public getCarNo() {
        this._service.getCarInfo(this.carsearchparams).then(res => {
            console.log(res);
            this.carlist = res.result;
            this.totalItems3 = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    // 时间校验
    private timeChange() {
        if (this.materialstateparams.beginTime) {
            this.materialstateparams.beginTime = this.materialstateparams.beginTime.toString();
        }
        if (this.materialstateparams.endTime) {
            this.materialstateparams.endTime = this.materialstateparams.endTime.toString();
        }
        if (this.materialstateparams.beginTime && this.materialstateparams.endTime) {
            this.materialstateparams.beginTime <= this.materialstateparams.endTime ? this.timeError = false : this.timeError = true;
            console.log(this.materialstateparams.beginTime <= this.materialstateparams.endTime);
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }
    // 点击关闭按钮关闭下拉框
    public closeSelDiv(sign) {
        if (sign == 1) {
            this.carnoisShow = false;
        } else if (sign == 2) {
            this.storeisShow = false;
        }
    }
    // 导出
    public exportInfo() {
        if (this.materialstateparams.beginTime != undefined) {
            this.exportparams.beginTime = this.materialstateparams.beginTime;
        }
        if (this.materialstateparams.endTime != undefined) {
            this.exportparams.endTime = this.materialstateparams.endTime;
        }
        if (this.materialstateparams.orgId != undefined) {
            this.exportparams.orgId = this.materialstateparams.orgId;
        }
        if (this.materialstateparams.carNo != undefined) {
            this.exportparams.carNo = this.materialstateparams.carNo;
        }
        console.log(this.exportparams);
        this._service.export(this.exportparams).then(res => {
            console.log(res);
        })
    }
}
