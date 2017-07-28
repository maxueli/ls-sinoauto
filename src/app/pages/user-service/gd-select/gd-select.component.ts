import { Component, OnInit } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { helpers } from '../../../privaders/helper';
import { orderSearch, orderDetailInfo, PreviewDto, RepairPartsInfoDto } from '../user-service.model';
import { gdSelectService } from './gd-select.service';

@Component({
    moduleId: module.id,
    selector: 'gd-select',
    templateUrl: 'gd-select.component.html',
    styleUrls: ['gd-select.component.scss'],
    animations: [flyIn]
})
export class GdSelectComponent implements OnInit {
    public totalItems: number;          // 分页条总信息条数
    public index: number = 1;           // 分页条当前选中页标
    public maxPageSize: number = 1;     // 分页条最大页数
    public choosePage: number;          // 输入框选择页数
    public isSelect: boolean;           // 总条数小于每页显示数量则禁用显示数量选择
    public isCollapsed: boolean = true;
    public detailLoad: boolean = true;
    public searchParams: orderSearch = new orderSearch();       // 查询条件
    public orderList: Array<any>;       // 工单信息列表
    public detailOrderInfo: orderDetailInfo = new orderDetailInfo();  // 维修工单详情
    public checkBox = [null, null, null, null, null, null, null];
    public isParts: boolean = false;
    public partsList: Array<RepairPartsInfoDto>;
    public isPreview: boolean = false;
    public previewList: PreviewDto = new PreviewDto();
    public idExportLoad: boolean = true;
    public maxDate = new Date();
    public printDate;
    public factoryTimeError: boolean = false;
    public outFactoryTimeError: boolean = false;
    public notSubmit: boolean = false;
    public technicianName: string;
    public price = { 'hourPrice': 0, 'materialsPrice': 0, 'discountPrice': 0, 'amountPrice': 0, 'hourCost': 0 };// 工时费,材料费,优惠,应付,工时总计

    constructor(
        public _gdService: gdSelectService,
        public _helpers: helpers
    ) { }

    ngOnInit() {
        this.loadOrders();
    }

    // 获取工单信息
    private loadOrders() {
        let arr = [];
        this.checkBox.forEach((element, index) => {
            element == true && arr.push(index + 1);
        });
        arr.length && (this.searchParams.orderStatus = arr.join(','));
        console.log(this.searchParams);
        this._gdService.getOrdersList(this.searchParams).then(res => {
            console.log('工单信息   ', res);
            this.orderList = res.result;
            this.totalItems = res.totalCount;
            this.maxPageSize = Math.ceil(res.totalCount / this.searchParams.pageSize);
        }).catch(err => {
            console.log(err);
        })
    }
    // 分页选择
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.searchParams.setPage(this.index, Number(event.target.value));
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
            this.searchParams.setPage(this.index);
        }
        this.loadOrders();
    }
    // 取消条件查询工单信息
    private cancelLoadOrders() {
        $('input[name="orderStatus"]:checked').each((index, elem) => {
            $(elem).prop('checked', false);
        });
        this.checkBox = [null, null, null, null, null, null, null];
        this.searchParams = new orderSearch();
        this.factoryTimeError = this.outFactoryTimeError = this.notSubmit = false;
        this.loadOrders();
    }

    // 工单详情
    private detailOrder(orderId, id) {
        this.technicianName = this.orderList[id].technicianName;
        this._gdService.getOrdersDetail({ 'orderId': orderId }).then(res => {
            console.log('工单详情   ', res.result);
            this.detailOrderInfo = res.result;
            this.printDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
            this.price = { 'hourPrice': 0, 'materialsPrice': 0, 'discountPrice': 0, 'amountPrice': 0, 'hourCost': 0 };//工时费,材料费,优惠,应付,工时总计
            if (this.detailOrderInfo.repairOrderInfoDtos) {
                this.detailOrderInfo.repairOrderInfoDtos.forEach(elem => {
                    this.price.hourPrice += Math.round(elem.repairHour * elem.hourPrice * 100) / 100;
                    this.price.discountPrice += Math.round(elem.repairHour * elem.hourPrice * (1 - elem.discount * 0.01) * 100) / 100;
                    this.price.amountPrice += elem.totalCount;
                    this.price.hourCost += elem.repairHour;
                });
            }
            if (res.result.haveUseParts) {      // 如果有维修配件，加载维修配件
                this.isParts = true;
                this._gdService.getRepairPart({ 'orderId': res.result.orderId }).then(res => {
                    console.log('维修配件   ', res.result);
                    this.partsList = res.result;
                    this.partsList.forEach(elem => {
                        this.price.materialsPrice += Math.round(elem.num * elem.price * 100) / 100;
                    });
                    this.price.amountPrice += this.price.materialsPrice;
                }).catch(err => {
                    console.log(err);
                })
            }
            if (res.result.havePreView) {         // 如果有预检单，加载预检单
                this.isPreview = true;
                this._gdService.getPreview({ 'orderId': res.result.orderId }).then(res => {
                    // console.log('预检单   ', res);
                    this.previewList = res.result;
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    private resetPartsAndPreview() {
        this.isPreview = this.isParts = false;
    }

    // 进出厂时间校验
    private timeValueChanged(temp) {
        console.log(temp)
        if (temp == 'factory') {
            if (this.searchParams.factoryBeginTime && this.searchParams.factoryEndTime) {
                this.searchParams.factoryBeginTime <= this.searchParams.factoryEndTime ? this.factoryTimeError = false : this.factoryTimeError = true;
                console.log(this.searchParams.factoryBeginTime <= this.searchParams.factoryEndTime)
            }
        } else if (temp == 'outFactory') {
            if (this.searchParams.outFactoryBeginTime && this.searchParams.outFactoryEndTime) {
                this.searchParams.outFactoryBeginTime <= this.searchParams.outFactoryEndTime ? this.outFactoryTimeError = false : this.outFactoryTimeError = true;
                console.log(this.searchParams.outFactoryBeginTime <= this.searchParams.outFactoryEndTime)
            }
        }
        this.notSubmit = false;
        if (this.factoryTimeError == true || this.outFactoryTimeError == true) {
            this.notSubmit = true;
        }
    }

    // 打印
    private orderPrint() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock()
        console.log(this.printDate)
    }
}
