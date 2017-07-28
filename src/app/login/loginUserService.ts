import { Injectable } from '@angular/core';
import { ApiService } from '../privaders/apiService';
import { Router } from '@angular/router';
@Injectable()
export class UserLoginService{
    constructor(
        private httpServe:ApiService,
        public router:Router
    ){
    }
    //用户登录
    public userLogin(body){
        let url="login";
        return this.httpServe.Postformdata(url,body)
    }
    //假装重定向
    public redirectTo(){
        this.router.navigateByUrl('/pages')
    }
    //存入token
    public setStroage(body){
        console.log(body);
        this.httpServe.setLocalStroage(body);
    }
}