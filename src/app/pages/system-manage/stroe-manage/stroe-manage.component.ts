import { Component, ViewChild } from '@angular/core';
import { StroeManService } from './stroeManageService';
import { orgLeve, stroeManSelect, stroeManlist, addstroe } from './stroeManModal';
import { smallSelectOption } from '../../../privaders/common.modal';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidate } from '../../../privaders/fromValidate';

@Component({
    moduleId: module.id,
    selector: 'stroe-manage',
    templateUrl: 'stroe-manage.component.html',
    styleUrls: ['stroe-manage.component.scss']
})
export class StroeManageComponent {
    public selctLeve: orgLeve = new orgLeve();
    public filstleve: Array<smallSelectOption> = new Array<smallSelectOption>();
    public secleve: Array<smallSelectOption> = new Array<smallSelectOption>();
    public threeleve: Array<smallSelectOption> = new Array<smallSelectOption>();
    public selectStroe: stroeManSelect = new stroeManSelect();
    public stroelist: Array<stroeManlist> = new Array<stroeManlist>();
    public selectKey = { firstkey: null, seckey: null, threekey: null }
    public totalItems = null;
    public choosePage: null;
    public index = 1;
    @ViewChild('addModalModal') public addModalModal: ModalDirective;
    public localarea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public cityarea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public provincearea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public addstroeparams: addstroe = new addstroe();
    public addStroeForm: FormGroup
    constructor(
        private service: StroeManService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.addstroeformInit();
    }

    ngOnInit() {
        this.getfirststroe("1");
        // this.getfirststroe("2");
        // this.getfirststroe("3");
        this.getloadarea();
        this.getstroelist();
    }
    //获得一级目录
    public getfirststroe(leve, orgid?: any) {
        this.selctLeve.level = leve;
        this.selctLeve.orgId = orgid;
        console.log(this.selctLeve)
        this.service.getfirstStore(this.selctLeve).then(resp => {
            console.log(resp);
            // if (resp.result.length != 0) {
            //数据进行装载
            leve == 1 && (this.filstleve = resp.result);
            leve == 2 && (this.secleve = resp.result);
            leve == 3 && (this.threeleve = resp.result);
            // }
        })
    }
    //搜索级别列表
    public getstroelist() {
        // this.selectStroe.setPage(1, 30);
        this.service.getStroelist(this.selectStroe)
            .then(resp => {
                console.log(resp);
                if (resp.result.length != 0) {
                    this.stroelist = resp.result;
                    this.totalItems = resp.totalCount;
                    console.log(this.stroelist);
                }
            }
            ).catch(resp => {
                console.log(resp);
            })
    }
    //禁用门店
    public deteleStroe(orgId) {
        this.service.deletestroe(orgId).then(resp => {
            console.log(resp);
        }).catch(resp => {
            console.log(resp);
        })
    }
    //查询
    public search() {
        if (this.selectKey.threekey) {
            this.selectStroe.orgId = this.selectKey.threekey;
        } else if (this.selectKey.seckey) {
            this.selectStroe.orgId = this.selectKey.seckey;
        } else if (this.selectKey.firstkey) {
            this.selectStroe.orgId = this.selectKey.firstkey;
        }
        this.getstroelist();
    }
    public add() {
        this.router.navigateByUrl('pages/systemManage/storeadd')
    }
    //分页的条数
    pageChanged(event, opt?: any) {
        if (opt == 'pageIndex') {
            console.log(event);
            this.selectStroe.pageIndex = event.page;
        } else if (opt == 'go') {
            if (this.choosePage == parseInt(this.choosePage)) {
                this.selectStroe.pageIndex = this.choosePage;
                this.index = this.choosePage;
            } else {
                alert("输入的格式不对")
                this.selectStroe.pageIndex = 1;
                this.index = 1;
            }
        } else {
            console.log(event.target.value);
            this.selectStroe.pageSize = event.target.value;
        }
        this.getstroelist();
    }
    public getloadarea() {
        this.service.getlocalarea().then(res => {
            this.localarea = res.result.data;
            // console.log(this.localarea)
            this.loadCitys(this.localarea[0][0]);
            this.addstroeparams.provinceId = this.localarea[0][0];
        }).catch(err => {
            console.log(err);
        });
    }
    //获取当前市
    public loadCitys(provId) {
        if (isNaN(provId) == true) {
            provId = provId.target.value;
            this.addstroeparams.provinceId = provId;
        }
        // this.cityarea;
        for (let i = 0; i < this.localarea.length; i++) {
            if (this.localarea[i][0] == Number(provId)) {
                this.cityarea = this.localarea[i][3];
                // this.addmodel.cityId = this.addmodel.cityId ? this.addmodel.cityId : this.localarea[i][3][0][0];
                // console.log(this.cityarea);
                this.loadthreecity(this.localarea[i][3][0][0]);
                this.addstroeparams.cityId = this.localarea[i][3][0][0];
                return;
            }
        }
    }
    //获取三级市
    public loadthreecity(cityId) {
        if (isNaN(cityId) == true) {
            cityId = cityId.target.value;
            this.addstroeparams.cityId = cityId;
        }
        for (let i = 0; i < this.cityarea.length; i++) {
            if (this.cityarea[i][0] == Number(cityId)) {
                this.provincearea = this.cityarea[i][3];
                // console.log(this.provincearea);
                this.threequ(this.cityarea[i][3][0][0]);
                this.addstroeparams.countyId = this.cityarea[i][3][0][0];
                // console.log(this.addstroeparams);
                return;
            }
        }
    }
    public threequ(districtId) {
        if (isNaN(districtId) == true) {
            this.addstroeparams.countyId = districtId.target.value;
        }
        // console.log(this.addstroeparams);
        for (let j = 0; j < this.provincearea.length; j++) {
            // console.log(this.provincearea[j]);
            if (this.provincearea[j][0]) {
                // this.area.q += this.threecity[
                return
            }
        }
    }
    //添加
    public addstroe() {
        this.addstroeparams.address = this.addStroeForm.value.address;
        this.addstroeparams.mobile = this.addStroeForm.value.mobile;
        this.addstroeparams.orgName = this.addStroeForm.value.orgName;
        this.addstroeparams.username = this.addStroeForm.value.username;
        this.service.addstroe(this.addstroeparams).then(resp => {
            console.log("添加")
            console.log(resp);
            this.addModalModal.hide();
            // this.router.navigateByUrl('pages/systemManage/storeadd');
            window.location.reload();
        }).catch(resp => {
            console.log(resp);
        })
    }
    public addstroeformInit() {
        this.addStroeForm = this.fb.group({
            orgName: ['', [Validators.required]],
            username: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            address: ['', [Validators.required]]
        })
        FormValidate.onValueChanged(this.addStroeForm, this.formErrors)
    }
    public formErrors = {
        'orgName': {
            'required': '门店名称不能为空',
            // 'minlength': 'laest code min six'
        },
        'username': {
            'required': ' 联系人不能为空',
            // 'minlength': 'laest code min six'
        },
        'mobile': {
            'required': ' 联系人联系方式不能为空',
            // 'minlength': 'laest code min six'
        },
        'address': {
            'required': ' 地址不能为空',

        }
    }
    //查看 变价
    public CkAnedior(str, item) {
        console.log(item);
        if (str == 'ck') {
            this.addStroeForm.patchValue({ orgName: item.orgName, username: item.pName, address: item.address })
            this.addModalModal.show();
        }
    }
    //修改
    public getupdateorg(params){
        this.service.getupdateorg(params).then(resp=>{
            console.log(resp)
        }).catch(resp=>{
            console.log(resp);
        })
    }
}
