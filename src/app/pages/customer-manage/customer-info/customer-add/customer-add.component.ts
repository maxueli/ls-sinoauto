import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerInfoService } from '../customer-info.service';
import { FormValidate } from '../../../../privaders/fromValidate';
import { CunstomerDetail, DetailInfo, DetailCars, CustomerSearch, CarModel, CarSeries, CarBrand } from '../../customer-manage.model';

@Component({
    moduleId: module.id,
    selector: 'customer-add',
    templateUrl: 'customer-add.component.html',
    styleUrls: ['customer-add.component.scss']
})

export class CustomerAddComponent implements OnInit {
    public customerForm: FormGroup;
    public carsForm: FormGroup;
    public getRouParam: any;
    public editLoad: boolean = true;
    public totalItems = [0, 0, 0, 0];
    public provResults: Array<any>;         // 省、市、区列表
    public cityResults: Array<any>;
    public areaResults: Array<any>;
    public areaName: Array<string>;         // 选中的省、市、区名称
    public param: CunstomerDetail = new CunstomerDetail();
    // public infoParam: DetailInfo = new DetailInfo();    // 客户信息
    public carsParam: DetailCars = new DetailCars();    // 车辆信息
    public carModelId: number;
    public searchParams: CustomerSearch = new CustomerSearch();    // 手机、车主即查参数
    public brandParams: CarBrand = new CarBrand();      // 品牌即查参数
    public seriesParams: CarSeries = new CarSeries();   // 车系即查参数
    public modelParams: CarModel = new CarModel();      // 车型即查参数
    public userList: Array<any>;        // 车主姓名、手机信息列表
    public carsBrand: Array<any>;       // 品牌，车系，车型列表
    public carsSeries: Array<any>;
    public carsModel: Array<any>;
    public mobileCollapsed: boolean = true;     // 手机，车主，品牌，车系，车型下拉列表控制标识  
    public nameCollapsed: boolean = true;
    public brandCollapsed: boolean = true;
    public seriesCollapsed: boolean = true;
    public modelCollapsed: boolean = true;
    public editCarId: number = null;        // 暂存正在更改的车辆信息Id

    constructor(
        public _route: Router,
        public _rouParam: ActivatedRoute,
        public _service: CustomerInfoService,
        public fb: FormBuilder
    ) {
        this.getRouParam = this._rouParam.snapshot.params;
        this.customerFormInit();
        this.carsFormInit();
    }

    ngOnInit() {
        this.loadCarBrand();
        // this.loadCarSeries();
        // this.loadCarModel();
        this.loadUserInfo();
        this.getRouParam.code == 1 && this.getCustomerDetail(this.getRouParam.customerId); // code=1表示当前为编辑页面，先调客户详细信息后再调省市区信息
        this.getRouParam.code == 2 && this.loadLocation();      // code=2表示当前为新增页面，直接调省市区信息， 
    }

