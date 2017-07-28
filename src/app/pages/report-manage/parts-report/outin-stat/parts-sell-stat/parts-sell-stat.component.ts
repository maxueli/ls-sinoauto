import { Component, ViewChild } from '@angular/core';
import { fadeIn, flyIn, simAnim } from '../../../../../app.animation';
import { allTableModal } from '../../../../../privaders/common.modal';
import { partssellService } from './partsSellService';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { helpers } from '../../../../../privaders/helper';

import { partsSellStatParams, partsSellSelectParam, searchtableParam, searchtableUser, partsSellid, partsParams } from './partsSell.Modal';

@Component({
    moduleId: module.id,
    selector: 'parts-sell-stat',
    templateUrl: 'parts-sell-stat.component.html',
    styleUrls: ['parts-sell-stat.component.scss'],
    animations: [flyIn]
})
export class PartsSellStatComponent {
    @ViewChild('lgModal') public lgModal: ModalDirective;
    public partsselllist: Array<partsSellStatParams> = new Array<partsSellStatParams>();
    public searchParam: partsSellSelectParam = new partsSellSelectParam();
    public partsSellTable: allTableModal = new allTableModal();
    public partsSellTypeName: allTableModal = new allTableModal();
    public partsSellpartsName: allTableModal = new allTableModal();
    public partsSellname: allTableModal = new allTableModal();
    public searchTableParams: searchtableParam = new searchtableParam();
    public searchtableuser: searchtableUser = new searchtableUser();
    public partsSellid: partsSellid = new partsSellid();
    public partsParams: partsParams = new partsParams();
    public partslist: Array<any>;
    public totalCount: number = 0;
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public isShow: boolean = false;
    public partstype: boolean = false;
    public partstypelist: Array<any>;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    public partsNames: boolean = false;
    public Names: boolean = false;
    constructor(
        public Serice: partssellService,
        public _helpers: helpers,
    ) {

    }
    ngOnInit() {
        this.getpartsSelllist();
        this.partstypes();

    }
    public getpartsSelllist() {
        this.Serice.getpartsSellReport(this.searchParam).then(resp => {
            console.log(resp);
            this.totalItems = 0;
            if (resp.result.length > 0) {
                this.totalItems = resp.totalCount;
                this.partsselllist = resp.result;
                this.maxPageSize = Math.ceil(resp.totalCount / this.searchParam.pageSize);
            }
        }).catch(resp => {
            console.log(resp);
        })
    }
    //配件销售统计详情
    public partsdateils(Code) {
        this.partsSellid.sellCode = Code;
        this.partslist = null;
        this.Serice.postdateils(this.partsSellid).then(res => {
            console.log(res);
            this.partsSellid = res.result;
            this.searchtableuser = res.result.parts;
            this.lgModal.show();
        }).catch(Error => {
            console.log(Error);
        })

    }
    // 获取配件分类
    public partstypes() {
        this.partstypelist = null;
        this.Serice.partsinfo(this.partsParams).then(res => {
            console.log(res);
            if (res.result.length > 0) {
                this.partstypelist = res.result;
            }

        }).catch(Error => {
            console.log(Error)
        });
    }
    //配件编码
    public getflowinfo() {
        this.isShow = true;
    }
    //配件分类
    public partstypeinfo() {
        this.partstype = true;
    }
    //配件名称
    public partsName() {
        this.partsNames = true;
    }
    //配件名称
    public cuNames() {
        this.Names = true;
    }
    public partsitem(item) {
        this.partsParams = item;
        this.isShow = false;
        this.partstype = false;
        this.partsNames = false;
        this.Names = false;
    }

    //focus事件
    public partsSellReFocus(opt) {
        console.log(opt);
        this.searchTableParams = new partsSellSelectParam();
        this.searchTableParams[opt] = this.searchParam[opt];
        if (opt == "partsCode") {
            this.partsSellTable = { code: opt, url: 'findparts', params: this.searchTableParams };
        } else if (opt == "partsTypeName") {
            this.partsSellTypeName = { code: opt, url: 'findparts', params: this.searchTableParams };
        } else if (opt == "partsName") {
            this.partsSellpartsName = { code: opt, url: 'findparts', params: this.searchTableParams };
        } else if (opt == "partsSellname") {
            this.searchtableuser = new searchtableUser();
            this.searchtableuser.name = this.searchParam.name;
            this.partsSellname = { code: opt, url: 'customer', params: this.searchtableuser };
        }
    }
    //blur事件
    public partsSellReBlur(opt) {
        if (opt == "partsCode") {
            setTimeout(() => {
                this.partsSellTable = { code: 'closeCode', url: "" };
            }, 1000)
        } else if (opt == "partsTypeName") {
            setTimeout(() => {
                this.partsSellTypeName = { code: 'closeTypeName', url: "" };
            }, 1000)
        } else if (opt == "partsName") {
            setTimeout(() => {
                this.partsSellpartsName = { code: 'closepartsName', url: "" };
            }, 1000)
        } else if (opt == "partsSellname") {
            setTimeout(() => {
                this.partsSellname = { code: 'closepartsSellname', url: "" };
            }, 1000)
        }
    }
    //键盘点击事件
    public partsSellReKeyUp(event, opt) {
        this.searchTableParams[opt] = event.target.value;
        if (opt == "partsCode") {
            this.partsSellTable = { code: opt, url: 'findparts', params: this.searchTableParams };
        } else if (opt == "partsTypeName") {
            this.partsSellTypeName = { code: opt, url: 'findparts', params: this.searchTableParams };
        } else if (opt == "partsName") {
            this.partsSellpartsName = { code: opt, url: 'findparts', params: this.searchTableParams };
        } else if (opt == "partsSellname") {
            this.searchtableuser.name = event.target.value;
            this.partsSellname = { code: opt, url: 'customer', params: this.searchtableuser };
        }
    }
    //接受返回值
    public gobackItem(opt: any) {
        this.searchParam.partsCode = opt.partsCode;
        this.searchParam.partsTypeName = opt.partsTypeName;
        this.searchParam.partsName = opt.partsName;
        console.log(opt);
    }
    public gobackItemName(opt: any) {
        this.searchParam.name = opt.name;
        this.searchParam.mobile = opt.mobile;
    }
    //配件销售报表查询
    public search() {
        this.getpartsSelllist();
    }
    //分页
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.searchParam.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.searchParam.setPage(this.index);
        }
        this.getpartsSelllist();
    }
    // 时间校验
    private timeChange() {
        if (this.searchParam.beginTime && this.searchParam.endTime) {
            this.searchParam.beginTime <= this.searchParam.endTime ? this.timeError = false : this.timeError = true;
            console.log(this.searchParam.beginTime <= this.searchParam.endTime)
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }
    // 打印
    private orderPrint() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock()
    }


}
