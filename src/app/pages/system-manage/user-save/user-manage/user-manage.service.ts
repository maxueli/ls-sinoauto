import { ParamMap } from '@angular/router/router';
import { ApiService } from '../../../../privaders/apiService';
import { Injectable } from '@angular/core';

@Injectable()
export class UserManageService {
    constructor(
        public _app: ApiService
    ) { }
    // 获取用户列表
    public getList(params) {
        let url = 'user';
        return this._app.get(url, params)
    }
    // 获取角色列表
    public getRole() {
        let url = 'role';
        return this._app.get(url)
    }
    // 获取岗位列表
    public getPostion() {
        let url = 'position';
        return this._app.get(url)
    }
    // 添加用户信息
    public addUserInfo(params) {
        let url = 'user'
        return this._app.Postformdata(url, params);
    }
    // 编辑用户信息
    public editInfo(params) {
        let url = 'user/update'
        return this._app.Postformdata(url, params);
    }
    // 用户详情信息
    public userDetailInfo(id) {
        let url = 'user/' + id;
        return this._app.get(url);
    }
    // 冻结用户
    public disabledUser(id) {
        let url = 'user/freeze/' + id;
        return this._app.post(url, id);
    }un
    // 解冻用户
    public enabledUser(id) {
        let url = 'user/unfreeze/' + id;
        return this._app.post(url, id);
    }
}
