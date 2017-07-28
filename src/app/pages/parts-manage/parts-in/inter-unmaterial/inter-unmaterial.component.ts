import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../app.animation';
import { helpers } from '../../../../privaders/helper'
import { FormValidate } from '../../../../privaders/fromValidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { smallSelectOption } from '../../../../privaders/common.modal';
import { returnOk, gethanglogs, insideRetreatHangDto, departIdAnduserId, findinsideretreatsParam, ReturnParams, stInsideRetreats, } from './interUnmaterial.Modal';
import { interUnmaterialService } from './interUnmaterialService';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  moduleId: module.id,
  selector: 'inter-unmaterial',
  templateUrl: 'inter-unmaterial.component.html',
  styleUrls: ['inter-unmaterial.component.scss'],
  animations: [flyIn]
})
export class InterUnmaterialComponent {
  public isShow: boolean = true;
  public packUser: Array<smallSelectOption> = new Array<smallSelectOption>();
  public depart: Array<smallSelectOption> = new Array<smallSelectOption>();
  public ipCodelist: Array<any> = new Array<any>();
  public interSearchParam: departIdAnduserId = new departIdAnduserId();
  public interlist: Array<findinsideretreatsParam> = new Array<findinsideretreatsParam>();
  public ReturnParams: ReturnParams = new ReturnParams();
  public returnMaterialtemp: any//用来退料的零时变量

  public stInsideRetreats = new stInsideRetreats();
  public insideRetreatHangDto = new insideRetreatHangDto();

  public returnOk = new returnOk();
  @ViewChild('ReMaterialModal') public ReMaterialModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;

  public insideRetreat: FormGroup;
  constructor(
    public _helpers: helpers,
    public service: interUnmaterialService,
    public fb: FormBuilder
  ) {

  }
  ngOnInit() {
    this.getfindpackusers();
    this.supplierFormInit();
    this.gethanglogs();
  }
   public dropdownShow:boolean = false;
  public hangOrderListCount:number;
  pageChanged(event){
    this.gethanglog.setPage(event.page);
    this.service.gethanglogs(this.gethanglog).then(
      res=>{
        console.log(res);
        this.hangOrderListCount = res.totalCount;
      }
    ).catch(
      err=>{
        console.log(err);
      }
    )
  }
  dyHtml() {
    console.log(this.printData);
    this._helpers.displaynone();
    window.print();
    this.printData = [];
    this.staticModal.hide();
    this._helpers.displayblock();
  }
  offprint() {
    this.printData = [];
    this.staticModal.hide();
  }
  public getfindpackusers() {
    this.service.getfindpackusers().then(resp => {
      console.log(resp)
      this.packUser = resp.result;
      this.interSearchParam.userId = resp.result[0].key;
      this.insideRetreatHangDto.packUserName = resp.result[0].value;
      this.chosedepart(this.packUser[0].key, '')
    }).catch(resp => {
      console.log(resp)
    })
  }
  chosedepart(packUser, event) {
    if (event) {
      this.insideRetreatHangDto.packUserName = event.target.selectedOptions[0].innerHTML
    }
    this.service.getfinddeparts(packUser).then(resp => {
      console.log(resp);
      this.depart = resp.result;
      this.interSearchParam.departId = this.depart[0].key;
      this.insideRetreatHangDto.packDepart = this.depart[0].value;
      this.getIpcode(this.depart[0].key, '');
    })
  }
  getIpcode(departId, event) {
    if (event) {
      this.insideRetreatHangDto.packDepart = event.target.selectedOptions[0].innerHTML;
    }
    this.service.getIpcode(this.interSearchParam).then(resp => {
      console.log(resp);
      this.ipCodelist = resp.result;
      this.interSearchParam.ipCode = resp.result[0];
      this.getfindinsideretreats(this.interSearchParam.ipCode);
    }).catch(resp => {
      console.log(resp)
    })
  }
  getfindinsideretreats(ipcode) {
    console.log(ipcode);
    // this.interlist = [];
    this.service.getfindinsideretreats(ipcode).then(resp => {
      console.log(resp);
      this.interlist = resp.result.insidePackInfoDtos;
      // this.insideRetreatRecordDtos = [];
      this.stInsideRetreats = new stInsideRetreats();
      this.insideRetreatHangDto.stInsideRetreats = [];
    }).catch(resp => {
      console.log(resp)
    })
  }

