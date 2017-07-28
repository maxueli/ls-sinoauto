import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../app.animation';
import { depot, adddepot } from '../tools';
import { WarehouseService } from './warehouse-definition.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FormValidate } from '../../../../privaders/fromValidate';

@Component({
    moduleId: module.id,
    selector: 'warehouse-definition',
    templateUrl: 'warehouse-definition.component.html',
    styleUrls: ['warehouse-definition.component.scss'],
    animations: [flyIn]
})
export class WarehouseDefinitionComponent {
    addForm: FormGroup;
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public list: Array<any>; //保存列表数据
    public depotparams: depot = new depot();
    public depotaddparams: adddepot = new adddepot();
    public addError: boolean = false;
    @ViewChild('workModal') public workModal: ModalDirective;

    constructor(
        public _service: WarehouseService,
        public fb: FormBuilder
    ) {
        this.addFormInit();
    }
    ngOnInit() {
        this.getListInfo();
    }

    public getListInfo() {
        this.list = null;
        this._service.getList(this.depotparams).then(res => {
            console.log(res);
            this.totalItems = 0;
            this.list = null;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.depotparams.pageSize);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    public search() {
        this.getListInfo();
    }

    // 分页条选择
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.depotparams.setPage(this.index, Number(event.target.value));
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
            this.depotparams.setPage(this.index);
        }
        this.getListInfo();
    }

    // 添加仓库
    public addDepotInfo() {
        console.log(this.depotaddparams);
        var num = 0;
        for (var key of this.list) {
            if (key.depotCode == this.depotaddparams.depotCode || key.depotName == this.depotaddparams.depotName) {
                break;
            } else {
                num++;
            }
        }
        console.log(num);
        console.log(this.list.length);
        if (num == this.list.length) {
            this._service.addDepot(this.depotaddparams).then(res => {
                console.log(res);
                this.workModal.hide();
                this.getListInfo();
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log('此仓库已存在');
            $('.formAddInfo').removeClass('dis');
            setTimeout("$('.formAddInfo').addClass('dis');", 2000);
        }

    }

    // 重置添加仓库信息
    public reset() {
        this.addError = false;
        this.addFormInit();
        this.depotaddparams = new adddepot();
    }

    // 表单验证
    public addFormInit() {
        this.addForm = this.fb.group({
            code: [this.depotaddparams.depotCode, Validators.required],
            name: [this.depotaddparams.depotName, Validators.required],
            description: [this.depotaddparams.remark],
        })
        FormValidate.onValueChanged(this.addForm, this.addFormErrors);
    }
    // 验证错误信息
    public addFormErrors = {
        "code": {
            "required": "仓库代码不能为空"
        },
        "name": {
            "required": "仓库名称不能为空"
        },
        "description": {}
    }
}