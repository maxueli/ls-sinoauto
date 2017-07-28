import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SupplierManageService } from './supolierService';
import { suppliersearc, addsupplier, EnableParams, Insertsupplier } from './suppplierModal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FormValidate } from './../../../privaders/fromValidate';

@Component({
    moduleId: module.id,
    selector: 'supplier-manage',
    templateUrl: 'supplier-manage.component.html',
    styleUrls: ['supplier-manage.component.scss'],
    animations: [flyIn]
})
export class SupplierManageComponent {
    supplierForm: FormGroup;
    editsupplierForm: FormGroup;
    @ViewChild('lgModal') public lgModal: ModalDirective;
    @ViewChild('addsupplier') public addsupplier: ModalDirective;
    @ViewChild('tishi') public tishi: ModalDirective;
    @ViewChild('addhint') public addhint: ModalDirective;
    public searchParams: suppliersearc = new suppliersearc();
    public supplierParams: suppliersearc = new suppliersearc();
    public addsupplierParams: addsupplier = new addsupplier();
    public supplierstate: Insertsupplier = new Insertsupplier();
    public EnableParams: EnableParams = new EnableParams();
    //   public inventoryDetailsDto: Array<InsertInventoryDetailsDto> = new Array<InsertInventoryDetailsDto>();
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public searchLoad: boolean = true;
    public tableLoad: boolean = true;
    public disabled: boolean = true;
    public list: Array<any>;
    public Editinfo: {};
    public arr = [];

