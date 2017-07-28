import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { SellCashierService } from './sell-cashier.service';
import { cash, detailListInfo, detailSellPartsInfo, checkMonry, cashsearch } from '../finance-manage';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'sell-cashier',
    templateUrl: 'sell-cashier.component.html',
    styleUrls: ['sell-cashier.component.scss'],
    animations: [flyIn]
})
export class SellCashierComponent {
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public list: Array<any>; //保存列表信息
    // public cashsellparams: cash = new cash(); //条件查询
    public listInfo: detailListInfo = new detailListInfo(); //保存列表详情
    public sellPartsInfo: detailSellPartsInfo = new detailSellPartsInfo(); //保存配件信息
    public cheMoney: checkMonry = new checkMonry(); //应收金额（相关支付方式）
    public total: string; //应收总金额
    public cashsearchparams: cashsearch = new cashsearch(); //筛选信息
    public cashierId: Number;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    @ViewChild('cashier') public cashier: ModalDirective;

    constructor(
        public _service: SellCashierService
    ) {

    }
    ngOnInit() {
        this.getListInfo();
    }

    public getListInfo() {
        this._service.getList(this.cashsearchparams).then(res => {
            console.log(res);
            this.totalItems = 0;
            this.list = null;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.cashsearchparams.pageSize);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    public getInfoDetail(sellId) {
        this.cashierId = sellId;
        this._service.getInfoDetail(sellId).then(res => {
            console.log(res);
            this.listInfo = res.result;
            this.sellPartsInfo = res.result.detailSellPartsDto;
        }).catch(err => {
            console.log(err);
        });
    }

    // 确定收银
    public surecashier() {
        console.log(this.total);
        console.log((parseFloat(this.cheMoney.cashMoney) + parseFloat(this.cheMoney.wechatMoney) + parseFloat(this.cheMoney.alipayMoney) + parseFloat(this.cheMoney.bankMoney) + parseFloat(this.cheMoney.cardMoney) + parseFloat(this.cheMoney.checkMoney) + parseFloat(this.cheMoney.claimMoney) + parseFloat(this.cheMoney.insuranceMoney)));
        if ((parseFloat(this.cheMoney.cashMoney) + parseFloat(this.cheMoney.wechatMoney) + parseFloat(this.cheMoney.alipayMoney) + parseFloat(this.cheMoney.bankMoney) + parseFloat(this.cheMoney.cardMoney) + parseFloat(this.cheMoney.checkMoney) + parseFloat(this.cheMoney.claimMoney) + parseFloat(this.cheMoney.insuranceMoney)) == parseFloat(this.total)) {
            console.log("金额符合，可以确认收银");
            this.cheMoney.cashType = 2;
            this.cheMoney.id = this.cashierId;
            console.log(this.cheMoney);
            this._service.casheir(this.cheMoney).then(res => {
                console.log(res);
                this.cashier.hide();
                this.cheMoney = new checkMonry();
                this.getListInfo();
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log("金额不符合，请核对");
            $('.cashierInfo').removeClass('dis');
            setTimeout("$('.cashierInfo').addClass('dis');", 2000);
            this.cheMoney = new checkMonry();
        }
    }

    // 筛选信息
    public search() {
        var checkIds = [];
        $('input[name="cashier"]:checked').each((index, elem) => checkIds.push($(elem).val()));
        console.log(checkIds.length);
        console.log(checkIds.toString());
        if (checkIds.length == 2) {
            this.cashsearchparams.cashierStatus = '';
            console.log(this.cashsearchparams.cashierStatus);
        } else {
            this.cashsearchparams.cashierStatus = checkIds.toString();
            console.log(this.cashsearchparams.cashierStatus);
        }
        console.log(this.cashsearchparams);
        this.getListInfo();
    }

    // 重置筛选条件
    public reset() {
        this.timeError = false;
        this.notSubmit = false;
        this.cashsearchparams = new cashsearch();
        this.getListInfo();
    }

    // 模态框退出时重置金额
    public resetMoney() {
        this.cheMoney = new checkMonry();
    }

    // 分页条选择
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.cashsearchparams.setPage(this.index, Number(event.target.value));
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
            this.cashsearchparams.setPage(this.index);
        }
        this.getListInfo();
    }

    // 时间校验
    private timeChange() {
        if (this.cashsearchparams.startTime && this.cashsearchparams.endTime) {
            this.cashsearchparams.startTime <= this.cashsearchparams.endTime ? this.timeError = false : this.timeError = true;
            console.log(this.cashsearchparams.startTime <= this.cashsearchparams.endTime);
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }
    // 获取焦点时候
    public resetCheMoney(sign) {
        if (sign == 1 && this.cheMoney.cashMoney == '0') {
            this.cheMoney.cashMoney = '';
        } else if (sign == 2 && this.cheMoney.wechatMoney == '0') {
            this.cheMoney.wechatMoney = '';
        } else if (sign == 3 && this.cheMoney.alipayMoney == '0') {
            this.cheMoney.alipayMoney = '';
        } else if (sign == 4 && this.cheMoney.bankMoney == '0') {
            this.cheMoney.bankMoney = '';
        } else if (sign == 5 && this.cheMoney.cardMoney == '0') {
            this.cheMoney.cardMoney = '';
        } else if (sign == 6 && this.cheMoney.checkMoney == '0') {
            this.cheMoney.checkMoney = '';
        } else if (sign == 7 && this.cheMoney.claimMoney == '0') {
            this.cheMoney.claimMoney = '';
        } else if (sign == 8 && this.cheMoney.insuranceMoney == '0') {
            this.cheMoney.insuranceMoney = '';
        }
    }
    // 失去焦点时候
    public setCheMoney(sign) {
        if (sign == 1 && this.cheMoney.cashMoney == '') {
            this.cheMoney.cashMoney = '0';
        } else if (sign == 2 && this.cheMoney.wechatMoney == '') {
            this.cheMoney.wechatMoney = '0';
        } else if (sign == 3 && this.cheMoney.alipayMoney == '') {
            this.cheMoney.alipayMoney = '0';
        } else if (sign == 4 && this.cheMoney.bankMoney == '') {
            this.cheMoney.bankMoney = '0';
        } else if (sign == 5 && this.cheMoney.cardMoney == '') {
            this.cheMoney.cardMoney = '0';
        } else if (sign == 6 && this.cheMoney.checkMoney == '') {
            this.cheMoney.checkMoney = '0';
        } else if (sign == 7 && this.cheMoney.claimMoney == '') {
            this.cheMoney.claimMoney = '0';
        } else if (sign == 8 && this.cheMoney.insuranceMoney == '') {
            this.cheMoney.insuranceMoney = '0';
        }
    }
}
