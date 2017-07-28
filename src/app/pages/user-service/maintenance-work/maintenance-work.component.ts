import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { maintenance, repairOrderInfoDto, dispatchingParamDto } from './maintenance-work';
import { MaintenanceWorkereService } from './maintenance-work.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'maintenance-work',
    templateUrl: 'maintenance-work.component.html',
    styleUrls: ['maintenance-work.component.scss'],
    animations: [flyIn]
})
export class MaintenanceWorkComponent {
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public list: Array<any>;
    public workerparams: maintenance = new maintenance();
    public statusFalg: Number; //状态
    // public repairOrderInfoDtoList: repairOrderInfoDto = new repairOrderInfoDto();
    public repairOrderInfoDtoList: Array<any>;
    public sendToListInfo: Array<any>;
    public turnToListInfo: Array<any>;
    public toParams: dispatchingParamDto = new dispatchingParamDto();
    public disBtn: boolean = true; //是否禁用按钮
    public orderId: Number;
    @ViewChild('workModal') public workModal: ModalDirective;
    @ViewChild('complete') public complete: ModalDirective;
    public disBtn2: boolean = true; //是否禁用按钮(是否通过项)
    public disBtn3: boolean = true; //是否禁用按钮(是否已指派)
    public disSendBtn: boolean = true; //是否禁用按钮(是否已指派)

    constructor(
        public _service: MaintenanceWorkereService
    ) {

    }
    ngOnInit() {
        this.getListInfo();
    }

    public getListInfo() {
        this._service.getList(this.workerparams).then(res => {
            console.log(res);
            this.totalItems = 0;
            this.list = null;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.workerparams.pageSize);
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
            this.workerparams.setPage(this.index, Number(event.target.value));
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
            this.workerparams.setPage(this.index);
        }
        this.getListInfo();
    }

    // 获取派工详情
    public getDetailInfo(id) {
        $('input[name="alRepaiitem"]:checked').prop('checked', false);
        this.repairOrderInfoDtoList = null;
        this._service.getworkDetailInfo(id).then(res => {
            console.log(res);
            this.repairOrderInfoDtoList = res.result.repairOrderInfoDtoList;
        }).catch(err => {
            console.log(err);
        });
    }

    // 指派、转派显示弹框
    public showMsg(flag) {
        if (flag == 1) {
            $('.popModal1').removeClass('dis');
            this.closeReset();
        } else if (flag == 2) {
            $('.popModal2').removeClass('dis');
            this.closeReset();
        }
    }
    // 隐藏指派、转派弹框
    public cancle(flag) {
        if (flag == 1) {
            $('.popModal1').addClass('dis');
            this.workModal.hide();
        } else if (flag == 2) {
            $('.popModal2').addClass('dis');
            this.workModal.hide();
        }
    }

    // 筛选信息
    public search() {
        var checkIds = [];
        $('input[name="cashier"]:checked').each((index, elem) => checkIds.push($(elem).val()));
        if (checkIds.length == 3) {
            $('input[name="allCashier"]').prop('checked', true);
            this.workerparams.orderStatus = '';
        } else {
            $('input[name="allCashier"]:checked').prop('checked', false);
            this.workerparams.orderStatus = checkIds.toString();
        }
        console.log(this.workerparams);
        this.getListInfo();
    }

    // 判断全选与全不选
    public ischeckAll() {
        if ($('input[name="allCashier"]').is(":checked")) {
            $('input[name="cashier"]').prop('checked', true);
            this.search();
        } else {
            $('input[name="cashier"]:checked').prop('checked', false);
            this.search();
        }
    }

    // 获取指派信息
    public sendToList() {
        this.disSendBtn = true; //初始化指派按钮
        var proIds = [];
        $('input[name="repaiitem"]:checked').each((index, elem) => proIds.push(parseInt(elem.value.split('_')[0])));
        this.toParams.repairOrderIds = proIds;
        this.sendToListInfo = null;
        this._service.getTechncianList().then(res => {
            console.log(res);
            this.sendToListInfo = res.result;
        }).catch(err => {
            console.log(err);
        });
    }
    // 确定指派
    public sureSend() {
        this.toParams.userId = $('input[name="sendToItem"]:checked').val();
        this.toParams.dmlflag = 1;
        console.log(this.toParams);
        this._service.sureSendTo(this.toParams).then(res => {
            console.log(res);
            this.cancle(1);
            this.workModal.hide();
            this.getListInfo();
        }).catch(err => {
            console.log(err);
        });
    }
    // 确定转派
    public sureTurn() {
        this.toParams.userId = $('input[name="turnToItem"]:checked').val();
        this.toParams.dmlflag = 2;
        console.log(this.toParams);
        this._service.sureTurnTo(this.toParams).then(res => {
            console.log(res);
            this.cancle(2);
            this.workModal.hide();
            this.getListInfo();
        }).catch(err => {
            console.log(err);
        });
    }
    // 获取转派信息
    public turnToList() {
        var proIds = [];
        $('input[name="repaiitem"]:checked').each((index, elem) => proIds.push(parseInt(elem.value.split('_')[0])));
        this.toParams.repairOrderIds = proIds;
        this.turnToListInfo = null;
        this._service.getTechncianList().then(res => {
            console.log(res);
            this.turnToListInfo = res.result;
        }).catch(err => {
            console.log(err);
        });
    }

