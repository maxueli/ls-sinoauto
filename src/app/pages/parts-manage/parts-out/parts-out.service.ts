import { Headers, Http, RequestMethod, RequestOptionsArgs, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HQMDURL } from '../../../privaders/urlService';
import {ApiService} from '../../../privaders/apiService';


@Injectable()
export class partsOutService {
  constructor(
    private _apiService:ApiService,
  ) { }
  
  /**
   * 维修领料
   *
  */
  // 查询工单号和车牌号
  public getmaintenanceInfo(params){
    let url = "findno";
    return this._apiService.get(url,params);
  }
  // 维修领料展示页面
  public repairpack(params){
    let url = "repairpack";
    return this._apiService.Postformdata(url,params);
  }
  //获取配件编码
  public getfindpartsCode(params){
    let url = 'findpartscodeandname';
    return this._apiService.get(url,params);
  }
  //通过配件id获取库存信息
  public stockparts(params){
    let url = 'stockparts';
    return this._apiService.Postformdata(url,params);
  }
  //根据仓库id获取仓位
  public getstock(params){
    let url = 'getstock';
    return this._apiService.Postformdata(url,params);
  }
  //维修领料生成发料单
  public addrepairpack(params){
    let url = 'addrepairpack';
    return this._apiService.post(url,params);
  }
  //挂单
  public hangrepairpack(params){
    let url = 'hangrepairpack';
    return this._apiService.post(url,params);
  }
  // 获取挂单信息
  public repairpackhang(params){
    let url = 'repairpackhang';
    return this._apiService.Postformdata(url,params);
  }
  // 作废挂单
  public maintenancedeletehang(params){
    let url = `deletehang?hangId=${params}&hangType=3`
    return this._apiService.delete(url);
  }
  /**
   * 销售出库
   *
  */
  public customer(params){
    let url = 'customer/byname';
    return this._apiService.get(url,params);
  }
  //获取销售员信息
  public findusersinorg(){
    let url = 'findusersinorg';
    return this._apiService.get(url);
  }
  //增加销售出库
  public addsellout(params){
    let url = 'addsellout';
    return this._apiService.post(url,params);
  }
  //挂单
  public hangsellout(params){
    let url = 'hangsellout';
    return this._apiService.post(url,params);
  }
  //根据挂单id查询list
  public findsellhang(params){
    let url ='findsellhang';
    return this._apiService.Postformdata(url,params);
  }
  /**
   * 内部领料
   * 
   *
  */
  //获取岗位列表
  public departments(id){
    let url = `departments/${id}`;
    return this._apiService.get(url);
  }
  //天假内部领料
  public addinsidepack(params){
    let url = 'addinsidepack';
    return this._apiService.post(url,params);
  }
  //获取挂单信息
  public gethanglogs(params){
    let url = 'gethanglogs';
    return this._apiService.get(url,params);
  }
  //挂单信息
  public hanginsidepack(params){
    let url = 'hanginsidepack';
    return this._apiService.post(url,params);
  }
  //点击一条挂单
  public gethanginsidepack(params){
    let url = 'gethanginsidepack';
    return this._apiService.Postformdata(url,params)
  }
  //删除挂单信息
  public deletehang(params){
    let url = `deletehang?hangId=${params.hangId}&hangType=${params.hangType}`;
    console.log(url);
    return this._apiService.delete(url);
  }

  /**
   * 采购退库
   * 
   *
  */
  public findSuppliers(params){
    let url = 'findSuppliers';
    return this._apiService.get(url,params);
  }
  //根据供应商id查单号
  public findpurchcodesbysupplier(params){
    let url = 'findpurchcodesbysupplier';
    return this._apiService.get(url,params); 
  }
  //根据单号查询数据
  public findpurchbypurchcode(params){
    let url = 'findpurchbypurchcode';
    return this._apiService.get(url,params);
  }
  //生成退库单
  public batchgeneratepurchretreat(params){
    let url = 'batchgeneratepurchretreat';
    return this._apiService.post(url,params);
  }
  //挂单
  public purchretreataddhang(params){
    let url = 'purchretreataddhang';
    return this._apiService.post(url,params);
  }
  public deletehanglog(params){
    let url = `deletehang?hangId=${params}&hangType=6`;
    console.log(url);
    return this._apiService.delete(url);
  }
  
  
  






}
