import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../app.animation'
import { helpers } from '../../../../privaders/helper';
import { partsOutService } from '../parts-out.service';
import { insidePackDto, insidePack, hanglogs, hanginsidepackList, print } from './inter-material'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { findpartsCode, findpartsName, intermaterial, dePotPosArray } from '../parts-out'

import { FormValidate } from '../../../../privaders/fromValidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
@Component({
  moduleId: module.id,
  selector: 'inter-material',
  templateUrl: 'inter-material.component.html',
  styleUrls: ['inter-material.component.scss'],
  animations: [flyIn]
})
export class InterMaterialComponent implements OnInit, AfterViewInit {
  @ViewChild('lgModal') public _lgModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  public insidePack = new insidePack();
  public insidePackDto = new insidePackDto();
  public intermaterial = new intermaterial();

  public findpartsCode = new findpartsCode();

  public findpartsName = new findpartsName();

  public dePotPosArray = new dePotPosArray();
  public addinsidepack: FormGroup;

  public print = new print();

  packOrgId;
  packUserId;
  constructor(
    public _helpers: helpers,
    public _partsOutService: partsOutService,
    public fb: FormBuilder,
  ) {

  }
  ngOnInit() {
    this.getpackUserId();
    this.interFormInit();
    this.gethanglogs();
  }
  ngAfterViewInit() {
  }