    // 根据路由传过来的客户id查询客户详细信息
    private getCustomerDetail(customerId) {
        this._service.getCustomerDetail(customerId).then(res => {
            console.log('客户详细   ', res);
            if (res.errmsg == "success") {
                this.param.customerCars = res.result.customerCars;
                this.param.customerInfoDto = res.result.customerInfoDto;
                // this.infoParam = res.result.customerInfoDto;
                console.log(this.param);
                this.customerFormInit();
                this.loadLocation();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // 加载用户信息
    private loadUserInfo() {
        this._service.getCustomer(this.searchParams).then(res => {
            console.log('用户信息   ', res);
            this.userList = res.result;
            this.totalItems[3] = res.totalCount;
            res.totalCount == 0 && (this.mobileCollapsed = this.nameCollapsed = true);
        }).catch(err => {
            console.log(err);
        })
    }
    // 加载车辆品牌、车系、车型信息
    private loadCarBrand() {
        this._service.getCarBrand(this.brandParams).then(res => {
            console.log('品牌   ', res);
            this.carsBrand = res.result;
            this.totalItems[0] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    private loadCarSeries() {
        this._service.getCarSeries(this.seriesParams).then(res => {
            console.log('车系   ', res);
            this.carsSeries = res.result;
            this.totalItems[1] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    private loadCarModel() {
        this._service.getCarModel(this.modelParams).then(res => {
            console.log('车型   ', res);
            this.carsModel = res.result;
            this.totalItems[2] = res.totalCount;
        }).catch(err => {
            console.log(err);
        })
    }
    private isCollapsed(temp, event?) {
        if (temp == 'brand') {
            this.totalItems[0] == 0 ? this.brandCollapsed = true : this.brandCollapsed = false, this.seriesCollapsed = this.modelCollapsed = true;
        } else if (temp == 'series') {
            this.totalItems[1] == 0 ? this.seriesCollapsed = true : this.seriesCollapsed = false, this.brandCollapsed = this.modelCollapsed = true;
        } else if (temp == 'model') {
            this.totalItems[2] == 0 ? this.modelCollapsed = true : this.modelCollapsed = false, this.seriesCollapsed = this.brandCollapsed = true;
        } else if (this.getRouParam.code == 2) {
            if (temp == 'mobile') {
                this.totalItems[3] == 0 ? this.mobileCollapsed = true : this.mobileCollapsed = false, this.nameCollapsed = true;
            } else if (temp == 'name') {
                this.totalItems[3] == 0 ? this.nameCollapsed = true : this.nameCollapsed = false, this.mobileCollapsed = true;
            }
        }
    }
    // 根据输入即时查询相关车辆信息
    private reloadCarsInfo(event, temp) {
        if (temp == 'brand') {
            this.brandParams.brandName = event.target.value;
            this.loadCarBrand();
        } else if (temp == 'series') {
            this.seriesParams.seriesName = event.target.value;
            this.loadCarSeries();
        } else if (temp == 'model') {
            this.modelParams.modelName = event.target.value;
            this.loadCarModel();
        } else if (this.getRouParam.code == 2) {
            this.searchParams = new CustomerSearch();
            if (temp == 'mobile') {
                this.searchParams.mobile = event.target.value;
            } else if (temp == 'name') {
                this.searchParams.name = event.target.value;
            }
            this.loadUserInfo();
        }
    }
    // 在车辆信息列表中选中信息，并填入input
    private selectCarsInfo(id, value, temp, userId?) {
        if (temp == 'brand') {
            this.brandCollapsed = true;
            this.seriesParams.brandId = id;
            this.carsForm.patchValue({ brandName: value });
            this.carsForm.get('seriesName').enable();
            this.loadCarSeries();
        } else if (temp == 'series') {
            this.seriesCollapsed = true;
            this.modelParams.seriesId = id;
            this.carsForm.patchValue({ seriesName: value });
            this.carsForm.get('modelName').enable();
            this.loadCarModel();
        } else if (temp == 'model') {
            this.modelCollapsed = true;
            this.carModelId = id;
            this.carsForm.patchValue({ modelName: value });
        } else if (this.getRouParam.code == 2) {
            this.searchParams = new CustomerSearch();
            if (temp == 'mobile') {
                this.mobileCollapsed = true;
                this.searchParams.mobile = value;
                this.customerForm.patchValue({ mobile: value });
            } else if (temp == 'name') {
                this.nameCollapsed = true;
                this.searchParams.name = value;
                this.customerForm.patchValue({ name: value });
            }
            this.loadUserInfo();
            this.getCustomerDetail(userId);
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
        } else if (this.getRouParam.code == 2) {
            this.searchParams.setPage(event.page);
            this.loadUserInfo();
        }
    }

    // 加载地区信息，获取省市区列表，获取地址全称
    private loadLocation() {
        this._service.getlocation().then(res => {
            if (res.result.data.length > 0) {
                // console.log('省 ', res.result);
                this.provResults = res.result.data;
                if (this.getRouParam.code == 2) {
                    this.param.customerInfoDto.proId = res.result.data[0][0];
                    this.customerForm.patchValue({ proId: res.result.data[0][0] });
                }
                this.loadCitys();
            }
        }).catch(err => {
            console.log(err);
        })
    }
    private loadCitys(event?) {
        event && (this.param.customerInfoDto.proId = event.target.value);
        this.cityResults = this.areaResults = null;
        this.areaName = [];
        for (let item of this.provResults) {
            if (item[0] == this.param.customerInfoDto.proId) {
                this.areaName[0] = item[1];
                this.cityResults = item[3];
                if (this.getRouParam.code == 2) {
                    this.param.customerInfoDto.cityId = item[3][0][0];
                    this.customerForm.patchValue({ cityId: item[3][0][0] });
                }
                this.loadAreas();
                break;
            }
        }
    }
    private loadAreas(event?) {
        event && (this.param.customerInfoDto.cityId = event.target.value);
        this.areaResults = null;
        for (let item of this.cityResults) {
            if (item[0] == this.param.customerInfoDto.cityId) {
                this.areaName[1] = item[1];
                this.areaResults = item[3];
                if (this.getRouParam.code == 2) {
                    this.param.customerInfoDto.countryId = item[3][0][0];
                    this.customerForm.patchValue({ countryId: item[3][0][0] });
                    this.areaName[2] = item[3][0][1];
                }
                break;
            }
        }
    }
    private getAreaName(event) {
        this.param.customerInfoDto.countryId = event.target.value;
        for (let item of this.areaResults) {
            if (this.param.customerInfoDto.countryId == item[0]) {
                this.areaName[2] = item[1];
            }
        }
    }

    // 取得要编辑的车辆信息的id
    private editCarsInfo(id) {
        this.editCarId = id;
        this.carsParam = this.param.customerCars[id];
        this.carsFormInit();
    }
    // 根据要id来删除 param.customerCars 中相应的车辆信息
    private delCarsInfo(id) {
        let i = id;
        for (; i < this.param.customerCars.length - 1; i++) {
            4
            this.param.customerCars[i] = this.param.customerCars[i + 1];
        }
        i == this.param.customerCars.length - 1 && this.param.customerCars.length--;
    }
    // 新增车辆信息保存
    private saveCarsInfo() {
        if (this.editCarId != null) {
            this.param.customerCars[this.editCarId] = this.carsForm.value;
            this.param.customerCars[this.editCarId].carModelId = this.carModelId;
            // this.param.customerCars[this.editCarId].carModelId = this.carsForm.value.modelName;
        } else {
            this.param.customerCars.push(this.carsForm.value);
            this.param.customerCars[this.param.customerCars.length - 1].carModelId = this.carModelId
            // this.param.customerCars[this.param.customerCars.length - 1].carModelId = this.carsForm.value.modelName;
        }
        this.cancelSaveCarsInfo();
    }
    // 取消编辑车辆信息
    private cancelSaveCarsInfo() {
        // console.log(this.param.customerCars)
        this.brandCollapsed = this.seriesCollapsed = this.modelCollapsed = true;
        this.totalItems = [0, 0, 0];
        this.brandParams = new CarBrand();
        this.seriesParams = new CarSeries();
        this.modelParams = new CarModel();
        this.loadCarBrand();
        // this.loadCarSeries();
        // this.loadCarModel();
        this.editCarId = this.carModelId = null;
        this.carsParam = new DetailCars();
        this.carsForm.get('seriesName').disable();
        this.carsForm.get('modelName').disable();
        this.carsFormInit();
    }

    // 客户信息保存
    private saveCustomerInfo() {
        this.editLoad = false;
        this.param.customerInfoDto = this.customerForm.value;
        this.param.customerInfoDto.areaName = this.areaName.join('-');
        // this.userList.length > 0 && (this.param.customerInfoDto.customerId = this.userList[0].customerId);
        this.param.customerInfoDto.customerId = this.userList.length > 0 ? this.userList[0].customerId : null;
        // this.infoParam = this.customerForm.value;
        // this.infoParam.areaName = this.areaName.join('-');
        // this.param.customerInfoDto = this.infoParam;
        console.log(this.param);
        if (this.getRouParam.code == 1) {
            // this.infoParam.customerId = this.getRouParam.customerId;
            this._service.saveEditInfo(this.param).then(res => {
                console.log(res);
                this.editLoad = true;
                if (res.errmsg == 'success') {
                    this.localpage();
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            this._service.saveAddInfo(this.param).then(res => {
                console.log(res);
                this.editLoad = true;
                if (res.errmsg == 'success') {
                    this.localpage();
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    // 取消客户信息保存，并返回到客户信息列表页
    private localpage() {
        this._route.navigate(['/pages/customerManage/customerinfo']);
    }

    // 表单验证
    public customerFormInit() {
        this.customerForm = this.fb.group({
            mobile: [this.param.customerInfoDto.mobile, [
                Validators.required,
                Validators.pattern(/^1[3578]\d{9}$/)
            ]],
            gender: [this.param.customerInfoDto.gender],
            birthday: [this.param.customerInfoDto.birthday],
            idNumber: [this.param.customerInfoDto.idNumber, [
                Validators.pattern(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/)
            ]],
            name: [this.param.customerInfoDto.name, [
                Validators.required,
            ]],
            landline: [this.param.customerInfoDto.landline, [
                Validators.pattern(/^(\d{3,4}-)?\d{7,8}$/)
            ]],
            fax: [this.param.customerInfoDto.fax, [
                Validators.pattern(/^(\d{3,4}-)?\d{7,8}$/)
            ]],
            email: [this.param.customerInfoDto.email, [
                Validators.pattern(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)
            ]],
            sourceChannel: [this.param.customerInfoDto.sourceChannel],
            proId: [this.param.customerInfoDto.proId],
            cityId: [this.param.customerInfoDto.cityId],
            countryId: [this.param.customerInfoDto.countryId],
            address: [this.param.customerInfoDto.address]
        })
        FormValidate.onValueChanged(this.customerForm, this.customerFormErrors);
    }
    public carsFormInit() {
        this.carsForm = this.fb.group({
            carNo: [this.carsParam.carNo, [
                Validators.required,
                Validators.pattern(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/)
            ]],
            brandName: [this.carsParam.brandName, Validators.required],
            seriesName: [{ 'value': this.carsParam.seriesName, disabled: true }, Validators.required],
            modelName: [{ 'value': this.carsParam.modelName, disabled: true }, Validators.required],
            vin: [this.carsParam.vin, [
                Validators.pattern(/^[a-zA-Z0-9]{17}$/)
            ]],
            carColor: [this.carsParam.carColor],
            engineNo: [this.carsParam.engineNo, [
                Validators.pattern(/^[a-zA-Z0-9]{16}$/)
            ]],
            vehicleDate: [this.carsParam.vehicleDate],
            buyDate: [this.carsParam.buyDate],
            insuranceExpireDate: [this.carsParam.insuranceExpireDate],
            insuranceCompanyId: [this.carsParam.insuranceCompanyId],
        })
        FormValidate.onValueChanged(this.carsForm, this.carsFormErrors);
    }
    // 验证错误信息
    public customerFormErrors = {
        'mobile': {
            'required': '手机号不能为空',
            'pattern': '无效的手机号'
        },
        'gender': {},
        'birthday': {},
        'idNumber': {
            'pattern': '无效的身份证号'
        },
        'name': {
            'required': '车主不能为空'
        },
        'landline': {
            'pattern': '无效的座机'
        },
        'fax': {
            'pattern': '无效的传真'
        },
        'email': {
            'pattern': '无效的电子邮箱'
        },
        'sourceChannel': {},
        'proId': {},
        'cityId': {},
        'countryId': {},
        'address': {}
    }
    public carsFormErrors = {
        'carNo': {
            'required': '车牌号不能为空',
            'pattern': '无效的车牌号'
        },
        'brandName': {
            'required': '品牌不能为空'
        },
        'seriesName': {
            'required': '车系不能为空'
        },
        'modelName': {
            'required': '车型不能为空'
        },
        'vin': {
            'pattern': '无效的VIN'
        },
        'carColor': {},
        'engineNo': {
            'pattern': '无效的发动机号'
        },
        'vehicleDate': {},
        'buyDate': {},
        'insuranceExpireDate': {},
        'insuranceCompanyId': {},
    }
}