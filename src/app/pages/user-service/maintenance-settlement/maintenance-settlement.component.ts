import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { helpers } from '../../../privaders/helper';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { MaintenanceSettlementService } from './maintenance-settlement.service';
import { settlement, OrderInfoDetail, SettlementOperation, detailSettlementDto, repairPackDtos } from '../user-service.model';

@Component({
    moduleId: module.id,
    selector: 'maintenance-settlement',
    templateUrl: 'maintenance-settlement.component.html',
    styleUrls: ['maintenance-settlement.component.scss'],
    animations: [flyIn]
})
export class MaintenanceSettlementComponent implements OnInit {
    @ViewChild('complete') public complete: ModalDirective;
    public flag: string;        // 结算 or 详情
    public settlementLoad: boolean = true;      // 加载中标识
    public detailLoad: boolean = true;
    public isInfoCode: string;                 // 标识结算、打印、撤销
    public orderId: number;                 // 暂存要撤销维修结算的 orderId
    public searchParams: settlement = new settlement();     // 查询条件
    public settlementParams: SettlementOperation = new SettlementOperation();   // 维修结算参数
    public repairSettlement: Array<any>;        // 维修工单列表
    public detailOrderInfo: OrderInfoDetail = new OrderInfoDetail();  // 维修工单详情
    public detailOrderSettlement: detailSettlementDto = new detailSettlementDto();  // 维修工单详情
    public detailOrderRepairPack = [];
    public checkBox = [null, null];
    public timeError: boolean = false;
    public isSave: boolean = false;
    public maxDate = new Date();
    public printDate;       // 打印时间
    public partPrice = { 'priceCount': 0 };  // 配件金额合计
    public projectPrice = { 'priceCount': 0, 'discountPrice': 0, 'amountPrice': 0 };    // 维修项目金额合计，优惠，应付

    constructor(
        public _msService: MaintenanceSettlementService,
        public _helpers: helpers
    ) { }

    ngOnInit() {
        this.loadSettlementList();
    }

    // 获取工单维修结算信息
    private loadSettlementList() {
        if (this.checkBox[0] && this.checkBox[1]) {
            this.searchParams.orderStatus = null;
        } else if (this.checkBox[0]) {
            this.searchParams.orderStatus = 6;      // 6 代表已结算
        } else if (this.checkBox[1]) {
            this.searchParams.orderStatus = 5;      // 5 代表待结算
        }
        console.log(this.searchParams);
        this._msService.getOrderSettlementList(this.searchParams).then(res => {
            console.log('维修结算信息   ', res);
            this.repairSettlement = res.result;
        }).catch(err => {
            console.log(err);
        })
    }
    // 取消条件查询工单维修结算信息
    private cancelLoadSettlementList() {
        this.searchParams = new settlement();
        this.timeError = false;
        this.checkBox = [null, null];
        this.loadSettlementList();
    }
    private timeValueChanged(temp) {
        if (this.searchParams.startTime && this.searchParams.endTime) {
            this.searchParams.startTime < this.searchParams.endTime ? this.timeError = false : this.timeError = true;
        }
    }

    // 工单维修结算详细
    private detailSettlement(id, temp) {
        this.flag = temp;       // 标识结算还是详情
        if (temp == 'settle') {
            this.settlementLoad = false;
            this.isInfoCode = 'settlement';
        } else if (temp == 'detail') {
            this.detailLoad = false;
        }
        this._msService.getOrderByOrderid({ 'orderId': id }).then(res => {
            console.log('结算详细   ', res);
            if (temp == 'settle') {
                this.settlementLoad = true;
                this.settlementParams.amountDue = res.result.settlementAmountDue;
                if (this.settlementParams.amountDue >= 0 && this.settlementParams.settlementType) {
                    this.isSave = false;
                } else {
                    this.isSave = true;
                }
            } else if (temp == 'detail') {
                this.detailLoad = true;
            }
            this.detailOrderInfo = res.result;
            this.detailOrderSettlement = res.result.detailSettlementDto || new detailSettlementDto();
            for (let item of res.result.detailProjectDtos) {
                if (item.repairPackDtos) {
                    for (let list of item.repairPackDtos) {
                        this.detailOrderRepairPack.push(list);
                    }
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // 校验维修结算的应收金额
    private amountDueChange() {
        if (this.settlementParams.amountDue > this.detailOrderInfo.settlementAmountDue || (!this.settlementParams.amountDue || isNaN(this.settlementParams.amountDue))) {
            this.isSave = true;
        } else {
            this.isSave = false;
        }
    }
    // 维修结算
    private saveSettlement() {
        this.settlementParams.orderId = this.detailOrderInfo.orderId;
        this._msService.setSettlement(this.settlementParams).then(res => {
            console.log(res);
            this.loadSettlementList();
            this.isInfoCode = 'print';
            this.printDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
            this.partPrice = { 'priceCount': 0 };// 金额合计，优惠，应付
            this.projectPrice = { 'priceCount': 0, 'discountPrice': 0, 'amountPrice': 0 };// 金额合计，优惠，应付
            this.detailOrderInfo.detailProjectDtos.forEach(elem => {
                this.projectPrice.priceCount += Math.round(elem.hourPrice * elem.repairHour * 100) / 100;
                this.projectPrice.discountPrice += Math.round(elem.hourPrice * elem.repairHour * (1 - elem.discount * 0.01) * 100) / 100;
                this.projectPrice.amountPrice += Math.round(elem.totalCount * 100) / 100;
                elem.repairPackDtos.forEach(element => {
                    this.partPrice.priceCount += Math.round(element.totalPrice * 100) / 100;
                });
            });
        }).catch(err => {
            console.log(err);
        })
        this.cencelSaveSettlement();
    }
    // 取消维修结算
    private cencelSaveSettlement() {
        this.settlementParams = new SettlementOperation();
    }

    // 暂存要撤销维修结算的 orderId
    private revokeSettlementOrderId(orderId) {
        this.orderId = orderId;
        this.isInfoCode = 'revoke';
    }
    // 撤销维修结算
    private revokeSettlement() {
        this._msService.revokeSettlementInfo({ 'orderId': this.orderId }).then(res => {
            console.log(res);
            this.loadSettlementList();
        }).catch(err => {
            console.log(err);
        })
        this.cencelRevokeSettlement();
    }
    // 取消撤销维修结算
    private cencelRevokeSettlement() {
        this.orderId = null;
    }

    // 打印
    private printSettlement() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock()
    }
}