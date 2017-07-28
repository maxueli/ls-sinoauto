import { Component, OnInit } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../../app.animation';
import { PurchasinStatService } from './purchasin-stat.service';
import { FormValidate } from '../../../../../privaders/fromValidate';
import { purchreport, repairdetail, detailInfo, partsInfo, stCarModel, suppliersearch, storesearch, exportInfos } from './purchasin-stat';
import { helpers } from '../../../../../privaders/helper';

@Component({
    moduleId: module.id,
    selector: 'purchasin-stat',
    templateUrl: 'purchasin-stat.component.html',
    styleUrls: ['purchasin-stat.component.scss'],
    animations: [flyIn]
})
export class PurchasinStatComponent implements OnInit {
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public list: Array<any>;
    public purchasinparams: purchreport = new purchreport();
    public listInfo: detailInfo = new detailInfo(); //详情信息
    public partsInfo: partsInfo = new partsInfo(); //配件信息
    public detailparams: repairdetail = new repairdetail(); //详情所需参数
    public stcarmodel: stCarModel = new stCarModel();
    public totalItemss = [0, 0];
    public supplierCollapsed: boolean = true;
    public storeCollapsed: boolean = true;
    public supplierparams: suppliersearch = new suppliersearch();   // 供应商查询参数
    public supplier: Array<any>;
    public storeparams: storesearch = new storesearch();   // 供应商查询参数
    public store: Array<any>;
    public supplierisShow: boolean = false; //供应商下拉显示
    public supplierName: string;
    public storeisShow: boolean = false; //门店下拉显示
    public orgName: string;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    public exportparams: exportInfos = new exportInfos(); //导出


    constructor(
        public _service: PurchasinStatService,
        public _helpers: helpers
    ) {

    }
    ngOnInit() {
        this.getListInfo();
        this.loadSuppliers();
        this.loadStores();
    }
    dyHtml() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock();
    }
    openTime: Date = new Date();//开单时间
    public getListInfo() {
        this.list = null;
        this._service.getList(this.purchasinparams).then(res => {
            console.log(res);
            this.totalItems = 0;
            this.list = null;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.purchasinparams.pageSize);
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
            this.purchasinparams.setPage(this.index, Number(event.target.value));
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
            this.purchasinparams.setPage(this.index);
        }
        this.getListInfo();
    }
    private pageChanged2(event, temp) {
        if (temp == 'supplier') {
            this.supplierparams.setPage(event.page);
            this.loadSuppliers();
        } else if (temp == 'store') {
            this.storeparams.setPage(event.page);
            this.loadStores();
        }
    }

    // 列表详情
    public getInfoDetail(id) {
        this.listInfo = new detailInfo();
        this.partsInfo = new partsInfo();
        this.detailparams.purchCode = id;
        this._service.getInfoDetail(this.detailparams).then(res => {
            console.log(res);
            this.listInfo = res.result;
            this.partsInfo = res.result.parts;
        }).catch(err => {
            console.log(err);
        });
    }
    // 按条件查询列表
    public search() {
        if (this.purchasinparams.beginTime) {
            this.purchasinparams.beginTime = this.purchasinparams.beginTime.toString();
        }
        if (this.purchasinparams.endTime) {
            this.purchasinparams.endTime = this.purchasinparams.endTime.toString();
        }
        console.log(this.purchasinparams);
        this.getListInfo();
    }
    // 重置筛选条件
    public reset() {
        this.exportparams = new exportInfos();
        this.timeError = false;
        this.notSubmit = false;
        this.supplierName = '';
        this.orgName = '';
        this.supplierisShow = false;
        this.storeisShow = false;
        this.purchasinparams = new purchreport();
        this.getListInfo();
    }
    // 加载供应商列表数据
    public loadSuppliers() {
        this._service.getSupplier(this.supplierparams).then(res => {
            console.log(res);
            this.supplier = res.result;
            this.totalItemss[0] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    // 加载门店列表数据
    public loadStores() {
        this._service.getStore(this.storeparams).then(res => {
            console.log(res);
            this.store = res.result;
            this.totalItemss[1] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    // 根据输入内容实时查询相关信息
    private reloadSupplierInfo(event, temp) {
        if (temp == 'supplier') {
            this.supplierparams.supplierName = event.target.value;
            this.loadSuppliers();
        } else if (temp == 'store') {
            this.storeparams.orgName = event.target.value;
            this.loadStores();
        }
    }
    //获取焦点执行
    public partsNameinfo(sign) {
        if (sign == 1) {
            this.supplierisShow = true;
            this.storeisShow = false;
        } else if (sign == 2) {
            this.storeisShow = true;
            this.supplierisShow = false;
        }
    }
    //失去焦点执行
    public blurflowinfo(sign) {
        if (sign == 1) {
            setTimeout(() => {
                this.supplierisShow = false;
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
            this.supplierName = content.supplierName;
            this.purchasinparams.supplierId = content.supplierCode;
        } else if (sign == 2) {
            this.orgName = content.orgName;
            this.purchasinparams.orgId = content.orgId;
        }
    }
    // 时间校验
    private timeChange() {
        if (this.purchasinparams.beginTime) {
            this.purchasinparams.beginTime = this.purchasinparams.beginTime.toString();
        }
        if (this.purchasinparams.endTime) {
            this.purchasinparams.endTime = this.purchasinparams.endTime.toString();
        }
        if (this.purchasinparams.beginTime && this.purchasinparams.endTime) {
            this.purchasinparams.beginTime <= this.purchasinparams.endTime ? this.timeError = false : this.timeError = true;
            console.log(this.purchasinparams.beginTime <= this.purchasinparams.endTime)
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }
    // 点击关闭按钮关闭下拉框
    public closeSelDiv(sign) {
        if (sign == 1) {
            this.supplierisShow = false;
        } else if (sign == 2) {
            this.storeisShow = false;
        }
    }
    // 导出
    public exportInfo() {
        if (this.purchasinparams.beginTime != undefined) {
            this.exportparams.beginTime = this.purchasinparams.beginTime;
        }
        if (this.purchasinparams.endTime != undefined) {
            this.exportparams.endTime = this.purchasinparams.endTime;
        }
        if (this.purchasinparams.orgId != undefined) {
            this.exportparams.orgId = this.purchasinparams.orgId;
        }
        if (this.purchasinparams.supplierId != undefined) {
            this.exportparams.supplierId = this.purchasinparams.supplierId;
        }
        console.log(this.exportparams);
        this._service.export(this.exportparams).then(res => {
            console.log(res);
        })
    }
}
