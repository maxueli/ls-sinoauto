import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { FormValidate } from '../../../privaders/fromValidate';
import { UserInfo, CarBrand, CarSeries, CarModel, ParamDto, CarModelInfoDto, RepairProjectDto, repairProject, PreviewOrderDto, DetailProjectDto, DetailRepairPackDto } from '../user-service.model';
import { CreatGdService } from './creat-gd.service';

@Component({
    moduleId: module.id,
    selector: 'creat-gd',
    templateUrl: 'creat-gd.component.html',
    styleUrls: ['creat-gd.component.scss'],
    animations: [flyIn]
})
export class CreatGdComponent implements OnInit, DoCheck {
    creatForm: FormGroup;
    newProjectForm: FormGroup;
    public totalItems = [0, 0, 0, 0];
    public createParams: ParamDto = new ParamDto();                         // 创建工单参数
    public createModelParams: CarModelInfoDto = new CarModelInfoDto();      // 创建工单品牌、车系、车型参数
    public repairSearchParam: repairProject = new repairProject();          // 维修项目查询参数
    public repairProjectParams: RepairProjectDto = new RepairProjectDto();  // 新增维修项目参数
    public userParams: UserInfo = new UserInfo();                           // 手机、车主即查参数
    public brandParams: CarBrand = new CarBrand();                          // 品牌、车系、车型即查参数
    public seriesParams: CarSeries = new CarSeries();
    public modelParams: CarModel = new CarModel();
    public previewOrder: PreviewOrderDto = new PreviewOrderDto();           // 预检单信息
    public projectOrder: Array<DetailProjectDto>;                           // 上次维修记录信息
    public projectRepairOrder: Array<DetailRepairPackDto>;                  // 上次维修记录子信息
    public priceCount = { 'hourPrice': 0, 'materialsPrice': 0, 'discountPrice': 0, 'amountPrice': 0 };// 工时费,材料费,优惠,应付
    public hangOrderList: Array<any>;           // 挂单信息
    public hangOrderListCount: number;          // 挂单数量
    public userInfoList: Array<any>;            // 客户信息列表
    public carsBrandList: Array<any>;           // 品牌，车系，车型列表
    public carsSeriesList: Array<any>;
    public carsModelList: Array<any>;
    public repairList: Array<any>;              // 维修项目信息
    public carNoCollapsed: boolean = true;      // 手机，车主，品牌，车系，车型下拉列表控制标识  
    public nameCollapsed: boolean = true;
    public brandCollapsed: boolean = true;
    public seriesCollapsed: boolean = true;
    public modelCollapsed: boolean = true;
    public repairCollapsed: boolean = true;
    public isRepairProject: boolean = false;    // 是否有上次维修记录
    public isPreview: boolean = false;          // 是否有预检单
    public isCreate: boolean = true;            // 是否可以生成工单
    public isCreateLoad: boolean = true;        // 生成工单操作标识
    public isHangUp: boolean = true;            // 是否可以挂单
    public isHangUpLoad: boolean = true;        // 挂单操作标识
    public price = [0, 0, 100];                 // 暂存新增维修项目的工时，单价，折扣信息
    public repairId: number;                    // 暂存要编辑的维修项目Id
    public defDate;                             // 初始化默认预计交车时间
    public minDate = new Date();
    public isDisabledHangId: number;            // 挂单作废ID
    public isOldData: boolean;

    constructor(
        public _service: CreatGdService,
        public fb: FormBuilder
    ) {
        this.creatFormInit();
        this.newProjectFormInit();
    }

    ngOnInit() {
        this.loadHandOrder();
        this.loadUserInfo();
        this.loadRepair();
        this.loadCarSeries();
        this.loadCarModel();
        this.loadCarBrand();
    }
    ngDoCheck() {
        if (this.creatForm.valid && this.createParams.projectParamDtos.length > 0) {
            this.isCreate = false;
        } else {
            this.isCreate = true;
        }
    }

