import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { StroeManService } from '../../pages/system-manage/stroe-manage/stroeManageService';
import { smallSelectOption } from '../../privaders/common.modal';
import { addstroe } from '../../pages/system-manage/stroe-manage/stroeManModal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FormValidate } from '../../privaders/fromValidate';
import { Router } from '@angular/router';

interface MyBaTreeInterFace {
    "orgId": number,
    "orgName": string,
    "pId": number,
    "nodes"?: MyBaTreeInterFace[]
}
@Component({
    selector: 'ba-tree',
    templateUrl: 'ba-tree.component.html',
    styleUrls: ['ba-tree.component.scss']
})
export class BaTreeComponent {
    @Input() myBaTree: MyBaTreeInterFace;
    @Output() baTreeGoback: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('addModalModal') public addModalModal: ModalDirective;
    public localarea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public cityarea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public provincearea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public addstroeparams: addstroe = new addstroe();
    public addStroeForm: FormGroup;
    constructor(private service: StroeManService,
        public fb: FormBuilder,
        public router: Router
    ) {
        this.addstroeformInit()
    }
    ngOnInit() {
        this.getloadarea();

    }
    alertff(item) {
        console.log(item);
        this.addstroeparams.pid = item.pId;
        this.addModalModal.show();
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
            this.baTreeGoback.emit({code:1});

            // this.router.navigateByUrl('pages/systemManage/storeadd');
            // window.location.reload();
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

}