  public dropdownShow:boolean = false;
  public hangOrderListCount:number;
  pageChanged(event){
    this.hanglogs.setPage(event.page);
    this._partsOutService.gethanglogs(this.hanglogs).then(
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
  //获取领料人id
  public packUserList = [];
  public getpackUserId() {
    this._partsOutService.findusersinorg().then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.packUserId = res.result[0].userId;
          this.print.collector = res.result[0].userName;
          this.packUserList = res.result;
          this.getpackOrgId(this.packUserId);
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      );
  }
  //获取部门id
  public departList = [];
  public getpackOrgId(packUserId) {
    if (packUserId) {
      this._partsOutService.departments(packUserId).then(
        (res) => {
          console.log(res);
          if (res.errcode == 0) {
            this.departList = res.result;
            this.packOrgId = res.result[0].depId;
            this.print.department = res.result[0].depName;
          }
        }
      ).catch(
        (err) => {
          console.log(err);
        }
        )
    }
  }
  //领料人改变获取部门id
  packUserIdchange(id, event) {
    this.getpackOrgId(id);
    this.print.collector = event.target.selectedOptions[0].innerHTML;
  }
  // 获取部门的name
  getpackOrgName(event) {
    this.print.department = event.target.selectedOptions[0].innerHTML;
  }
  //获取配件编码
  findpartsCodeData = {
    result: [],
    totalCount: 0
  };
  focusPartsCode() {
    $('.faCode ').addClass('fa-spinner fa-spin');
    this._partsOutService.getfindpartsCode(this.findpartsCode).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.findpartsCodeData.result = [];
          this.findpartsCodeData.result = res.result;
          this.findpartsCodeData.totalCount = res.totalCount;
          $('.faCode ').removeClass('fa-spinner fa-spin');
        }

      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //配件编码失去焦点
  blurPartsCode() {
    FormValidate.validate(this.addinsidepack, this.formErrors);
    $('.faCode  ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this.findpartsCodeData.result = [];
      this.findpartsCodeData.totalCount = 0;
      
    }, 1000)
  }
  // 分页
  findpartspageChanged(event) {
    this.findpartsCode.setPage(event.page);
  }
  findpartsNamepageChanged(event){
    this.findpartsName.setPage(event.page);
  }
  // 配件名称
  findpartsNameData = {
    result: [],
    totalCount: 0
  }
  focusPartsName() {
    $('.faName ').addClass('fa-spinner fa-spin');
    this._partsOutService.getfindpartsCode(this.findpartsCode).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.findpartsNameData.result = [];
          this.findpartsNameData.result = res.result;
          this.findpartsNameData.totalCount = res.totalCount;
          $('.faName ').removeClass('fa-spinner fa-spin');
        }

      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  blurPartsName(){
    FormValidate.validate(this.addinsidepack, this.formErrors);
    $('.faName  ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this.findpartsNameData.result = [];
      this.findpartsNameData.totalCount = 0;
    }, 1000)
  }
  //配件编码选取一条
  public depotPos = [];
  obj = {
    partsId: '',
    depotId: ''
  }
  partsCodeItem(item) {
    let data = item;
    this._partsOutService.stockparts({ partsId: data.partsId }).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0 && res['result']) {
          this.depotPos = [];
          this.findpartsName.partsName = res.result.parts.partsName;
          this.findpartsCode.partsCode = res.result.parts.partsCode;
          this.intermaterial.brandName = res.result.parts.brandName;
          this.intermaterial.inventory = res.result.inventory;
          this.intermaterial.partsCode = res.result.parts.partsCode;
          this.intermaterial.partsName = res.result.parts.partsName;
          this.intermaterial.partsSpec = res.result.parts.partsSpec;
          this.intermaterial.partsTypeName = res.result.parts.partsTypeName;
          this.intermaterial.depotName = res.result.depotName;
          this.intermaterial.depotPosName = res.result.depotPosName;
          this.intermaterial.depots = res.result.depots;
          this.intermaterial.depotId = res.result.depotId;
          this.intermaterial.depotPosId = res.result.depotPosId;
          this.intermaterial.inventory = res.result.inventory;
          this.intermaterial.partsUnit = res.result.parts.partsUnit;
          this.intermaterial.sellPrice = res.result.parts.sellPrice;
          // this.newpartsSend.count = 1;
          this.intermaterial.totalPrice = this.intermaterial.count * this.intermaterial.sellPrice;
          this.insidePack.partsId = res.result.partsId;
          this.obj.partsId = res.result.partsId;
          this.dePotPosArray.depotPosId = res.result.depotPosId;
          this.dePotPosArray.depotPosName = res.result.depotPosName;
          this.depotPos.push(this.dePotPosArray);




          this.addinsidepack = this.fb.group({
            partsCode: ['', [Validators.required]],
            partsName: ['', [Validators.required]],
            partsTypeName: ['', [Validators.required]],
            brandName: ['', [Validators.required]],
            partsSpec: ['', [Validators.required]],
            partsUnit: ['', []],
            depotId: ['', [Validators.required]],
            depotPosId: ['', []],
            inventory: ['', [Validators.required]],
            count: ['1', [Validators.required, Validators.min(1), Validators.max(this.intermaterial.inventory)]],
            sellPrice: ['0.00', [Validators.required, Validators.min(1)]],
            totalPrice: ['', [Validators.required]],
          });
          this.formErrors.count.max = `数量不能大于${this.intermaterial.inventory}`;
          FormValidate.onValueChanged(this.addinsidepack, this.formErrors);
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //仓库change
  getDepotPosName(depotId) {
    let id = depotId.target.value;
    let text = depotId.target.selectedOptions[0].innerHTML;
    // console.log(depotId,id, '111111', text);
    this.depotPos = [];
    this.obj.depotId = id;
    console.log(this.obj);
    this._partsOutService.getstock(this.obj).then(
      (res) => {
        console.log(res);
        this.intermaterial.depotPosId = res.result.depotPosId;
        this.depotPos = res.result.depotPoss;
        this.intermaterial.inventory = res.result.inventory;
        this.intermaterial.depotName = text;
        this.intermaterial.depotPosName = res.result.depotPosName;
        this.intermaterial.count = 1;
        this.intermaterial.totalPrice = this.intermaterial.count * this.intermaterial.sellPrice;




        this.addinsidepack = this.fb.group({
          partsCode: [this.intermaterial.partsCode, []],
          partsName: [this.intermaterial.partsName, []],
          partsTypeName: [this.intermaterial.partsTypeName, []],
          brandName: [this.intermaterial.brandName, []],
          partsSpec: [this.intermaterial.partsSpec, []],
          partsUnit: [this.intermaterial.partsUnit, []],
          depotId: [this.intermaterial.depotId, []],
          depotPosId: [this.intermaterial.depotPosId, []],
          inventory: [this.intermaterial.inventory, []],
          count: ['1', [Validators.required, Validators.min(1), Validators.max(this.intermaterial.inventory)]],
          sellPrice: [this.intermaterial.sellPrice, [Validators.required, Validators.min(1)]],
          totalPrice: [this.intermaterial.totalPrice, []],
        });
        this.formErrors.count.max = `数量不能大于${this.intermaterial.inventory}`;
        FormValidate.onValueChanged(this.addinsidepack, this.formErrors);
        console.log(this.intermaterial);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //数量改变
  sellOutDepotCount(event) {
    this.intermaterial.totalPrice = Math.round((this.intermaterial.count * this.intermaterial.sellPrice) * 100) / 100;
  }
  // 价格改变
  priceChange(event) {
    this.intermaterial.totalPrice = Math.round((this.intermaterial.count * this.intermaterial.sellPrice) * 100) / 100;
  }
  //提交并关闭
  getmaterialTable = [];
  submitAndClose() {
    this.getmaterialTable.push(this.intermaterial);
    this.print.sum = this.intermaterial.totalPrice;
    this.print.printData.push(this.intermaterial);
    this.intermaterial = new intermaterial();
    let obj = this.addinsidepack.value;
    this.insidePack.packCount = obj.count;
    this.insidePack.price = obj.sellPrice;
    this.insidePack.stockId = obj.depotPosId;
    this.insidePack.totalPrice = obj.totalPrice;
    this.insidePack.packUserId = this.packUserId;
    this.insidePack.packOrgId = this.packOrgId;
    console.log(this.getmaterialTable);
    this.insidePackDto.insidePacks.push(this.insidePack);
    this.insidePack = new insidePack();
    this.findpartsCode = new findpartsCode();
    this.findpartsName = new findpartsName();
    this.intermaterial = new intermaterial();
    this._lgModal.hide();
  }
  //删除一条
  deleteItem(i) {
    this.getmaterialTable.splice(i, 1);
    this.insidePackDto.insidePacks.splice(i, 1);
    this.print.printData.splice(i, 1);
  }
  //生成销售出库单
  interOutBill() {
    console.log(this.insidePackDto);
    this._partsOutService.addinsidepack(this.insidePackDto).then(
      (res) => {
        console.log(res);
        this.getmaterialTable = [];
        this.staticModal.show();
        this.gethanglogs();
        this.insidePackDto = new insidePackDto();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //挂单
  hanginsidepack() {
    this._partsOutService.hanginsidepack(this.insidePackDto).then(
      (res) => {
        console.log(res);
        this.gethanglogs();
        this.getmaterialTable = [];
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  public hanglogs = new hanglogs();
  hanglogsInfo = {
    totalCount: 0,
    result: []
  };
  //获取挂单
  gethanglogs() {
    this._partsOutService.gethanglogs(this.hanglogs).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.hanglogsInfo = res;
          this.hangOrderListCount = res.totalCount;
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //点击挂单显示数据
  hanginsidepackList = new hanginsidepackList();
  showHanglogItem(item) {
    console.log(item);
    this.dropdownShow = true;
    this._partsOutService.gethanginsidepack({ hangId: item.hangId }).then(
      (res) => {
        this.dropdownShow = false;
        this.getmaterialTable = [];
        console.log(res);
        this.packUserId = res.result[0].packUserId;
        this.packOrgId = res.result[0].packOrgId;
        this.insidePackDto.hangId = res.result[0].hangId;
        let data = res.result;
        data.map((obj, key) => {
          this.hanginsidepackList.partsCode = obj.parts.partsCode;
          this.hanginsidepackList.partsName = obj.parts.partsName;
          this.hanginsidepackList.partsTypeName = obj.parts.partsTypeName;
          this.hanginsidepackList.brandName = obj.parts.brandName;
          this.hanginsidepackList.partsSpec = obj.parts.partsSpec;
          this.hanginsidepackList.partsUnit = obj.parts.partsUnit;
          this.hanginsidepackList.depotName = obj.depotName;
          this.hanginsidepackList.depotPosName = obj.depotPosName;
          this.hanginsidepackList.inventory = obj.inventory;
          this.hanginsidepackList.count = obj.packCount;
          this.hanginsidepackList.sellPrice = obj.price;
          this.hanginsidepackList.totalPrice = obj.totalPrice;
          this.getmaterialTable.push(this.hanginsidepackList);
          this.insidePack.packCount = obj.packCount;
          this.insidePack.packOrgId = obj.packOrgId;
          this.insidePack.packUserId = obj.packUserId;
          this.insidePack.partsId = obj.parts.partsId;
          this.insidePack.price = obj.price;
          this.insidePack.stockId = obj.depotPosId;
          this.insidePack.totalPrice = obj.totalPrice;
          this.insidePackDto.insidePacks.push(this.insidePack);
          this.insidePack = new insidePack();
        })
        this.gethanglogs();
        // this.getmaterialTable = data;
        // this.hanginsidepackList.partsCode =

      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //删除挂单
  public deletehanglog(event): void {
    console.log(event);
    this._partsOutService.deletehang({ hangId: event.hangId, hangType: 5 }).then(
      (res) => {
        console.log(res);
        this.gethanglogs();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  // 关闭弹框
  closeModal(){
    this.findpartsCode = new findpartsCode()
    this.findpartsName = new findpartsName();
    this.intermaterial = new intermaterial();
  }







  //From 初始化
  public interFormInit() {
    this.addinsidepack = this.fb.group({
      partsCode: ['', [Validators.required]],
      partsName: ['', [Validators.required]],
      partsTypeName: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      partsSpec: ['', [Validators.required]],
      partsUnit: ['', []],
      depotId: ['', [Validators.required]],
      depotPosId: ['', []],
      inventory: ['', [Validators.required]],
      count: ['', [Validators.required, Validators.min(1)]],
      sellPrice: ['', [Validators.required, Validators.min(1)]],
      totalPrice: ['', [Validators.required]],

    });
    FormValidate.onValueChanged(this.addinsidepack, this.formErrors);
  }
  public formErrors = {
    'partsCode': {
      'required': '配件编码不能为空',
      // 'minlength': 'laest code min six'
    },
    'partsName': {
      'required': ' 配件名称不能为空',
      // 'minlength': 'laest code min six'
    },
    'count': {
      'required': '数量不能为空',
      'min': '数量不能小于1',
      'max': ''
    },
    'sellPrice': {
      'required': '单价不能为空',
      'min': '单价不能小于1',
    }
  }
  dyHtml() {
    this.staticModal.hide();
    this._helpers.displaynone();
    window.print();
    this.print = new print();
    this._helpers.displayblock();
  }
  offprint() {
    this.staticModal.hide();
    this.print = new print();
  }
  public items: string[] = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];

  public onHidden(): void {
    console.log('Dropdown is hidden');
  }
  public onShown(): void {
    console.log('Dropdown is shown');
  }
  public isOpenChange(): void {
    console.log('Dropdown state is changed');
  }
}