    constructor(
        public supplierService: SupplierManageService,
        public fb: FormBuilder
    ) {
        this.addFormInit();
        this.editFormInit();
    }
    ngOnInit() {
        this.supplier();
    }
    //获取供应商管理列表
    private supplier() {
        this.list = null;
        this.supplierService.getlists(this.supplierParams).then(res => {
            console.log(res);
            this.totalItems = 0;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.supplierParams.pageSize);
            }

        })
            .catch(Error => {
                console.log(Error)
            })
    }

    // 供应商管理列表查询
    private search() {
        this.supplier();
    }
    //编辑供应商
    private supplierEdit(content) {
        console.log(content);
        this.searchParams.supplierId = content.supplierId;//供应商id
        this.searchParams.supplierName = content.supplierName;//供应商名称
        this.searchParams.supplierAddress = content.supplierAddress;//地址
        this.searchParams.contacts = content.contacts;//联系人
        this.searchParams.zipCode = content.zipCode;//邮编
        this.searchParams.contactPhone = content.contactPhone;//联系人手机
        this.searchParams.landline = content.landline;//座机
        this.searchParams.shortName = content.shortName;//简称
        this.searchParams.remark = content.remark;//备注
        this.lgModal.show();
    }
    //提交编辑
    private supoilersubmit() {
        console.log(this.searchParams);
        this.supplierService.postupdate(this.searchParams).then(res => {
            console.log(res);
            if (res.errmsg = 'success') {
                this.lgModal.hide();
                this.tishi.show();
                this.supplier();
            }
        }).catch(Error => {
            console.log(Error);
        })
    }
    //新增供应商
    private addsupoiler() {
        console.log(this.addsupplierParams);
        var num = 0;
        for (var key of this.list) {
            if (key.supplierName == this.addsupplierParams.supplierName) {

                break;
            } else {
                num++;
            }
        }

        console.log(num);
        if (num == this.list.length) {
            this.supplierService.postsubmint(this.addsupplierParams).then(res => {
                console.log(res);
                this.addsupplier.hide();
                this.addsupplierParams = new addsupplier();
            }).catch(Error => {
                console.log(Error);
            })
        } else {
            console.log('此供应商名称已存在');
            $('.formAddInfo').removeClass('dis');
            setTimeout("$('.formAddInfo').addClass('dis');", 3000);
        }




        // this.supplierService.postsubmint(this.addsupplierParams).then(res => {
        //     console.log(res);
        //     if (res.errmsg == 'success') {
        //         this.addsupplier.hide();
        //         this.addsupplierParams = new addsupplier();
        //     }

        // }).catch(Error => {
        //     console.log(Error);
        // })

    }
    // 判断全选与全不选
    public ischeckAll() {
        if ($('input[name="allselect"]').is(":checked")) {
            $('input[name="radios"]').prop('checked', true);
            this.disabled = false;
        } else {
            $('input[name="radios"]:checked').prop('checked', false);
            this.disabled = true;
        }
    }
    //单选按钮
    // public isradio(id, enable) {
    //     if ($('input[name="radios"]').is(":checked")) {
    //         this.disabled = false;
    //         this.EnableParams.supplierId = id;
    //         this.EnableParams.isEnable = !enable;
    //         console.log(id, enable);
    //     } else {
    //         this.disabled = true;
    //     }
    // }
    // 单选、多选判断按钮状态并取值
    public isradio(e, item) {
        this.disabled = false;
        var t = e.target, c = t.checked;
        if (c) {

            this.EnableParams.supplierId = item.supplierId;
            this.EnableParams.isEnable = !item.isEnable;
            this.arr.push(this.EnableParams);
        } else {
            // for (var i = 0; i < this.arr.length; i++) {
            //     if (this.arr[i] == item.stockId) {
            //         console.log(this.arr[i]);
            //         console.log(item.stockId);
            //         this.arr.splice(i, 1);
            //     }
            // }
        }

        console.log(this.arr);

    }




    //是否启用
    public Enable() {
        this.supplierService.postupdate(this.arr).then(res => {
            console.log(res);
            this.supplier();
            this.disabled = true;
        }).catch(Error => {
            console.log(Error)
        })
    }
    // 表单验证
    public addFormInit() {
        this.supplierForm = this.fb.group({
            Name: [this.addsupplierParams.supplierName, Validators.required],
            contacts: [this.addsupplierParams.contacts, Validators.required],
            contactPhone: [this.addsupplierParams.contactPhone,
            [Validators.required,
            Validators.pattern(/^1[3578]\d{9}$/)
            ]],
            shortName: [this.addsupplierParams.shortName],
            supplierAddress: [this.addsupplierParams.supplierAddress],
            zipCode: [this.addsupplierParams.zipCode],
            landline: [this.addsupplierParams.landline, Validators.pattern(/^(\d{3,4}-)?\d{7,8}$/)
            ],
            remark: [this.addsupplierParams.remark],
        })
        FormValidate.onValueChanged(this.supplierForm, this.addFormErrors);
    }
    // 表单验证
    public editFormInit() {
        this.editsupplierForm = this.fb.group({
            supplierName: [this.searchParams.supplierName, Validators.required],
            editcontacts: [this.searchParams.contacts, Validators.required],
            editcontactPhone: [this.searchParams.contactPhone, [Validators.required,
            Validators.pattern(/^1[3578]\d{9}$/)
            ]],
            editshortName: [this.searchParams.shortName],
            editAddress: [this.searchParams.supplierAddress],
            editzipCode: [this.searchParams.zipCode],
            editremark: [this.searchParams.remark],
            editlandline: [this.searchParams.landline, Validators.pattern(/^(\d{3,4}-)?\d{7,8}$/)],

        })
        FormValidate.onValueChanged(this.editsupplierForm, this.editFormErrors);
    }
    // 验证错误提示信息
    public addFormErrors = {
        "Name": {
            "required": "供应商名称不能为空"
        },
        "contacts": {
            "required": "联系人不能为空"
        },
        "contactPhone": {
            "required": "手机号码不能为空",
            "pattern": "无效的手机号"
        },
        "shortName": {},
        "supplierAddress": {},
        "zipCode": {},
        "landline": {
            "pattern": "无效的座机号码！"
        },
        "remark": {},

    }
    // 验证错误提示信息
    public editFormErrors = {
        "supplierName": {
            "required": "供应商名称不能为空"
        },
        "editcontacts": {
            "required": "联系人不能为空"
        },
        "editcontactPhone": {
            "required": "联系人不能为空",
            "pattern": "无效的手机号"
        },
        "editshortName": {},
        "editAddress": {},
        "editzipCode": {},
        "editremark": {},
        "editlandline": {
            "pattern": "无效的座机号码！"
        },

    }



    // 供应商管理分页
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.supplierParams.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.supplierParams.setPage(this.index);
        }
        this.supplier();
    }

}
