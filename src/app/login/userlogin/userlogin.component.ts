import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FormValidate } from '../../privaders/fromValidate';
import { UserLoginService } from '../loginUserService';
import { AlertService } from '../../privaders/alertService';

@Component({
    moduleId: module.id,
    selector: 'userlogin',
    templateUrl: 'userlogin.component.html',
    styleUrls: ['userlogin.component.scss']
})
export class UserloginComponent {
    public LoginForm: FormGroup;//定义formgroup的一个实体
    public modal={type:-1,msg:"用来测试",code:"10086"};
    constructor(
        public fb: FormBuilder,
        public userService: UserLoginService
    ) {
        this.loginFormInit();
    }
    //loginFrom 初始化
    public loginFormInit() {
        this.LoginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
        FormValidate.onValueChanged(this.LoginForm, this.formErrors)
    }
    public login() {
        // this.modal={type:0,msg:"用来测试",code:"10086"};
        this.userService.userLogin(this.LoginForm.value).then(res => {
            console.log(res);
            if (res.errcode == 0) {
                //存入缓存把token
                this.userService.setStroage(res.result)
                //跳转到主页
                this.userService.redirectTo();
            }
        }).catch(resp => {
            let res=resp.json();
            this.modal={type:0,msg:res.errmsg,code:res.errcode,}
            console.log(resp);
        })
    }
    //错误信息
    public formErrors = {
        'username': {
            'required': '用户名不能为空',
            // 'minlength': 'laest code min six'
        },
        'password': {
            'required': ' 密码不能为空',
            // 'minlength': 'laest code min six'
        }
    }
    public overModal(event){
        console.log(event);
        this.modal=event;
    }


}
