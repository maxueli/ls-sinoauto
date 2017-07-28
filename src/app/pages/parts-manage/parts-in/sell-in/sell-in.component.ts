import { Component, OnInit, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../app.animation';
import { helpers } from '../../../../privaders/helper'
import { allTableModal } from '../../../../privaders/common.modal';
import { findallselloutcodeParams, SellRetreatDto, SellOutInfoDto, SellRetreatRecordDto, SellRetreatSelectDto, SellRetreat, SellRetreatHang, HangOrderSearch } from './sellinModal';
import { sellInService } from './sellinService';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'sell-in',
    templateUrl: 'sell-in.component.html',
    styleUrls: ['sell-in.component.scss'],
    animations: [flyIn]
})
export class SellInComponent implements OnInit {
    @ViewChild('complete') public complete: ModalDirective;
    public sellNameModal: allTableModal = new allTableModal();
    public findallselloutcode: allTableModal = new allTableModal();
    public searchHang: HangOrderSearch = new HangOrderSearch();     // 挂单信息参数
    public hangOrder: Array<any>;           // 挂单信息列表
    public hangOrderCount: Array<any>;      // 挂单信息列表
    public findallselloutcodeparams: findallselloutcodeParams = new findallselloutcodeParams();
    public sellRetreatInfo: SellRetreatDto = new SellRetreatDto();      // 销售出库信息
    public stSellRetreats: SellRetreat = new SellRetreat();             // 生成退库单参数
    public sellRetreatHang: SellRetreatHang = new SellRetreatHang();    // 挂单参数
    public sellReturnCount: number = 1;
    public canBackNumber: number;
    public isLoad: boolean = true;
    public hasSellInfo: boolean = false;
    // public hasReturnSellInfo: boolean = false;
    public isSave: boolean = true;
    public printDate;               // 打印时间
    public totalPrice: number = 0;  // 打印金额
    constructor(
        public _helpers: helpers,
        public _sellService: sellInService
    ) { }