  //退料
  public Return_material(content) {
    console.log(content);
    this.ReturnParams.partsCode = content.partsCode;//配件编码
    this.ReturnParams.partsTypeName = content.partsTypeName;//配件分类
    this.ReturnParams.partsName = content.partsName;//配件名称
    this.ReturnParams.partsBrandName = content.partsBrandName;//品牌
    this.ReturnParams.partsSpec = content.partsSpec;//规格型号
    this.ReturnParams.partsUnit = content.partsUnit;//单位
    this.ReturnParams.depotName = content.depotName;//仓库
    this.ReturnParams.depotPosName = content.depotPosName;//库位
    this.ReturnParams.inventory = content.inventory;//库存量
    this.ReturnParams.price = content.price;//单价
    this.ReturnParams.count = content.count;//数量
    this.ReturnParams.surereturnCount = content.count - content.returnCount;
    this.ReturnParams.returnCount = content.returnCount;//已退量
    this.ReturnParams.totalPrice = content.totalPrice;//金额
    this.ReturnParams.ipCode = content.ipCode;
    this.ReturnParams.ipId = content.ipId;
    this.ReturnParams.partsId = content.partsId;
    this.ReturnParams.stockId = content.stockId;
    this.insideRetreat = this.fb.group({
      count: ['1', [Validators.required, Validators.min(1), Validators.max(this.ReturnParams.surereturnCount)]],
    });
    this.formErrors.count.max = `最大数量不能大于${this.ReturnParams.surereturnCount}`;
    FormValidate.onValueChanged(this.insideRetreat, this.formErrors);
  }
  // 修改数量
  changeCount(event) {
    this.ReturnParams.totalPrice = Math.round((event * this.ReturnParams.price) * 100) / 100;
  }
  // 提交
  // insideRetreatRecordDtos = [];
  pickinginfo() {
    this.ReMaterialModal.hide();





    // this.insideRetreatRecordDtos.push(this.ReturnParams);
    this.returnOk.count = this.ReturnParams.count
    this.returnOk.surereturnCount = this.ReturnParams.surereturnCount
    this.returnOk.depotName = this.ReturnParams.depotName
    this.returnOk.depotPosName = this.ReturnParams.depotPosName
    this.returnOk.inventory = this.ReturnParams.inventory
    this.returnOk.ipCode = this.ReturnParams.ipCode
    this.returnOk.ipId = this.ReturnParams.ipId
    this.returnOk.partsBrandName = this.ReturnParams.partsBrandName
    this.returnOk.partsCode = this.ReturnParams.partsCode
    this.returnOk.partsId = this.ReturnParams.partsId
    this.returnOk.partsName = this.ReturnParams.partsName
    this.returnOk.partsSpec = this.ReturnParams.partsSpec
    this.returnOk.partsTypeName = this.ReturnParams.partsTypeName
    this.returnOk.partsUnit = this.ReturnParams.partsUnit
    this.returnOk.price = this.ReturnParams.price
    this.returnOk.returnCount = this.ReturnParams.returnCount
    this.returnOk.stockId = this.ReturnParams.stockId
    this.returnOk.totalPrice = this.ReturnParams.totalPrice


    this.stInsideRetreats.ipCode = this.ReturnParams.ipCode;
    this.stInsideRetreats.ipId = this.ReturnParams.ipId;
    this.stInsideRetreats.partsId = this.ReturnParams.partsId;
    this.stInsideRetreats.price = this.ReturnParams.price;
    this.stInsideRetreats.retreatCount = this.ReturnParams.count;
    this.stInsideRetreats.stockId = this.ReturnParams.stockId;
    this.stInsideRetreats.totalPrice = this.ReturnParams.totalPrice;


    this.insideRetreatHangDto.ipCode = this.ReturnParams.ipCode;
    if (this.stInsideRetreat.length > 0) {
      this.printData.splice(1,1,this.ReturnParams);
      this.stInsideRetreat.splice(1,1,this.stInsideRetreats);
      this.insideRetreatHangDto.stInsideRetreats.splice(1,1,this.stInsideRetreats);
      this.ReturnParams = new ReturnParams();
      this.stInsideRetreats = new stInsideRetreats();

    } else {
      this.printData.push(this.ReturnParams);
      this.stInsideRetreat.push(this.stInsideRetreats);
      this.insideRetreatHangDto.stInsideRetreats.push(this.stInsideRetreats);
      this.ReturnParams = new ReturnParams();
      this.stInsideRetreats = new stInsideRetreats();
    }

  }
  // 删除一条
  deleteItem() {
    // this.insideRetreatRecordDtos.splice(i, 1);
    this.returnOk = new returnOk();
    this.stInsideRetreat.splice(1, 1);
    this.insideRetreatHangDto.stInsideRetreats.splice(1, 1);

  }
  //生成内部单
  printData = [];
  public stInsideRetreat: Array<stInsideRetreats> = new Array<stInsideRetreats>();
  public Generatestorage() {

    this.service.batchgenerateinsideretreat(this.stInsideRetreat).then(
      res => {
        console.log(res);

        this.returnOk = new returnOk();
        this.stInsideRetreat = [];
        this.getfindpackusers();
        this.supplierFormInit();
        this.gethanglogs()
        this.staticModal.show();
      }
    ).catch(
      err => {
        console.log(err);
      }
      )

  }
  //挂单
  public Postersorders() {
    //点击挂单

    console.log(this.insideRetreatHangDto);
    this.service.insideretreataddhang(this.insideRetreatHangDto).then(
      res => {
        console.log(res);
        
        this.insideRetreatHangDto.stInsideRetreats = [];
        this.returnOk = new returnOk();
        // this.insideRetreatRecordDtos = [];
        this.stInsideRetreat = [];
        this.getfindpackusers();
        this.supplierFormInit();
        this.gethanglogs();
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
  }
  // 获取挂单列表
  public gethanglog = new gethanglogs()
  public hanglog = {
    result: [],
    totalCount: 0
  };
  gethanglogs() {
    console.log(this.gethanglog);
    this.service.gethanglogs(this.gethanglog).then(
      res => {
        console.log(res);
        this.hanglog.result = res.result;
        this.hanglog.totalCount = res.totalCount;
        this.hangOrderListCount = res.totalCount;
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
  }
  //点击作废
  giveuphanglogs(item) {
    console.log(item);
    this.service.deletehang(item.hangId).then(
      res => {
        console.log(res)
        this.gethanglogs();
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
  }
  //选择挂单加载页面
  getHanglogInfo(item) {
    this.dropdownShow = true;
    this.returnOk = new returnOk();
    // this.insideRetreatRecordDtos = []
    this.printData = [];
    this.insideRetreatHangDto.packDepart = item.departName
    this.insideRetreatHangDto.packUserName = item.implUserName
    this.service.getfindinsideretreats(item.orderNo).then(resp => {
      this.dropdownShow = false;
      console.log(resp);
      let data = resp.result.insideRetreatRecordDtos;
      this.interlist = resp.result.insidePackInfoDtos;
      this.insideRetreatHangDto.ipCode = data[0].ipCode;
      this.interSearchParam.ipCode = data[0].ipCode;
      this.interSearchParam.userId = data[0].packUserId;
      this.interSearchParam.departId = data[0].depId;
      data.map((obj) => {
        if (obj.hang) {
          this.stInsideRetreats.ipCode = obj.ipCode
          this.stInsideRetreats.ipId = obj.ipId
          this.stInsideRetreats.partsId = obj.partsId
          this.stInsideRetreats.price = obj.price
          this.stInsideRetreats.retreatCount = obj.retreatCount
          this.stInsideRetreats.stockId = obj.stockId
          this.stInsideRetreats.totalPrice = obj.totalPrice
          this.stInsideRetreat.push(this.stInsideRetreats);
          this.insideRetreatHangDto.stInsideRetreats.push(this.stInsideRetreats);
          // this.insideRetreatRecordDtos.push(obj);
          this.returnOk = obj;
          this.printData.push(obj);
          this.stInsideRetreats = new stInsideRetreats();
          console.log(obj);
        }
      })
    }).catch(resp => {
      console.log(resp)
    })
    // this.getfindinsideretreats(item.orderNo);
  }
  //添加退料
  public addinterUnmaterial(item) {
    console.log(item)
    //每次添加的时候像其中数组中push数据
  }
  //删除
  public deleteInterUnmaterial(item) {
    console.log(item);
  }
  // 验证
  public supplierFormInit() {
    this.insideRetreat = this.fb.group({
      partsCode: ['', []],
      partsName: ['', []],
      partsBrandName: ['', []],
      partsSpec: ['', []],
      partsUnit: ['', []],
      price: ['', []],
      depotName: ['', []],
      depotPosName: ['', []],
      partsTypeName: ['', []],
      count: ['', [Validators.required, Validators.min(1), Validators.max(this.ReturnParams.inventory)]],
      totalPrice: ['', []],
    });

    FormValidate.onValueChanged(this.insideRetreat, this.formErrors);
  }
  //错误信息
  public formErrors = {
    'count': {
      'required': ' 数量不能为空',
      'min': '数量不能小于1条',
      'max': '',
    }
  }

}
