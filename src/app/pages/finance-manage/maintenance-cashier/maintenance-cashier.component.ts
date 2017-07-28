import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { MaintenanceCashierService } from './maintenance-cashier.service';
import { cashierDetail, projectDto, settlementDto, DetailRepairPackDto, cashsearch, checkMonry } from '../finance-manage';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'maintenance-cashier',
    templateUrl: 'maintenance-cashier.component.html',
    styleUrls: ['maintenance-cashier.component.scss'],
    animations: [flyIn]
})
export class MaintenanceCashierComponent {
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public list: Array<any>;
    public listDetail: cashierDetail = new cashierDetail(); //详情信息
    public deteilProjectDto: Array<projectDto>; //维修项目信息
    public detailSettlementDto: settlementDto = new settlementDto(); //结算信息
    public partcheck: boolean; //判断是否有维修配件
    public detailrepairPackDtos: Array<DetailRepairPackDto> = new Array<DetailRepairPackDto>();
    public technician: string = ""; //维修技师
    public cashsearchparams: cashsearch = new cashsearch(); //筛选信息
    public cheMoney: checkMonry = new checkMonry(); //应收金额（相关支付方式）
    public total: string; //应收总金额
    public cashierId: Number;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    @ViewChild('cashier') public cashier: ModalDirective;

    constructor(
        public _service: MaintenanceCashierService
    ) {

    }
    ngOnInit() {
        this.getListInfo();
    }
    // 获取列表信息
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
    // 获取详情信息 
    public getInfoDetail(orderid) {
        this.cashierId = orderid;
        this.detailrepairPackDtos = Array<DetailRepairPackDto>();
        this._service.getListDetail(orderid).then(res => {
            console.log(res);
            this.listDetail = res.result;
            this.deteilProjectDto = res.result.detailProjectDtos;
            this.detailSettlementDto = res.result.detailSettlementDto;
            console.log(this.deteilProjectDto);
            // 读取项目信息中的配件信息
            for (var i = 0; i < this.deteilProjectDto.length; i++) {
                if (this.deteilProjectDto[i].repairPackDtos != null) {
                    console.log(this.deteilProjectDto[i].repairPackDtos);
                    this.detailrepairPackDtos.push(this.deteilProjectDto[i].repairPackDtos);
                    if (this.deteilProjectDto[i].repairUserName != null) {
                        this.technician += this.deteilProjectDto[i].repairUserName + ';';
                    }
                }
            }
            console.log(this.detailrepairPackDtos);
            console.log(this.technician);
            // 如果有配件数据，保存在新的数组中，如果没有页面不展示配件信息
            if (this.detailrepairPackDtos.length == 0) {
                this.partcheck = false;
            } else {
                console.log(this.detailrepairPackDtos.length);
                this.partcheck = true;
            }
        }).catch(err => {
            console.log(err);
        });
    }
    // 筛选信息
    public search() {
        var checkIds = [];
        $('input[name="cashier"]:checked').each((index, elem) => checkIds.push($(elem).val()));
        // console.log(checkIds.length);
        // console.log(checkIds.toString());
        if (checkIds.length == 2) {
            this.cashsearchparams.orderStatus = '';
            console.log(this.cashsearchparams.orderStatus);
        } else {
            this.cashsearchparams.orderStatus = checkIds.toString();
            console.log(this.cashsearchparams.orderStatus);
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
    // 确定收银
    public surecashier() {
        console.log(this.total);
        if ((parseFloat(this.cheMoney.cashMoney) + parseFloat(this.cheMoney.wechatMoney) + parseFloat(this.cheMoney.alipayMoney) + parseFloat(this.cheMoney.bankMoney) + parseFloat(this.cheMoney.cardMoney) + parseFloat(this.cheMoney.checkMoney) + parseFloat(this.cheMoney.claimMoney) + parseFloat(this.cheMoney.insuranceMoney)) == parseFloat(this.total)) {
            console.log("金额符合，可以确认收银");
            this.cheMoney.cashType = 1;
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
    // 模态框退出时重置金额
    public resetMoney() {
        this.cheMoney = new checkMonry();
    }
    // 时间校验
    private timeChange() {
        if (this.cashsearchparams.startTime && this.cashsearchparams.endTime) {
            this.cashsearchparams.startTime <= this.cashsearchparams.endTime ? this.timeError = false : this.timeError = true;
            console.log(this.cashsearchparams.startTime <= this.cashsearchparams.endTime)
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
