import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { maintenance, detailInfoDto, RepairOrderInfoDto, partsInfo, preViewParams, preViewInfo, checkOrder } from '../workshop-management';
import { MaintenanceAcceptanceService } from './maintenance-acceptance.service';
import { FormValidate } from '../../../privaders/fromValidate';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'maintenance-acceptance',
    templateUrl: 'maintenance-acceptance.component.html',
    styleUrls: ['maintenance-acceptance.component.scss'],
    animations: [flyIn]
})
export class MaintenanceAcceptanceComponent {
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public list: Array<any>;
    public acceptparams: maintenance = new maintenance(); //删选信息参数
    public detailInfo: detailInfoDto = new detailInfoDto();
    public orderInfo: Array<RepairOrderInfoDto>;
    public usePartsFlag: boolean = false;
    public preViewOrderFlag: boolean = false;
    public needId: Number; //查询配件信息和预检单所需Id
    public partsList: Array<partsInfo>;
    public previewparams: preViewParams = new preViewParams();
    public preViewList: Array<preViewInfo>; //预检单信息
    public preViewPics: Array<any>; //预检单图片信息
    public checkOrderInfo: checkOrder = new checkOrder();
    public disBtn: boolean = true; //是否禁用通过按钮
    public mileageErrMsg: any;
    public approachtime: Number;
    @ViewChild('acceptModal') public acceptModal: ModalDirective;

    constructor(
        public _service: MaintenanceAcceptanceService
    ) {

    }
    ngOnInit() {
        this.getListInfo();
    }

    public getListInfo() {
        this._service.getList(this.acceptparams).then(res => {
            console.log(res);
            this.totalItems = 0;
            this.list = null;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.acceptparams.pageSize);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    public getInfoDetail(orderId) {
        $('input[name="allPro"]:checked').prop('checked', false);
        this.detailInfo = null;
        this.preViewList = new Array<preViewInfo>();
        this.needId = orderId;
        this._service.getDetail(orderId).then(res => {
            console.log(res);
            this.detailInfo = res.result;
            this.usePartsFlag = res.result.useParts;
            this.preViewOrderFlag = res.result.preViewOrder;
            this.orderInfo = res.result.repairOrderInfoDtoList;
            if (res.result.previewDto != null) {
                this.preViewList = res.result.previewDto.preview;
                this.preViewPics = res.result.previewDto.previewPics;
            }
            this.approachtime = res.result.mileAge;
            this.checkOrderInfo.mileage = res.result.mileAge;
            this.getPartsInfo(this.needId);
        }).catch(err => {
            console.log(err);
        });
    }

    // 初始化标签页状态
    // public resetTab() {
    //     this.usePartsFlag = false;
    //     this.preViewOrderFlag = false;
    // }

    // 分页条选择
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.acceptparams.setPage(this.index, Number(event.target.value));
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
            this.acceptparams.setPage(this.index);
        }
        this.getListInfo();
    }
    // 筛选信息
    public search() {
        var checkIds = [];
        $('input[name="maintenance"]:checked').each((index, elem) => checkIds.push($(elem).val()));
        console.log(checkIds);
        if (checkIds.length == 2) {
            $('input[name="allMaintenance"]').prop('checked', true);
            this.acceptparams.orderStatus = '';
            console.log(this.acceptparams.orderStatus);
        } else {
            $('input[name="allMaintenance"]:checked').prop('checked', false);
            this.acceptparams.orderStatus = checkIds.toString();
            console.log(this.acceptparams.orderStatus);
        }
        console.log(this.acceptparams);
        this.getListInfo();
    }
    // 判断全选与全不选
    public ischeckAll() {
        if ($('input[name="allMaintenance"]').is(":checked")) {
            $('input[name="maintenance"]').prop('checked', true);
            this.search();
        } else {
            $('input[name="maintenance"]:checked').prop('checked', false);
            this.search();
        }
    }

    // 如果详情中包含配件信息，按orderId查询相应配件信息
    public getPartsInfo(id) {
        this.partsList = new Array<partsInfo>();
        console.log(id);
        this._service.getParts(id).then(res => {
            console.log('配件信息');
            console.log(res);
            this.partsList = res.result;
        }).catch(err => {
            console.log(err);
        });
    }

    // 判断维修项目中是否全选
    public isAllPro() {
        if ($('input[name="allPro"]').is(":checked")) {
            if ($('input[name="pros"]:disabled').length == this.orderInfo.length) {
                // $('input[name="allPro"]').prop('disabled', true);
                console.log('没有可选中项');
                this.disBtn = true;
            } else {
                $('input[name="pros"]').prop('checked', true);
                $('input[name="pros"]:disabled').prop('checked', false);
                if (this.checkOrderInfo.mileage >= this.approachtime) {
                    this.disBtn = false;
                } else {
                    this.disBtn = true;
                }
            }
        } else {
            $('input[name="pros"]:checked').prop('checked', false);
            this.disBtn = true;
        }
    }
    public ischeckAllPro() {
        var checkProIds = [];
        $('input[name="pros"]:checked').each((index, elem) => checkProIds.push($(elem).val()));
        console.log(($('input[name="pros"]:checked').length));
        console.log(this.orderInfo.length);
        if (($('input[name="pros"]:checked').length + $('input[name="pros"]:disabled').length) == this.orderInfo.length) {
            $('input[name="allPro"]').prop('checked', true);
            this.checkOrderInfo.orderRepairIdList = [];
        } else {
            $('input[name="allPro"]:checked').prop('checked', false);
        }
        if (checkProIds.length == 0) {
            this.disBtn = true;
        } else {
            if (this.checkOrderInfo.mileage >= this.approachtime) {
                this.disBtn = false;
            } else {
                this.disBtn = true;
            }
        }
    }

    // 通过
    public pass() {
        var checkProIds = [];
        $('input[name="pros"]:checked').each((index, elem) => checkProIds.push($(elem).val()));
        console.log(checkProIds);
        this.checkOrderInfo.orderRepairIdList = checkProIds;
        console.log(this.checkOrderInfo);
        this._service.pass(this.checkOrderInfo).then(res => {
            console.log(res);
            this.acceptModal.hide();
            this.getListInfo();
        }).catch(err => {
            console.log(err._body);
            console.log(JSON.parse(err._body).errmsg);
            this.mileageErrMsg = JSON.parse(err._body).errmsg;
            $('.mileageErr').removeClass('dis');
            $('.mileageErr').html(this.mileageErrMsg);
        });
    }

    // 出厂里程实时验证 
    public onKeyPress(event: any) {
        let keyCode = event.keyCode;
        if (this.checkOrderInfo.mileage < this.approachtime) {
            this.disBtn = true;
        } else {
            this.disBtn = false;
        }
        if (keyCode < 48 || keyCode > 57) {
            this.disBtn = true;
        } else {
            console.log(keyCode);
        }
    }
}
