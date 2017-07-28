import { Component, OnInit } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidate } from '../../../privaders/fromValidate';
import { MaintenanceIncrementService } from './maintenance-increment.service';
import { orderInfo, OrderInfoDto, HangUpProjectDto, ExtraProject, RepairDto, AdviseRepair, repairProject, searchHangOrder } from '../user-service.model';

@Component({
    moduleId: module.id,
    selector: 'maintenance-increment',
    templateUrl: 'maintenance-increment.component.html',
    styleUrls: ['maintenance-increment.component.scss'],
    animations: [flyIn]
})
export class MaintenanceIncrementComponent implements OnInit {
    public newProjectForm: FormGroup;
    public newProposeForm: FormGroup;
    public hangOrderList: Array<any>;       // 挂单信息
    public hangOrderListCount: number;      // 挂单信息数量
    public searchHangParams: searchHangOrder = new searchHangOrder();   // 挂单信息参数
    public orderInfo: Array<any>;           // 工单简要信息
    public repairList: Array<any>;          // 维修项目信息
    public adviceRepairList: Array<any>;    // 建议维修项目信息
    public orderDetail: OrderInfoDto = new OrderInfoDto()   // 工单详情信息
    public orderInfoParam: orderInfo = new orderInfo();     // 查询工单简要信息的条件
    public hangProjectParam: HangUpProjectDto = new HangUpProjectDto(); // 新增工单维修增项参数
    public repairProject: RepairDto = new RepairDto();          // 新增维修项目(编辑)
    public extraProject: ExtraProject = new ExtraProject();     // 新增维修增项(编辑)
    public adviseProject: AdviseRepair = new AdviseRepair();    // 新增建议维修项目(编辑)
    public repairParam: repairProject = new repairProject();    // 查询维修项目参数
    public adviceParam: repairProject = new repairProject();    // 查询建议维修项目参数
    public isDisabledHangId: number = null;         // 暂存要作废的挂单信息Id
    public repairId: number = null;         // 暂存正要编辑的维修内容Id
    public extraId: number = null;
    public adviceId: number = null;
    public price = [0, 0, 100];             // 暂存工时、单价、折扣率，以便计算金额
    public isChange: boolean = true;        // 提交增项按钮可否点击
    public isTabs: boolean = true;          // 默认选项卡和总计不展示，当选择挂单信息或工单信息后展示选项卡和总计
    public isSaveExtra: boolean = false;
    public idCollapsed: boolean = true;     // input框下拉列表控制器
    public repairCollapsed: boolean = true;
    public adviceCollapsed: boolean = true;
    public totalItems = [0, 0, 0];          // 信息列表的数量，以便控制下拉列表中的分页条的分页数量
    public priceCount = { 'hourPrice': 0, 'discountPrice': 0, 'amountPrice': 0 };   // 工时费,材料费,优惠,应付
    public infoTotal = [0, 0, 0];

    public isShow: boolean = false;

    constructor(
        public _miService: MaintenanceIncrementService,
        public fb: FormBuilder
    ) {
        this.newProjectFormInit();
        this.newProposeFormInit();
    }

    ngOnInit() {
        this.loadHandOrder();
        this.loadOrderInfo();
        this.loadRepairProject('');
    }

