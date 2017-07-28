import { Headers, Http, RequestMethod, RequestOptionsArgs, Response, RequestOptions, ResponseContentType, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { UserInfo } from '../login/loginUser.Modal';
import { HQMDURL, TOKEN } from '../privaders/urlService';
import { AlertService } from './alertService';
import * as filesave from 'file-saver';

@Injectable()
export class ApiService {
    public Alerts = new AlertService();
    constructor(
        private http: Http,
        // public Alerts:AlertService
    ) {

    }
    //统一的方法所有的请求都走这个方法
    public promise(url: string, option?: RequestOptionsArgs): Promise<Response> {
        let urls;
        option = option || { method: RequestMethod.Get }//这边会给一个请求的方式  默认请求是get
        if (url.indexOf('http') == -1) {
            urls = HQMDURL.concat(url);
        } else {
            urls = url;
        }

        //判断有没有用户的存在。是否存在登录异常
        // let user: UserInfo = new UserInfo();
        if (url.indexOf('login') == -1) {
            option.headers = option.headers || new Headers();
            option.headers.append('Authorization', `Bearer ${this.getLocalStroage()}`);
        }
        return this.http.request(urls, option).toPromise();
    }
    get(url: string, search?: any) {
        return this.promise(url, { method: RequestMethod.Get, search: search })
            .then(resp => this.extractData(resp))
            .catch(resp => this.handleError(resp))
    }
    post(url: string, body: any) {
        return this.promise(url, { method: RequestMethod.Post, body: body })
            .then(resp => this.extractData(resp))
            .catch(resp => this.handleError(resp))
    }
    put(url: string, search: any) {
        return this.promise(url, { method: RequestMethod.Put, body: search })
            .then(resp => this.extractData(resp))
            .catch(resp => this.handleError(resp))
    }
    Postformdata(url: string, body: any) {
        return this.promise(url, new RequestOptions({
            method: RequestMethod.Post,
            body: this.buildURLSearchParams(body),
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        }))
            .then(resp => this.extractData(resp))
            .catch(resp => this.handleError(resp))
    }
    patch(url: string, body: any) {
        return this.promise(url, { method: RequestMethod.Patch, body: body })
            .then(resp => this.extractData(resp))
            .catch(resp => this.handleError(resp))
    }
    delete(url: string) {
        return this.promise(url, { method: RequestMethod.Delete })
            .then(resp => this.extractData(resp))
            .catch(resp => this.handleError(resp));
    }
    //下载
    downlode(url: string, search?: any, fileName?: string) {
        return this.promise(url, { method: RequestMethod.Get, search: search, responseType: ResponseContentType.Blob }).then(res => {
            let data = res.blob();
            filesave.saveAs(data, fileName);
        })
    }
    //保存token
    public setLocalStroage(body) {
        if (body) {
            // console.log(body)
            localStorage.setItem(TOKEN, JSON.stringify(body));
        }
    }
    //获得token
    public getLocalStroage() {
        let token = JSON.parse(localStorage.getItem(TOKEN));
        // console.log(JSON.parse( token));
        return token.token;
    }
    //清除token
    public clearLocalStroage() {
        localStorage.removeItem(TOKEN);
    }
    //序列化formdate
    public buildURLSearchParams(paramMap) {
        let params = new URLSearchParams();
        if (!paramMap) {
            return params;
        }
        for (let key in paramMap) {
            let val = paramMap[key];
            params.set(key, val);
        }
        return params;
    }
    public extractData(res) {
        // console.log(res);
        let text = res.text();
        if (!text) return;
        let data = res.json();
        if (!data) return;
        let result = data;
        if (!result) {
            throw new TypeError('返回对象类型转换失败！');
        }
        return result;
    }
    public handleError(error: any) {
        console.log('An error occurred', error); // for demo purposes only
        let res = JSON.parse(error._body);
        console.log(res.code)
        if (res.errcode != 0) {
            console.log("错误");
            // this.Alerts.error(res);
        }
        //错误信息的返回值
        return Promise.reject(error.message || error);
    }
}