    // 判断全选全不选
    public isAllPro() {
        if ($('input[name="alRepaiitem"]').is(":checked")) {
            if ($('input[name="repaiitem"]:disabled').length == this.repairOrderInfoDtoList.length) {
                var isAllotItems = []; //存放指派状态
                var isTransferItems = []; //存放转派状态
                console.log('没有可选中项');
            } else {
                $('input[name="repaiitem"]').prop('checked', true);
                $('input[name="repaiitem"]:disabled').prop('checked', false);
                var isAllotItems = []; //存放指派状态
                var isTransferItems = []; //存放转派状态
                $('input[name="repaiitem"]:checked').each((index, elem) => {
                    isAllotItems.push(elem.value.split('_')[2]);
                    isTransferItems.push(elem.value.split('_')[1]);
                });
                var isAllotsum = 0;
                var isTransfersum = 0;
                for (var key of isAllotItems) {
                    if (key == '0') {
                        isAllotsum++;
                    } else { }
                }
                for (var key of isTransferItems) {
                    if (key == '0' || key == 'null') {
                        isTransfersum++;
                    } else { }
                }
                if (isAllotsum == $('input[name="repaiitem"]:checked').length && (isTransfersum == $('input[name="repaiitem"]:checked').length)) {
                    console.log('可以指派所有');
                    this.disSendBtn = false;
                } else {
                    console.log('不能指派所有');
                    this.disSendBtn = true;
                }
                if (isTransfersum == $('input[name="repaiitem"]:checked').length && (isAllotsum == 0)) {
                    console.log('可以转派所有');
                    this.disBtn = false;
                } else {
                    console.log('不能转派所有');
                    this.disBtn = true;
                }
            }
        } else {
            this.arr = []; //初始化保存被选中数据数组
            $('input[name="repaiitem"]:checked').prop('checked', false);
            this.disSendBtn = true;
            this.disBtn = true;
        }
    }

    // 单选、多选判断按钮状态并取值
    selections = {};
    arr = [];
    public handle(e, item) {
        this.selections = {};
        var t = e.target, v = t.value, c = t.checked;
        this.selections[v] = c;
        if (c) {
            this.arr.push(item);
        } else {
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] == item) {
                    this.arr.splice(i, 1);
                }
            }
        }
        console.log(this.arr);
        var allotNum = 0;
        var tranferNum = 0;
        for (var key of this.arr) {
            if (key.isAllot == 0) {
                allotNum++;
            } else { break; }
        }
        for (var key of this.arr) {
            if ((key.isTransfer == 0 || key.isTransfer == null) && key.isAllot == 1) {
                tranferNum++;
            } else { break; }
        }
        if (allotNum == this.arr.length && allotNum != 0) {
            console.log('可以指派所有选中项');
            this.disSendBtn = false;
        } else {
            console.log('其中有不符合指派项');
            this.disSendBtn = true;
        }
        if (tranferNum == this.arr.length && tranferNum != 0) {
            console.log('可以转派所有选中项');
            this.disBtn = false;
        } else {
            console.log('其中有不符合转派项');
            this.disBtn = true;
        }
        if ($('input[name="repaiitem"]:checked').length + $('input[name="repaiitem"]:disabled').length == this.repairOrderInfoDtoList.length || allotNum + $('input[name="repaiitem"]:disabled').length == this.repairOrderInfoDtoList.length || tranferNum + $('input[name="repaiitem"]:disabled').length == this.repairOrderInfoDtoList.length) {
            $('input[name="alRepaiitem"]').prop('checked', true);
        } else {
            $('input[name="alRepaiitem"]').prop('checked', false);
        }
    };


    // 模态框关闭后重置复选框状态
    public closeReset() {
        this.selections = {};
        this.arr = [];
        this.disSendBtn = true;
        this.disBtn = true;
    }

    // 点击完工保存orderId
    public finished(id) {
        this.orderId = id;
    }
    // 确认完工
    public finishPro() {
        this._service.finish(this.orderId).then(res => {
            console.log(res);
            this.complete.hide();
            this.getListInfo();
        }).catch(err => {
            console.log(err);
        });
    }
}
