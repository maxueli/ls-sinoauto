import { Component, OnInit, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../app.animation';
import { UserManageService } from './user-manage.service';
import { user, adduser } from '../../system.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidate } from '../../../../privaders/fromValidate';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview'
@Component({
    moduleId: module.id,
    selector: 'user-manage',
    templateUrl: 'user-manage.component.html',
    styleUrls: ['user-manage.component.scss'],
    animations: [flyIn]
})
export class UserManageComponent {
    addForm: FormGroup;
    editForm: FormGroup;
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public listInfo: Array<any>; //保存列表信息
    public userparams: user = new user();
    public addparams: adduser = new adduser(); //添加用户信息
    public roleInfo: Array<any>;
    public postionInfo: Array<any>;
    public numFlag: boolean = true;
    public psdCheck: boolean; //添加和编辑是否隐藏密码行
    public remarkCheck: boolean; //添加和编辑是否隐藏备注行
    public modalCheck: Number;
    public posTemp: any;
    public roleTemp: any;
    public freezeId: Number;
    items = []; //保存职务信息
    roleitems = []; //保存角色信息
    public addErrMsg: string; //添加用户信息失败信息
    public saveRoles = '';
    public savePos = '';
    @ViewChild('addModal') public addModal: ModalDirective;
    @ViewChild('editModal') public editModal: ModalDirective;

    constructor(
        public _service: UserManageService,
        public fb: FormBuilder
    ) {
        this.addFormInit();
        this.editFormInit();
    }
    ngOnInit() {
        this.getListInfo();
        this.getPostions(); //加载岗位列表
        this.getRoleInfo(); //加载角色列表
    }
    // 获取列表信息
    public getListInfo() {
        this.listInfo = null;
        this._service.getList(this.userparams).then(res => {
            console.log(res);
            this.totalItems = 0;
            this.listInfo = null;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.listInfo = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.userparams.pageSize);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    // 按条件查询列表
    public search() {
        this.getListInfo();
    }

    // 分页条选择
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.userparams.setPage(this.index, Number(event.target.value));
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
            this.userparams.setPage(this.index);
        }
        this.getListInfo();
    }

    // 获取角色列表
    public getRoleInfo() {
        this.roleInfo = null;
        this._service.getRole().then(res => {
            this.roleInfo = res.result;
        }).catch(err => {
            console.log(err);
        });
    }

    // 获取岗位列表
    public getPostions() {
        this.postionInfo = null;
        this._service.getPostion().then(res => {
            this.postionInfo = res.result;
        }).catch(err => {
            console.log(err);
        });
    }

    // 添加用户信息
    public addInfo() {
        this.cancle(1);
        this.cancle(2);
        this.addFormInit();
        this.modalCheck = 1;
        this.addparams = new adduser();
        this.savePos = '';
        this.saveRoles = '';
        this.remarkCheck = false;
        this.psdCheck = true;
        this.loadRoleItems(); //加载角色列表
        this.positionItems(); //加载岗位列表
    }

    // 提交添加信息
    public submit() {
        console.log(this.addparams);
        this._service.addUserInfo(this.addparams).then(res => {
            console.log(res);
            this.addModal.hide();
            this.getListInfo();
        }).catch(err => {
            console.log(err);
            console.log(JSON.parse(err._body).errmsg);
            this.addErrMsg = JSON.parse(err._body).errmsg;
            $('.errInfo').parent().removeClass('dis');
            $('.errInfo').html(this.addErrMsg);
            setTimeout("$('.errInfo').parent().addClass('dis');", 2000);
        });
    }

    // 获取用户详情
    public getUserDetailInfo(id) {
        this.cancle(1);
        this.cancle(2);
        this.modalCheck = 0;
        this.loadRoleItems(); //加载角色列表
        this.positionItems(); //加载岗位列表
        this.addparams.userId = id;
        this._service.userDetailInfo(id).then(res => {
            console.log(res);
            this.remarkCheck = true;
            this.psdCheck = false;
            this.addparams.mobile = res.result.user.mobile;
            this.addparams.userName = res.result.user.userName;
            this.addparams.remark = res.result.user.remark;
            this.addparams.posIdStr = res.result.userPosIds;
            this.addparams.roleIdStr = res.result.userRoleIds;
            this.savePos = '已选中' + res.result.userPosIds.length + '项';
            this.saveRoles = '已选中' + res.result.userRoleIds.length + '项';
        }).catch(err => {
            console.log(err);
        });
    }

    // 编辑信息
    public edit() {
        console.log(this.addparams);
        this._service.editInfo(this.addparams).then(res => {
            console.log(res);
            this.editModal.hide();
            this.getListInfo();
        }).catch(err => {
            console.log(err);
        });
    }

    // 确认所选角色
    public sureRole() {
        if (this.roleTemp.length == this.roleInfo.length) {
            this.addparams.roleIdStr = this.roleTemp;
            this.saveRoles = '已选中所有项';
        } else if (this.roleTemp.length == 0) {
            this.addparams.roleIdStr = '';
            this.saveRoles = '';
        } else {
            this.saveRoles = '已选中' + this.roleTemp.length + '项';
            this.addparams.roleIdStr = this.roleTemp;
        }
        this.cancle(1);
    }

    // 确认所选职务
    public surePos() {
        if (this.posTemp.length == 0) {
            this.addparams.posIdStr = '';
            this.savePos = '';
        } else {
            this.addparams.posIdStr = this.posTemp;
            this.savePos = '已选中' + this.posTemp.length + '项';
        }
        this.cancle(2);
    }

    // 显示弹框
    public showMsg(flag) {
        if (flag == 1) {
            this.cancle(2);
            $('.popModal1').removeClass('dis');
        } else if (flag == 2) {
            this.cancle(1);
            $('.popModal2').removeClass('dis');
        }
    }
    // 隐藏弹框
    public cancle(flag) {
        if (flag == 1) {
            $('.popModal1').addClass('dis');
        } else if (flag == 2) {
            $('.popModal2').addClass('dis');
        }
    }

    // 添加用户信息表单验证
    public addFormInit() {
        this.addForm = this.fb.group({
            mobile: [this.addparams.mobile, [
                Validators.required,
                Validators.pattern(/^1[3578]\d{9}$/)
            ]],
            password: [this.addparams.password, Validators.required],
            username: [this.addparams.userName, Validators.required],
            allroles: [this.addparams.roleIdStr, Validators.required],
            posName: [this.addparams.posIdStr, Validators.required],
            remark: [this.addparams.remark],
        })
        FormValidate.onValueChanged(this.addForm, this.addFormErrors);
    }
    // 验证错误信息
    public addFormErrors = {
        'mobile': {
            'required': '手机号不能为空',
            'pattern': '无效的手机号'
        },
        'password': {
            'required': '密码不能为空',
            'minlength': '密码至少为6位',
            'maxlength': '密码最多为18位'
        },
        'username': {
            'required': '用户名不能为空'
        },
        'allroles': {
            'required': '角色不能为空'
        },
        'posName': {
            'required': '职位不能为空'
        },
        'remark': {}
    }
    // 表单验证
    public editFormInit() {
        this.editForm = this.fb.group({
            mobile: [this.addparams.mobile, [
                Validators.required,
                Validators.pattern(/^1[3578]\d{9}$/)
            ]],
            username: [this.addparams.userName, Validators.required],
            allroles: [this.addparams.roleIdStr, Validators.required],
            posName: [this.addparams.posIdStr, Validators.required],
            remark: [this.addparams.remark],
        })
        FormValidate.onValueChanged(this.editForm, this.editFormErrors);
    }
    // 验证错误信息
    public editFormErrors = {
        'mobile': {
            'required': '手机号不能为空',
            'pattern': '无效的手机号'
        },
        'username': {
            'required': '用户名不能为空'
        },
        'allroles': {
            'required': '角色不能为空'
        },
        'posName': {
            'required': '职位不能为空'
        },
        'remark': {
            'maxlength': '输入最多为100位'
        }
    }

    // 将职位信息重新拼装成指定格式
    public loadRoleItems() {
        this.roleitems = [];
        for (var key of this.roleInfo) {
            var tem = {
                text: '',
                value: '',
                children: null
            }
            tem.text = key.roleName;
            tem.value = key.roleId;
            this.roleitems.push(new TreeviewItem(tem));
        }
    }

    // 将职位信息重新拼装成指定格式
    public positionItems() {
        this.items = [];
        for (var key of this.postionInfo) {
            var tem = {
                text: '',
                value: '',
                children: []
            }
            tem.text = key.depName;
            tem.value = key.depId;
            if (key.posList.length != 0) {
                for (var value of key.posList) {
                    var tems = {
                        text: '',
                        value: '',
                    }
                    tems.text = value.posName;
                    tems.value = value.posId;
                    tem.children.push(tems);
                }
            } else {
                tem.children = null;
            }
            this.items.push(new TreeviewItem(tem));
        }
    }

    // 角色：treeview配置
    public config1 = TreeviewConfig.create({
        hasAllCheckBox: true,
        hasFilter: false,
        hasCollapseExpand: false,
        maxHeight: 250
    })

    // 职务：treeview配置
    public config2 = TreeviewConfig.create({
        hasAllCheckBox: true,
        hasFilter: false,
        hasCollapseExpand: true,
        maxHeight: 250
    })

    // treeview：change事件
    public onSelectedChange(event, flag) {
        if (flag == 1) {
            this.roleTemp = event;
        } else if (flag == 2) {
            this.posTemp = event;
        }
    }

    // 冻结
    public disUser(id) {
        this._service.disabledUser(id).then(res => {
            console.log(res);
            this.getListInfo();
        }).catch(err => {
            console.log(err);
        });
    }

    // 解冻
    public enUser(id) {
        this._service.enabledUser(id).then(res => {
            console.log(res);
            this.getListInfo();
        }).catch(err => {
            console.log(err);
        });
    }
}