    ngOnInit() {
        this.loadHangOrder();
    }
    // 加载挂单信息
    private loadHangOrder() {
        this._sellService.getHangLogs(this.searchHang).then(res => {
            console.log('挂单信息   ', res);
            this.hangOrder = res.result;
            this.hangOrderCount = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    // 挂单作废
    private setDeleteHangOrder(hangId) {    // 8 表示挂单销售退库
        this._sellService.deletehang(hangId, 8).then(res => {
            console.log(res);
            this.loadHangOrder();
        }).catch(err => {
            console.log(err);
        })
    }
    // 挂单详情
    private gethanglogsdetail(orderNo) {
        this._sellService.getSellRetreats({ 'sellOutCode': orderNo }).then(res => {
            console.log('挂单详情   ', res);
            this.goSellOutCode(res.result);
        }).catch(err => {
            console.log(err);
        })
    }
    // 挂单信息下拉展示
    public onHidden(): void {
        $('.fa-angle-down').addClass('fa-angle-up');
        $('.fa-angle-down').removeClass('fa-angle-down');
    }
    public onShown(): void {
        $('.fa-angle-up').addClass('fa-angle-down');
        $('.fa-angle-up').removeClass('fa-angle-up');
    }
    public partsSellReFocus(opt) {
        this.findallselloutcode = { code: opt, url: 'findallselloutcode', params: this.findallselloutcodeparams }
    }
    //blur事件
    public partsSellReBlur(opt) {
        setTimeout(() => {
            this.findallselloutcode = { code: 'closeCode', url: "" };
        }, 1000)
    }
    //键盘点击事件
    public partsSellReKeyUp(event, opt) {
        this.findallselloutcode = { code: opt, url: 'findallselloutcode', params: this.findallselloutcodeparams }
    }

    // 获取销售出库信息
    public goSellOutCode(event) {
        this.sellRetreatInfo.sellOutInfoDtos = new SellOutInfoDto();
        if (event.sellOutInfoDtos) {
            this.sellRetreatInfo.sellOutInfoDtos = event.sellOutInfoDtos[0];
            this.stSellRetreats.totalPrice = this.sellRetreatInfo.sellOutInfoDtos.price;
            this.hasSellInfo = true;
        }
        
        this.sellRetreatInfo.sellRetreatRecordDtos = new Array<SellRetreatRecordDto>();
        event.sellRetreatRecordDtos.forEach(element => {
            console.log('element  ', element.hang);
            element.hang && (this.sellRetreatInfo.sellRetreatRecordDtos.push(element));
        });
        this.sellRetreatInfo.sellRetreatRecordDtos.length > 0 && (this.isSave = false);

        this.sellRetreatInfo.sellRetreatSelectDto = new SellRetreatSelectDto();
        if (event.sellRetreatSelectDto) {
            this.sellRetreatInfo.sellRetreatSelectDto = event.sellRetreatSelectDto;
            // this.findallselloutcodeparams.sellOutCode = event.sellRetreatSelectDto.sellCode;
        }
        this.canBackNumber = this.sellRetreatInfo.sellOutInfoDtos.count - this.sellRetreatInfo.sellOutInfoDtos.returnCount;
        console.log('销售出库信息  ', this.sellRetreatInfo);
    }

    // 退库可退数量
    private returnNumChange() {
        if (this.sellReturnCount < 1) {
            this.sellReturnCount = 1;
        } else if (this.sellReturnCount > this.canBackNumber) {
            this.sellReturnCount = this.canBackNumber;
        }
        this.stSellRetreats.totalPrice = Math.round(this.sellRetreatInfo.sellOutInfoDtos.price * this.sellReturnCount * 100) / 100;
    }

    // 保存退库信息并展示到页面退库信息上
    private saveSellRetreats() {
        this.sellRetreatInfo.sellRetreatRecordDtos.pop();
        this.sellRetreatInfo.sellRetreatRecordDtos.push(new SellRetreatRecordDto());
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].depotName = this.sellRetreatInfo.sellOutInfoDtos.depotName;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].depotPosName = this.sellRetreatInfo.sellOutInfoDtos.depotPosName;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].partsBrandName = this.sellRetreatInfo.sellOutInfoDtos.partsBrandName;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].partsCode = this.sellRetreatInfo.sellOutInfoDtos.partsCode;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].partsId = this.sellRetreatInfo.sellOutInfoDtos.partsId;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].partsName = this.sellRetreatInfo.sellOutInfoDtos.partsName;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].partsSpec = this.sellRetreatInfo.sellOutInfoDtos.partsSpec;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].partsTypeName = this.sellRetreatInfo.sellOutInfoDtos.partsTypeName;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].partsUnit = this.sellRetreatInfo.sellOutInfoDtos.partsUnit;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].price = this.sellRetreatInfo.sellOutInfoDtos.price;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].inventory = this.sellRetreatInfo.sellOutInfoDtos.inventory + this.sellReturnCount;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].retreatCount = this.sellReturnCount;
        this.sellRetreatInfo.sellRetreatRecordDtos[this.sellRetreatInfo.sellRetreatRecordDtos.length - 1].totalPrice = this.stSellRetreats.totalPrice;
        this.isSave = false;
        console.log('保存退库信息   ', this.sellRetreatInfo);
    }
    // 删除退库信息
    private deleteSell(id) {
        let i = id;
        for (; i < this.sellRetreatInfo.sellRetreatRecordDtos.length - 1; i++) {
            this.sellRetreatInfo.sellRetreatRecordDtos[i] = this.sellRetreatInfo.sellRetreatRecordDtos[i + 1];
        }
        i == this.sellRetreatInfo.sellRetreatRecordDtos.length - 1 && this.sellRetreatInfo.sellRetreatRecordDtos.length--;
        this.sellRetreatInfo.sellRetreatRecordDtos.length == 0 && (this.isSave = true);
    }

    // 退库
    private saveGenerateSellRetreat() {
        this.getSellData();
        this._sellService.batchGenerateSellRetreat(this.sellRetreatHang.stSellRetreats).then(res => {
            this.loadHangOrder();
            console.log('退库   ', res);
            this.complete.show();
            this.printDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
            this.sellRetreatInfo.sellRetreatRecordDtos.forEach(element => {
                this.totalPrice += element.totalPrice;
            });
            this.isSave = true;
        }).catch(err => {
            console.log(err);
        })
    }
    // 挂单
    private saveHangOrder() {
        this.getSellData();
        this.sellRetreatHang.customerName = this.sellRetreatInfo.sellRetreatSelectDto.name;
        this.sellRetreatHang.sellCode = this.sellRetreatInfo.sellOutInfoDtos.sellCode;
        this._sellService.sellRetreatAddHang(this.sellRetreatHang).then(res => {
            console.log('挂单   ', res);
            this.isSave = true;
            this.clearInfo();
            this.loadHangOrder();
        }).catch(err => {
            console.log(err);
        })
    }
    // 保存退库、挂单基本信息
    private getSellData() {
        this.stSellRetreats.partsId = this.sellRetreatInfo.sellOutInfoDtos.partsId;
        this.stSellRetreats.price = this.sellRetreatInfo.sellOutInfoDtos.price;
        this.stSellRetreats.retreatCount = this.sellReturnCount;
        this.stSellRetreats.sellCode = this.sellRetreatInfo.sellOutInfoDtos.sellCode
        this.stSellRetreats.sellId = this.sellRetreatInfo.sellOutInfoDtos.sellId;
        this.stSellRetreats.stockId = this.sellRetreatInfo.sellOutInfoDtos.stockId;
        this.sellRetreatHang.stSellRetreats.push(this.stSellRetreats);
    }
    // 清除信息
    private clearInfo() {
        this.hasSellInfo = false;
        this.sellRetreatInfo = new SellRetreatDto();
        this.sellRetreatHang = new SellRetreatHang();
        this.findallselloutcodeparams = new findallselloutcodeParams();
        this.sellReturnCount = 1;
        // console.log('清除信息   ', this.sellRetreatInfo, this.sellRetreatHang)
    }

    // 退库信息打印
    private print() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock();
        this.clearInfo();
    }
}