    // 加载挂单信息
    private loadHandOrder() {
        this._miService.getHangOrderList(this.searchHangParams).then(res => {
            console.log('挂单信息   ', res);
            this.hangOrderList = res.result;
            this.hangOrderListCount = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    // 挂单作废
    private hangDisabled(flag, info) {
        if (flag == 1) {                        // flag=1 保存要删除的挂单Id，同时页面上出现提示挂单作废信息
            this.isDisabledHangId = info;
        } else if (flag == 2 && this.isDisabledHangId) {    // flag=2 并且 挂单Id存在，进行挂单作废
            this._miService.deleteHangOrder(this.isDisabledHangId).then(res => {
                console.log('挂单作废   ', res);
                this.loadHandOrder();
                this.cencelhangDisabled();
            }).catch(err => {
                console.log(err);
            })
        }
    }
    // 取消挂单作废
    private cencelhangDisabled() {
        this.isDisabledHangId = null;
    }

    // 根据车牌号或工单编号查询工单简要信息
    private loadOrderInfo(temp?) {
        this._miService.getOrderInfo(this.orderInfoParam).then(res => {
            // console.log('简要信息   ', res);
            this.orderInfo = res.result;
            this.totalItems[0] = res.totalCount;
            if (temp == 'id') {
                this.totalItems[0] == 0 ? this.idCollapsed = true : this.idCollapsed = false;
            }
        }).catch(err => {
            console.log(err);
        })
    }
    // 根据工单Id查询工单详情
    private loadHangOrderDetail(order, temp) {
        this.isShow = !this.isShow;
        let params = {};
        if (temp == 'orderNo') {
            let flag = { 'orderNo': order };
            params = flag;
        } else {
            let flag = { 'orderId': order };
            params = flag;
        }
        this._miService.getHangOrderByOrderId(params).then(res => {
            console.log('工单详情   ', res);
            this.clearInfo();
            this.isShow = false;
            this.orderDetail = res.result;
            this.hangProjectParam.orderId = res.result.orderId;
            res.result.repairOrderInfoDtos && res.result.repairOrderInfoDtos.forEach((item, key) => {
                this.hangProjectParam.repairDtos.push(new RepairDto());
                this.hangProjectParam.repairDtos[key].hang = item.hang;
                this.hangProjectParam.repairDtos[key].discount = item.discount;
                this.hangProjectParam.repairDtos[key].hourPrice = item.hourPrice;
                this.hangProjectParam.repairDtos[key].orderId = item.orderId;
                this.hangProjectParam.repairDtos[key].projectName = item.projectName;
                this.hangProjectParam.repairDtos[key].repairHour = item.repairHour;
                this.hangProjectParam.repairDtos[key].repairProjectId = item.repairProjectId;
                this.hangProjectParam.repairDtos[key].repairType = item.repairType;
                this.hangProjectParam.repairDtos[key].totalCount = item.totalCount;
            })
            this.infoTotal[0] = this.hangProjectParam.repairDtos.length;
            if (res.result.haveExtra) {     // 根据工单Id查询额外维修项目列表
                this._miService.getExtraProject({ 'orderId': res.result.orderId }).then(res => {
                    console.log('附加项目   ', res);
                    res.result.forEach((item, key) => {
                        this.hangProjectParam.stExtraProjects.push(new ExtraProject());
                        this.hangProjectParam.stExtraProjects[key].isHang = item.isHang;
                        this.hangProjectParam.stExtraProjects[key].projectContent = item.projectContent;
                        this.hangProjectParam.stExtraProjects[key].orderId = item.orderId;
                    });
                    this.infoTotal[1] = this.hangProjectParam.stExtraProjects.length;
                }).catch(err => {
                    console.log(err);
                })
            }
            if (res.result.haveAdviseRepairProject) {  // 根据工单Id查询建议维修项目
                this._miService.getAdviceProject({ 'orderId': res.result.orderId }).then(res => {
                    console.log('建议维修   ', res);
                    res.result.forEach((item, key) => {
                        this.hangProjectParam.stAdviseRepairProjects.push(new AdviseRepair());
                        this.hangProjectParam.stAdviseRepairProjects[key].hang = item.hang;
                        this.hangProjectParam.stAdviseRepairProjects[key].projectId = item.projectId;
                        this.hangProjectParam.stAdviseRepairProjects[key].projectName = item.projectName;
                        this.hangProjectParam.stAdviseRepairProjects[key].remark = item.remark;
                        this.hangProjectParam.stAdviseRepairProjects[key].orderId = item.orderId;
                    })
                    this.infoTotal[2] = this.hangProjectParam.stAdviseRepairProjects.length;
                }).catch(err => {
                    console.log(err);
                })
            }
            console.log('2222', this.hangProjectParam, this.infoTotal);
            this.priceCountChange();
            this.isTabs = false;
        }).catch(err => {
            console.log(err);
        })
    }
    // 查询所有维修项目
    private loadRepairProject(temp, isEdit?) {
        this._miService.getRepairProject(temp == 'repair' ? this.repairParam : this.adviceParam).then(res => {
            console.log('维修项目   ', res);
            if (temp == 'repair') {
                this.repairList = res.result;
                this.totalItems[1] = res.totalCount;
            } else if (temp == 'advice') {
                this.adviceRepairList = res.result;
                this.totalItems[2] = res.totalCount;
            } else {
                this.repairList = this.adviceRepairList = res.result;
                this.totalItems[1] = this.totalItems[2] = res.totalCount;
            }
            if (isEdit == 'repair') {
                this.totalItems[1] == 0 ? this.repairCollapsed = true : this.repairCollapsed = false;
            } else if (isEdit == 'advice') {
                this.totalItems[2] == 0 ? this.adviceCollapsed = true : this.adviceCollapsed = false;
            }
        }).catch(err => {
            console.log(err);
        })
    }
    // 设置下拉列表的展示与收缩
    private isCollapsed(temp) {
        if (temp == 'id') {
            this.totalItems[0] == 0 ? this.idCollapsed = true : this.idCollapsed = false;
        } else if (temp == 'repair') {
            this.totalItems[1] == 0 ? this.repairCollapsed = true : this.repairCollapsed = false;
        } else {
            this.totalItems[2] == 0 ? this.adviceCollapsed = true : this.adviceCollapsed = false;
        }
    }
    // 根据输入即时查询相关车辆信息
    private reloadCarsInfo(event, temp) {
        if (temp == 'id') {
            this.orderInfoParam.condition = event.target.value;
            this.loadOrderInfo(temp);
        } else if (temp == 'repair') {
            this.repairParam.projectName = event.target.value;
            this.loadRepairProject(temp, 'repair');
        } else {
            this.adviceParam.projectName = event.target.value;
            this.loadRepairProject(temp, 'advice');
        }
    }
    // 在车辆信息列表中选中信息，并填入input
    private selectCarsInfo(item, temp?) {
        if (temp == 'id') {
            this.idCollapsed = true;
            this.orderInfoParam.condition = item.carNo;
            this.loadOrderInfo();
            this.loadHangOrderDetail(item.orderId, 'orderId');
        } else {
            if (temp == 'repair') {
                this.repairCollapsed = true;
                this.repairProject.repairProjectId = item.projectId;
                this.newProjectForm.patchValue({ projectName: item.projectName });
                this.newProjectForm.patchValue({ repairType: item.repairId });
                this.repairParam.projectName = item.projectName;
            } else {
                this.adviceCollapsed = true;
                this.adviseProject.projectId = item.projectId;
                this.newProposeForm.patchValue({ projectName: item.projectName });
                this.adviceParam.projectName = item.projectName;
            }
            this.loadRepairProject(temp);
        }
    }
    // 分页条页数更改
    private pageChanged(event, temp) {
        if (temp == 'hang') {
            this.searchHangParams.setPage(event.page);
            this.loadHandOrder();
        } else if (temp == 'id') {
            this.orderInfoParam.setPage(event.page);
            this.loadOrderInfo();
        } else {
            if (temp == 'repair') {
                this.repairParam.setPage(event.page);
            } else {
                this.adviceParam.setPage(event.page);
            }
            this.loadRepairProject(temp);
        }
    }

    // 暂存工时、单价、折扣率，以便计算金额
    private priceChange(event, temp) {
        if (temp == 'repairHour') {
            this.price[0] = event.target.value;
        } else if (temp == 'hourPrice') {
            this.price[1] = event.target.value;
        } else {
            this.price[2] = event.target.value;
        }
        if (this.price[0] && this.price[1] && this.price[2]) {
            this.newProjectForm.patchValue({ totalCount: (this.price[0] * this.price[1] * this.price[2] * 0.01).toFixed(2) });
        }
    }
    // 增加一条维修项目，工时、优惠、应收随之更新
    private priceCountChange() {
        this.priceCount = { 'hourPrice': 0, 'discountPrice': 0, 'amountPrice': 0 };// 工时费,优惠,应付
        if (this.hangProjectParam.repairDtos) {
            this.hangProjectParam.repairDtos.forEach(elem => {
                this.priceCount.hourPrice += Math.round(elem.repairHour * elem.hourPrice * 100) / 100;
                this.priceCount.discountPrice += Math.round(elem.repairHour * elem.hourPrice * (1 - elem.discount * 0.01) * 100) / 100;
                this.priceCount.amountPrice += Math.round(elem.totalCount * 100) / 100;
            });
        }
    }
    // 编辑新增加的工单维修、附加、建议维修信息
    private saveProjectId(temp, id) {
        if (temp == 'repair') {
            this.repairId = id;
            this.repairProject = this.hangProjectParam.repairDtos[this.repairId];
            this.price[0] = this.hangProjectParam.repairDtos[this.repairId].repairHour;
            this.price[1] = this.hangProjectParam.repairDtos[this.repairId].hourPrice;
            this.price[2] = this.hangProjectParam.repairDtos[this.repairId].discount;
            this.newProjectFormInit();
        } else if (temp == 'extra') {
            this.extraId = id;
            this.extraProject = this.hangProjectParam.stExtraProjects[this.extraId];
        } else {
            this.adviceId = id;
            this.adviseProject = this.hangProjectParam.stAdviseRepairProjects[this.adviceId];
            this.newProposeFormInit();
        }
    }
    // 删除新增加的工单维修、附加、建议维修信息
    private orderInfoDelete(temp, id) {
        if (temp == 'repair') {
            this.hangProjectParam.repairDtos.splice(id, 1);
        } else if (temp == 'extra') {
            this.hangProjectParam.stExtraProjects.splice(id, 1);
            this.isSaveExtra = false;
        } else {
            this.hangProjectParam.stAdviseRepairProjects.splice(id, 1);
        }
        console.log(this.hangProjectParam);
        if (this.hangProjectParam.repairDtos.length == this.infoTotal[0] && this.hangProjectParam.stExtraProjects.length == this.infoTotal[1] && this.hangProjectParam.stAdviseRepairProjects.length == this.infoTotal[2]) {
            this.isChange = true;
        }
        temp == 'repair' && this.priceCountChange();
    }

    // 保存新增维修项目信息
    private saveNewProject(temp) {
        if (temp == 'repair') {
            if (this.repairId != null) {
                this.hangProjectParam.repairDtos[this.repairId] = this.newProjectForm.value;
                this.hangProjectParam.repairDtos[this.repairId].orderId = this.orderDetail.orderId;
                this.hangProjectParam.repairDtos[this.repairId].repairProjectId = this.repairProject.repairProjectId;
                this.hangProjectParam.repairDtos[this.repairId].hang = true;
            } else {
                this.hangProjectParam.repairDtos.push(this.newProjectForm.value);
                this.hangProjectParam.repairDtos[this.hangProjectParam.repairDtos.length - 1].orderId = this.orderDetail.orderId;
                this.hangProjectParam.repairDtos[this.hangProjectParam.repairDtos.length - 1].repairProjectId = this.repairProject.repairProjectId;
                this.hangProjectParam.repairDtos[this.hangProjectParam.repairDtos.length - 1].hang = true;
            }
            this.priceCountChange();
        } else if (temp == 'extra') {
            if (this.extraId != null) {
                this.hangProjectParam.stExtraProjects[this.extraId] = this.extraProject;
                this.hangProjectParam.stExtraProjects[this.extraId].orderId = this.orderDetail.orderId;
                this.hangProjectParam.stExtraProjects[this.extraId].isHang = true;
            } else {
                this.hangProjectParam.stExtraProjects.push(this.extraProject);
                this.hangProjectParam.stExtraProjects[this.hangProjectParam.stExtraProjects.length - 1].orderId = this.orderDetail.orderId
                this.hangProjectParam.stExtraProjects[this.hangProjectParam.stExtraProjects.length - 1].isHang = true;
            }
            this.isSaveExtra = true;
        } else {
            if (this.adviceId != null) {
                this.hangProjectParam.stAdviseRepairProjects[this.adviceId] = this.newProposeForm.value;
                this.hangProjectParam.stAdviseRepairProjects[this.adviceId].orderId = this.orderDetail.orderId;
                this.hangProjectParam.stAdviseRepairProjects[this.adviceId].projectId = this.adviseProject.projectId;
                this.hangProjectParam.stAdviseRepairProjects[this.adviceId].hang = true;
            } else {
                this.hangProjectParam.stAdviseRepairProjects.push(this.newProposeForm.value);
                this.hangProjectParam.stAdviseRepairProjects[this.hangProjectParam.stAdviseRepairProjects.length - 1].orderId = this.orderDetail.orderId;
                this.hangProjectParam.stAdviseRepairProjects[this.hangProjectParam.stAdviseRepairProjects.length - 1].projectId = this.adviseProject.projectId;
                this.hangProjectParam.stAdviseRepairProjects[this.hangProjectParam.stAdviseRepairProjects.length - 1].hang = true;
            }
        }
        this.isChange = false;
        // this.isSave = true;
        this.cencelNewProject(temp);
    }
    // 取消保存新增维修项目信息
    private cencelNewProject(temp) {
        if (temp == 'repair') {
            this.repairCollapsed = true;
            this.repairProject = new RepairDto();
            this.repairId = null;
            this.repairParam = new repairProject();
            this.loadRepairProject(temp);
            this.newProjectFormInit();
            this.price = [0, 0, 100];
        } else if (temp == 'extra') {
            this.extraProject = new ExtraProject();
            this.extraId = null;
        } else {
            this.adviceCollapsed = true;
            this.adviseProject = new AdviseRepair();
            this.adviceId = null;
            this.adviceParam = new repairProject();
            this.loadRepairProject(temp);
            this.newProposeFormInit();
        }
    }

    // 提交增项
    private saveHangProject() {
        this._miService.addHangProject(this.hangProjectParam).then(res => {
            console.log('增项   ', res);
            this.orderInfoParam = new orderInfo();
            this.clearInfo();
        }).catch(err => {
            console.log(err);
        })
    }
    // 挂单操作
    private saveHangOrder() {
        this.hangProjectParam.carNo = this.orderDetail.carNo;
        this.hangProjectParam.customerName = this.orderDetail.name;
        this.hangProjectParam.orderNo = this.orderDetail.orderNo;
        console.log('1111', this.hangProjectParam)
        this._miService.setHangUpProject(this.hangProjectParam).then(res => {
            console.log('挂单   ', res);
            this.orderInfoParam = new orderInfo();
            this.clearInfo();
        }).catch(err => {
            console.log(err);
        })
    }
    // 提交增项或挂单重新初始化页面
    private clearInfo() {
        this.orderDetail = new OrderInfoDto();
        this.hangProjectParam = new HangUpProjectDto();
        this.priceCount = { 'hourPrice': 0, 'discountPrice': 0, 'amountPrice': 0 };
        this.infoTotal = [0, 0, 0];
        this.isChange = true;
        this.isSaveExtra = false;
        this.loadHandOrder();
    }

    // 表单验证
    private selectRepairType(event) {
        this.newProjectForm.patchValue({ repairType: event.target.value });
    }
    public newProjectFormInit() {
        this.newProjectForm = this.fb.group({
            projectName: [this.repairProject.projectName, Validators.required],
            repairType: [this.repairProject.repairType, Validators.required],
            repairHour: [this.repairProject.repairHour, Validators.required],
            hourPrice: [this.repairProject.hourPrice, [
                Validators.required,
                Validators.pattern(/^[1-9]\d{0,9}$/)
            ]],
            discount: [this.repairProject.discount, [
                Validators.required,
                Validators.pattern(/^(100|[1-9][0-9]|[0-9])$/)
            ]],
            totalCount: [this.repairProject.totalCount]
        })
        FormValidate.onValueChanged(this.newProjectForm, this.newProjectFormErrors);
    }
    public newProposeFormInit() {
        this.newProposeForm = this.fb.group({
            projectName: [this.adviseProject.projectName, Validators.required],
            remark: [this.adviseProject.remark]
        })
        FormValidate.onValueChanged(this.newProposeForm, this.newProposeFormErrors);
    }
    // 验证错误信息
    public newProjectFormErrors = {
        'projectName': {
            'required': '维修项目名称不能为空'
        },
        'repairType': {
            'required': '项目类型不能为空'
        },
        'repairHour': {
            'required': '维修工时不能为空'
        },
        'hourPrice': {
            'required': '工时单价不能为空',
            'pattern': '无效的工时单价'
        },
        'discount': {
            'required': '折扣率不能为空',
            'pattern': '折扣率必须得是0~100之间的整数'
        },
        'totalCount': {}
    }
    public newProposeFormErrors = {
        'projectName': {
            'required': '维修项目名称不能为空'
        },
        'remark': {}
    }
}