    // 加载挂单信息
    private loadHandOrder() {
        this._service.getHangOrderList().then(res => {
            // console.log('挂单信息   ', res);
            this.hangOrderList = res.result;
            this.hangOrderListCount = res.result.length;
        }).catch(err => {
            console.log(err);
        })
    }
    // 挂单作废
    private hangDisabled(flag, info) {
        if (flag == 1) {                        // flag=1 保存要删除的挂单Id，同时页面上出现提示挂单作废信息
            this.isDisabledHangId = info;
        } else if (flag == 2 && this.isDisabledHangId) {    // flag=2 并且 挂单Id存在，进行挂单作废
            console.log('挂单作废');
            this._service.deleteHangOrder(this.isDisabledHangId).then(res => {
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

    // 根据hangId 查询工单详情
    private loadHangOrderDetail(hangId) {
        this.createParams = new ParamDto();
        this._service.getHangDetail({ 'hangId': hangId }).then(res => {
            console.log('挂单详情res   ', res.result);
            this.createParams = res.result;
            res.result.projectParamDtos == null && (this.createParams.projectParamDtos = new Array<RepairProjectDto>());// 若无维修信息,则初始化维修信息
            res.result.modelInfoDto == null ? this.createParams.modelInfoDto = new CarModelInfoDto() : this.setDefCarsInfo(res.result.modelInfoDto);// 若没有车辆信息,则初始化车辆信息
            this.creatForm.patchValue({ 'estimatedDeliveryTime': this.createParams.estimatedDeliveryTime });
            this.creatForm.get('carNo').disable();
            this.creatForm.get('name').disable();
            this.creatForm.get('mobile').disable();
            this.creatForm.get('brandName').disable();
            this.creatForm.get('seriesName').disable();
            this.creatForm.get('modelName').disable();
            this.userParams.condition = res.result.carNo;
            this.loadUserInfo();
            this.priceCountChange();
            this.setCreateFormInit();
        }).catch(err => {
            console.log(err);
        })
    }
    // 根据carId 查询工单详情
    private loadUserDetail(carId) {
        this.createParams = new ParamDto();
        this.previewOrder = new PreviewOrderDto();
        this._service.getUserDetail({ 'carId': carId }).then(res => {
            console.log('工单详情res   ', res.result);
            this.createParams.carId = res.result.carId;
            this.createParams.carNo = res.result.carNo;
            this.createParams.name = res.result.name;
            this.createParams.mobile = res.result.mobile;
            this.createParams.modelId = res.result.modelId;
            this.createParams.modelInfoDto = res.result.modelInfoDto || new CarModelInfoDto();
            res.result.modelInfoDto ? (this.createParams.modelInfoDto = res.result.modelInfoDto, this.setDefCarsInfo(res.result.modelInfoDto)) : this.createParams.modelInfoDto = new CarModelInfoDto();
            this.createParams.projectParamDtos = new Array<RepairProjectDto>();
            this.createParams.lastInFactoryMileage = res.result.lastInFactoryMileage;
            this.createParams.lastInFactoryTime = res.result.lastInFactoryTime;
            this.createParams.repairName = res.result.repairName;
            this.createParams.repairMobile = res.result.repairMobile;
            this.createParams.sourceChannel = res.result.sourceChannel;
            this.createParams.vin = res.result.vin;
            // 获得上次维修记录（维修项目，维修配件）
            this.projectOrder = Array<DetailProjectDto>();
            this.projectRepairOrder = Array<DetailRepairPackDto>();
            res.result.detailProjectDtos.forEach(elem => {
                this.projectOrder.push(elem);
                if (elem.repairPackDtos != null && elem.repairPackDtos.length > 0) {
                    elem.repairPackDtos.forEach(element => {
                        this.projectRepairOrder.push(element);
                    });
                }
            });
            this.projectOrder.length ? this.isRepairProject = true : this.isRepairProject = false;
            // 获得预检单
            if (res.result.previewOrderDto != null) {
                this.isPreview = true;
                this.previewOrder = res.result.previewOrderDto;
                // this.previewOrder.picUrl.length && (this.previewOrder.picUrl = new Array<string>());
                this.createParams.previewId = res.result.previewOrderDto.previewId;
            }
            // 判断是否可挂单
            if (this.createParams.carNo && this.createParams.name && this.createParams.mobile && this.createParams.modelId) {
                this.isHangUp = false;
            } else {
                this.isHangUp = true;
            }
            console.log('工单详情   ', this.createParams, this.projectOrder);
            this.setCreateFormInit();
        }).catch(err => {
            console.log(err);
        })
    }
    // 若查询出工单详情则初始化creatForm
    private setCreateFormInit() {
        this.createParams.carNo && this.creatForm.patchValue({ carNo: this.createParams.carNo });
        this.createParams.name && this.creatForm.patchValue({ name: this.createParams.name });
        this.createParams.mobile && this.creatForm.patchValue({ mobile: this.createParams.mobile });
        this.createParams.modelInfoDto.brandName && this.creatForm.patchValue({ brandName: this.createParams.modelInfoDto.brandName });
        this.createParams.modelInfoDto.seriesName && this.creatForm.patchValue({ seriesName: this.createParams.modelInfoDto.seriesName });
        this.createParams.modelInfoDto.modelName && this.creatForm.patchValue({ modelName: this.createParams.modelInfoDto.modelName });
        this.createParams.lastInFactoryMileage && this.creatForm.patchValue({ lastInFactoryMileage: this.createParams.lastInFactoryMileage });
        this.createParams.lastInFactoryTime && this.creatForm.patchValue({ lastInFactoryTime: this.createParams.lastInFactoryTime });
        this.createParams.repairName && this.creatForm.patchValue({ repairName: this.createParams.repairName });
        this.createParams.repairMobile && this.creatForm.patchValue({ repairMobile: this.createParams.repairMobile });
        this.createParams.sourceChannel && this.creatForm.patchValue({ sourceChannel: this.createParams.sourceChannel });
        this.createParams.vin && this.creatForm.patchValue({ vin: this.createParams.vin });
        this.createParams.driveMileage && this.creatForm.patchValue({ driveMileage: this.createParams.driveMileage });
        this.createParams.recommender && this.creatForm.patchValue({ recommender: this.createParams.recommender });
        this.createParams.recommenderMobile && this.creatForm.patchValue({ recommenderMobile: this.createParams.recommenderMobile });
        this.createParams.vehicleDate && this.creatForm.patchValue({ vehicleDate: this.createParams.vehicleDate });
        this.createParams.repairType && this.creatForm.patchValue({ repairType: this.createParams.repairType });
        this.createParams.repairStation && this.creatForm.patchValue({ repairStation: this.createParams.repairStation });
        this.createParams.nextMaintainDate && this.creatForm.patchValue({ nextMaintainDate: this.createParams.nextMaintainDate });
        this.createParams.nextMileage && this.creatForm.patchValue({ nextMileage: this.createParams.nextMileage });
    }
    // 若查询出工单详情则初始化车辆相关下拉列表数据
    private setDefCarsInfo(modelInfoDto) {
        this.brandParams.brandName = modelInfoDto.brandName;
        this.loadCarBrand();
        this.seriesParams.brandId = modelInfoDto.brandId;
        this.loadCarSeries();
        this.modelParams.seriesId = modelInfoDto.seriesId;
        this.loadCarModel();
    }

    // 加载客户信息
    private loadUserInfo(temp?) {
        this._service.getUserInfo(this.userParams).then(res => {
            // console.log('客户信息   ', res.result);
            this.userInfoList = res.result;
            this.totalItems[0] = res.totalCount;
            if (temp == 'name') {
                this.nameCollapsed = res.totalCount == 0
            } else if (temp == 'carNo') {
                this.carNoCollapsed = res.totalCount == 0
            }
        }).catch(err => {
            console.log(err);
        })
    }
    // 查询所有维修项目
    private loadRepair() {
        this._service.getRepairProject(this.repairSearchParam).then(res => {
            // console.log('维修项目   ', res);
            this.repairList = res.result;
            this.totalItems[4] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    // 加载车辆品牌、车系、车型信息
    private loadCarBrand() {
        this._service.getCarBrand(this.brandParams).then(res => {
            // console.log('品牌信息   ', res);
            this.carsBrandList = res.result;
            this.totalItems[1] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    private loadCarSeries() {
        this._service.getCarSeries(this.seriesParams).then(res => {
            // console.log('车系信息   ', res);
            this.carsSeriesList = res.result;
            this.totalItems[2] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    private loadCarModel() {
        this._service.getCarModel(this.modelParams).then(res => {
            // console.log('车型信息   ', res);
            this.carsModelList = res.result;
            this.totalItems[3] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    private isCollapsed(temp, value?) {
        if (temp == 'brand') {
            this.totalItems[1] == 0 ? this.brandCollapsed = true : this.brandCollapsed = false, this.nameCollapsed = this.carNoCollapsed = this.seriesCollapsed = this.modelCollapsed = true;
        } else if (temp == 'series') {
            this.totalItems[2] == 0 ? this.seriesCollapsed = true : this.seriesCollapsed = false, this.nameCollapsed = this.brandCollapsed = this.carNoCollapsed = this.modelCollapsed = true;
        } else if (temp == 'model') {
            this.totalItems[3] == 0 ? this.modelCollapsed = true : this.modelCollapsed = false, this.nameCollapsed = this.brandCollapsed = this.seriesCollapsed = this.carNoCollapsed = true;
        } else if (temp == 'repair') {
            this.totalItems[4] == 0 ? this.repairCollapsed = true : this.repairCollapsed = false;
        } else if (temp == 'carNo') {
            this.totalItems[0] == 0 ? this.carNoCollapsed = true : this.carNoCollapsed = false, this.nameCollapsed = this.brandCollapsed = this.seriesCollapsed = this.modelCollapsed = true;
        } else if (temp == 'name') {
            this.totalItems[0] == 0 ? this.nameCollapsed = true : this.nameCollapsed = false, this.carNoCollapsed = this.brandCollapsed = this.seriesCollapsed = this.modelCollapsed = true;
        }
    }
    // 根据输入即时查询相关车辆信息
    private reloadCarsInfo(event, temp) {
        if (temp == 'brand') {
            this.brandParams.brandName = event.target.value;
            this.creatForm.get('seriesName').disable();
            this.loadCarBrand();
        } else if (temp == 'series') {
            this.seriesParams.seriesName = event.target.value;
            this.creatForm.get('modelName').disable();
            this.loadCarSeries();
        } else if (temp == 'model') {
            this.modelParams.modelName = event.target.value;
            this.loadCarModel();
        } else if (temp == 'repair') {
            this.repairSearchParam.projectName = event.target.value;
            this.loadRepair();
        } else if (temp == 'carNo' || temp == 'name') {
            if (event.target.value == '') {
                this.userParams = new UserInfo();
                this.creatForm.get('name').enable();
                this.creatForm.get('carNo').enable();
                this.creatForm.get('mobile').enable();
                this.creatForm.get('brandName').enable();
                this.creatForm.get('seriesName').disable();
                this.creatForm.get('modelName').disable();
                if (this.isOldData) {
                    this.createParams = new ParamDto();
                    this.creatForm.reset();
                    this.isOldData = false;
                }
            } else {
                this.userParams.condition = event.target.value;
            }
            this.loadUserInfo(temp);
        }
    }
    // 在车辆信息列表中选中信息，并填入input
    private selectCarsInfo(item, temp) {
        if (temp == 'brand') {
            this.brandCollapsed = true;
            this.createParams.modelInfoDto.brandId = this.seriesParams.brandId = item.key;
            this.creatForm.patchValue({ brandName: item.value });
            this.creatForm.patchValue({ seriesName: null });
            this.creatForm.patchValue({ modelName: null });
            this.creatForm.get('brandName').enable();
            this.creatForm.get('seriesName').enable();
            this.loadCarSeries();
        } else if (temp == 'series') {
            this.seriesCollapsed = true;
            this.createParams.modelInfoDto.seriesId = this.modelParams.seriesId = item.key;
            this.creatForm.patchValue({ seriesName: item.value });
            this.creatForm.patchValue({ modelName: null });
            this.creatForm.get('seriesName').enable();
            this.creatForm.get('modelName').enable();
            this.loadCarModel();
        } else if (temp == 'model') {
            this.modelCollapsed = true;
            this.createParams.modelId = item.key;
            this.creatForm.patchValue({ modelName: item.value });
            this.creatForm.get('modelName').enable();
            this.customerMobileChange();
        } else if (temp == 'repair') {
            this.repairCollapsed = true;
            this.repairProjectParams.projectId = item.projectId;
            this.newProjectForm.patchValue({ projectName: item.projectName });
            this.newProjectForm.patchValue({ repairId: item.repairId });
            this.newProjectForm.get('repairId').disable();
            this.repairSearchParam.projectName = item.projectName;
            this.loadRepair();
        } else {
            if (temp == 'carNo') {
                this.carNoCollapsed = true;
                this.userParams.condition = item.carNo;
                this.creatForm.patchValue({ carNo: item.carNo });
                this.creatForm.get('carNo').enable();
                this.creatForm.get('name').disable();
            } else if (temp == 'name') {
                this.nameCollapsed = true;
                this.userParams.condition = item.name;
                this.creatForm.patchValue({ name: item.name });
                this.creatForm.patchValue({ repairName: item.name });   // 车主姓名更改后同步更改送修人姓名
                this.creatForm.get('name').enable();
                this.creatForm.get('carNo').disable();
            }
            this.isOldData = true;
            this.creatForm.get('mobile').disable();
            this.creatForm.get('brandName').disable();
            this.creatForm.get('seriesName').disable();
            this.creatForm.get('modelName').disable();
            this.loadUserInfo();
            this.loadUserDetail(item.carId);
        }
    }
    // 车主/手机号更改后同步更改送修人/手机号
    private customerMobileChange(event?, temp?) {
        if (temp == 'name') {
            this.creatForm.patchValue({ repairName: event.target.value });
        } else if (temp == 'mobile') {
            this.creatForm.patchValue({ repairMobile: event.target.value });
        }
        if (this.creatForm.controls.carNo.valid && this.creatForm.controls.name.valid && this.creatForm.controls.mobile.valid && this.creatForm.controls.modelName.valid) {
            this.isHangUp = false;
        } else {
            this.isHangUp = true;
        }
        console.log(this.creatForm.controls.carNo.valid, this.creatForm.controls.name.valid, this.creatForm.controls.mobile.valid, this.creatForm.controls.modelName.valid, this.isHangUp);
    }
    // dateChange
    private dateChange(event, temp) {
        temp == 'deliveryTime' && (this.createParams.estimatedDeliveryTime = event.toString());
        temp == 'vehicleDate' && (this.createParams.vehicleDate = event.toString());
        temp == 'nextDate' && (this.createParams.nextMaintainDate = event.toString());
    }
    // mileageChange
    private mileageChange() {
        if (this.creatForm.value.nextMileage && this.creatForm.value.driveMileage) {
            Number(this.creatForm.value.nextMileage) < Number(this.creatForm.value.driveMileage) && (this.creatForm.patchValue({ 'nextMileage': this.creatForm.value.driveMileage }));
        }
    }
    // 车辆品牌、车系、车型分页条页数更改
    private pageChanged(event, temp) {
        if (temp == 'brand') {
            this.brandParams.setPage(event.page);
            this.loadCarBrand();
        } else if (temp == 'series') {
            this.seriesParams.setPage(event.page);
            this.loadCarSeries();
        } else if (temp == 'model') {
            this.modelParams.setPage(event.page);
            this.loadCarModel();
        } else if (temp == 'repair') {
            this.repairSearchParam.setPage(event.page);
            this.loadRepair();
        } else {
            if (temp == 'carNo') {
                this.userParams.setPage(event.page);
            } else if (temp == 'name') {
                this.userParams.setPage(event.page);
            }
            this.loadUserInfo();
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
        this.priceCount = { 'hourPrice': 0, 'materialsPrice': 0, 'discountPrice': 0, 'amountPrice': 0 };// 工时费,材料费,优惠,应付
        if (this.createParams.projectParamDtos) {
            this.createParams.projectParamDtos.forEach(elem => {
                this.priceCount.hourPrice += Math.round(elem.repairHour * elem.hourPrice * 100) / 100;
                this.priceCount.discountPrice += Math.round(elem.repairHour * elem.hourPrice * (1 - elem.discount * 0.01) * 100) / 100;
                this.priceCount.amountPrice += Math.round(elem.totalCount * 100) / 100;
            })
        }
    }
    // 暂存要编辑的维修项目Id，同时展示该条信息
    private saveProjectId(id) {
        this.repairId = id;
        this.repairProjectParams = this.createParams.projectParamDtos[this.repairId];
        this.newProjectFormInit();
    }
    // 删除选中的维修项目
    private delProjectId(id) {
        let i = id;
        for (; i < this.createParams.projectParamDtos.length - 1; i++) {
            this.createParams.projectParamDtos[i] = this.createParams.projectParamDtos[i + 1];
        }
        i == this.createParams.projectParamDtos.length - 1 && this.createParams.projectParamDtos.length--;
        this.priceCountChange()
    }
    // 保存新增维修项目信息
    private saveNewProject() {
        if (this.repairId != null) {
            this.createParams.projectParamDtos[this.repairId] = this.newProjectForm.value;
            this.createParams.projectParamDtos[this.repairId].projectId = this.repairProjectParams.projectId;
        } else {
            let i = 0;
            for (; i < this.createParams.projectParamDtos.length; i++) {
                if (this.createParams.projectParamDtos[i].projectName == this.newProjectForm.value.projectName) {
                    break;
                }
            }
            if (i >= this.createParams.projectParamDtos.length) {
                this.createParams.projectParamDtos.push(this.newProjectForm.value);
                this.createParams.projectParamDtos[this.createParams.projectParamDtos.length - 1].projectId = this.repairProjectParams.projectId;
            }
        }
        this.priceCountChange()
        this.cencelNewProject();
    }
    // 取消保存新增维修项目信息
    private cencelNewProject() {
        this.repairProjectParams = new RepairProjectDto();
        this.repairId = null;
        this.price = [0, 0, 100];
        this.repairSearchParam = new repairProject();
        this.newProjectForm.get('repairId').enable();
        this.loadRepair();
        this.newProjectFormInit();
    }

    // 生成工单 
    private saveCreateOrder() {
        this.isCreateLoad = false;
        this.setParams();
        this._service.setCeaterOrder(this.createParams).then(res => {
            console.log(res);
            this.clearInfo();
        }).catch(err => {
            console.log(err);
        })
    }
    // 挂单
    private saveHangOrder() {
        this.isHangUpLoad = false;
        this.setParams();
        this._service.setHangOrder(this.createParams).then(res => {
            console.log(res);
            this.clearInfo();
        }).catch(err => {
            console.log(err);
        })
    }
    // 设置生成工单或挂单的参数
    private setParams() {
        for (var key in this.creatForm.value) {
            if (key == 'brandName' || key == 'seriesName' || key == 'modelName') {
                this.createParams.modelInfoDto[key] = this.creatForm.value[key];
            } else if (key != 'estimatedDeliveryTime' && key != 'vehicleDate' && key != 'nextMaintainDate') {
                this.createParams[key] = this.creatForm.value[key];
            }
        }
        console.log(this.createParams);
    }
    // 清除生成工单或挂单成功后的页面信息
    private clearInfo() {
        this.isHangUp = this.isCreateLoad = this.isHangUpLoad = true;
        this.createParams = new ParamDto();
        this.priceCount = { 'hourPrice': 0, 'materialsPrice': 0, 'discountPrice': 0, 'amountPrice': 0 };// 工时费,材料费,优惠,应付
        this.creatForm.reset();
        this.creatForm.get('seriesName').disable();
        this.creatForm.get('modelName').disable();
        this.userParams = new UserInfo();
        this.loadUserInfo();
        this.loadHandOrder();
    }

    // 表单验证
    public creatFormInit() {
        this.creatForm = this.fb.group({
            carNo: [{ 'value': this.createParams.carNo, disabled: false }, [
                Validators.required,
                Validators.pattern(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/)
            ]],
            name: [{ 'value': this.createParams.name, disabled: false }, Validators.required],
            mobile: [{ 'value': this.createParams.name, disabled: false }, [
                Validators.required,
                Validators.pattern(/^1[3578]\d{9}$/)
            ]],
            sourceChannel: [this.createParams.sourceChannel],
            brandName: [{ 'value': this.createParams.modelInfoDto.brandName, disabled: false }, Validators.required],
            seriesName: [{ 'value': this.createParams.modelInfoDto.seriesName, disabled: true }, Validators.required],
            modelName: [{ 'value': this.createParams.modelInfoDto.modelName, disabled: true }, Validators.required],
            vin: [this.createParams.vin, Validators.pattern(/^[A-Z0-9]{17}$/)],
            repairType: [this.createParams.repairType, Validators.required],
            estimatedDeliveryTime: [this.createParams.estimatedDeliveryTime],
            repairName: [this.createParams.repairName, Validators.required],
            repairMobile: [this.createParams.repairMobile, [
                Validators.required,
                Validators.pattern(/^1[3578]\d{9}$/)
            ]],
            driveMileage: [this.createParams.driveMileage, [
                Validators.required,
                Validators.pattern(/^[1-9]{1}\d{0,14}$/)
            ]],
            recommender: [this.createParams.recommender],
            recommenderMobile: [this.createParams.recommenderMobile, Validators.pattern(/^1[3578]\d{9}$/)],
            vehicleDate: [this.createParams.vehicleDate],
            repairStation: [this.createParams.repairStation],
            lastInFactoryTime: [this.createParams.lastInFactoryTime],
            lastInFactoryMileage: [this.createParams.lastInFactoryMileage],
            nextMaintainDate: [this.createParams.nextMaintainDate],
            nextMileage: [this.createParams.nextMileage, Validators.pattern(/^[1-9]{1}\d{0,14}$/)],
        })
        FormValidate.onValueChanged(this.creatForm, this.creatFormErrors);
    }
    public newProjectFormInit() {
        this.newProjectForm = this.fb.group({
            projectName: [this.repairProjectParams.projectName, Validators.required],
            repairId: [{ 'value': this.repairProjectParams.repairId, disabled: false }, Validators.required],
            repairHour: [this.repairProjectParams.repairHour, [
                Validators.required,
                Validators.pattern(/^[1-9]{1}\d{0,14}$/)
            ]],
            hourPrice: [this.repairProjectParams.hourPrice, [
                Validators.required,
                Validators.pattern(/^[1-9]{1}\d{0,9}$/)
            ]],
            discount: [this.repairProjectParams.discount, [
                Validators.required,
                Validators.pattern(/^(100|[1-9][0-9]|[0-9])$/)
            ]],
            totalCount: [this.repairProjectParams.totalCount]
        })
        FormValidate.onValueChanged(this.newProjectForm, this.newProjectFormErrors);
    }
    // 验证错误信息
    public creatFormErrors = {
        "carNo": {
            "required": "车牌号不能为空",
            "pattern": "无效的车牌号"
        },
        "name": {
            "required": "车主不能为空"
        },
        "mobile": {
            "required": "手机号不能为空",
            "pattern": "无效的手机号"
        },
        "sourceChannel": {},
        "brandName": {
            "required": "品牌不能为空"
        },
        "seriesName": {
            "required": "车系不能为空"
        },
        "modelName": {
            "required": "车型不能为空"
        },
        "vin": {
            "pattern": "无效的车辆识别码"
        },
        "repairType": {
            "required": "维修类型不能为空"
        },
        "estimatedDeliveryTime": {
            "required": "预计交车时间不能为空"
        },
        "repairName": {
            "required": "送修人不能为空"
        },
        "repairMobile": {
            "required": "送修人电话不能为空",
            "pattern": "无效的送修人电话"
        },
        "driveMileage": {
            "required": "行驶里程不能为空",
            "pattern": "无效的行驶里程"
        },
        "recommender": {},
        "recommenderMobile": {
            "pattern": "无效的介绍人电话"
        },
        "vehicleDate": {},
        "repairStation": {},
        "lastInFactoryTime": {},
        "lastInFactoryMileage": {},
        "nextMaintainDate": {},
        "nextMileage": {
            "pattern": "无效的建议下次保养里程"
        }
    }
    public newProjectFormErrors = {
        'projectName': {
            'required': '维修项目名称不能为空'
        },
        'repairId': {
            'required': '项目类型不能为空'
        },
        'repairHour': {
            'required': '维修工时不能为空',
            'pattern': '无效的维修工时'
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
}


            // if (res.result.previewOrderDto != null) {
            //     this.isPreview = true;
            //     this.previewOrder = res.result.previewOrderDto;
            //     this.createParams.previewId = res.result.previewOrderDto.previewId;
            //     res.result.previewOrderDto = null;
            // }
            // this.createParams = res.result;
            // res.result.modelInfoDto == null && (this.createParams.modelInfoDto = new CarModelInfoDto());     // 若没有车辆信息,则初始化车辆信息
            // res.result.detailProjectDtos == null && ();// 若无维修信息,则初始化维修信息

            // if (res.result.detailProjectDtos.length) {
            //     this.createParams.projectParamDtos = res.result.detailProjectDtos;
            //     for (let item in this.projectOrder) {
            //         for (var key in this.projectOrder[item].repairPackDtos) {
            //             this.projectRepairOrder.push(this.projectOrder[item].repairPackDtos[key]);
            //         }
            //     }
            //     res.result.detailProjectDtos.length = 0;
            // } else {
            //     this.createParams.projectParamDtos = new Array<RepairProjectDto>();
            // }

            // this.creatForm.setValue({
                // carNo: this.createParams.carNo,
                // name: this.createParams.name,
                // mobile: null,
                // sourceChannel: this.createParams.sourceChannel,
                // brandName: this.createParams.modelInfoDto.brandName || '',
                // seriesName: this.createParams.modelInfoDto.seriesName || '',
                // modelName: this.createParams.modelInfoDto.modelName || '',
                // vin: this.createParams.vin,
                // repairType: this.createParams.repairType || '',
                // estimatedDeliveryTime: this.defDate,
                // repairName: this.createParams.repairName || '',
                // repairMobile: null,
                // driveMileage: null,
                // recommender: null,
                // recommenderMobile: this.createParams.recommenderMobile || '',
                // vehicleDate: this.createParams.vehicleDate || '',
                // repairStation: this.createParams.repairStation || '',
                // lastInFactoryTime: this.createParams.lastInFactoryTime || '',
                // lastInFactoryMileage: this.createParams.lastInFactoryMileage || '',
                // nextMaintainDate: this.createParams.nextMaintainDate || '',
                // nextMileage: this.createParams.nextMileage || ''
            // });