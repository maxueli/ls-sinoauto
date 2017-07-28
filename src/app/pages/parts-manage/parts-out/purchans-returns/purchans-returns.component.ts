import { Component, OnInit, ViewChild } from '@angular/core';
import { FormValidate } from '../../../../privaders/fromValidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { simAnim, fadeIn, flyIn } from '../../../../app.animation'
import { helpers } from '../../../../privaders/helper'
import { hanglogs, purchaseReturn, purchretreataddhang, stPurchRetreat, findSuppliers, findsupplier, findpurchcode, findTableIn, findModelIn, findTableOut, print } from './purchans';
import { partsOutService } from '../parts-out.service'
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  moduleId: module.id,
  selector: 'purchans-returns',
  templateUrl: 'purchans-returns.component.html',
  styleUrls: ['purchans-returns.component.scss'],
  animations: [flyIn]
})
export class PurchansReturnsComponent implements OnInit {
  @ViewChild('lgModal') public _lgModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  suppliertotal: number = 0;
  supplierindex: number = 1;
  public findSuppliers = new findSuppliers();

  public purchretreataddhang = new purchretreataddhang();

  public print = new print();
  constructor(
    public _helpers: helpers,
    public _partsOutService: partsOutService,
    public fb: FormBuilder
  ) {

  }
  ngOnInit() {
    this.purchansFormInit();
    this.getHanglogs();
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
  //获取供应商名称
  getsupplierList = [];
  getsupplierName() {
    $('.fa-search').addClass('fa-spinner fa-spin');
    this._partsOutService.findSuppliers(this.findSuppliers).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.getsupplierList = res.result;
          $('.fa-search').removeClass('fa-spinner fa-spin');
          this.suppliertotal = res.totalCount;
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //供应商名称失去焦点
  blursupplierName() {
    setTimeout(() => {
      this.getsupplierList = [];
      $('.fa-search').removeClass('fa-spinner fa-spin');
    }, 500)

  }
  //供应商名称分页
  supplierPage(event) {
    console.log(event);
    this.findSuppliers.setPage(event.page);
    this.getsupplierName();
  }
  //点击供应商获取itemId
  findsupplier = new findsupplier();
  getsupplierId(item) {
    this.getsupplierList = [];
    this.findSuppliers.supplierName = item.supplierName;
    this.purchretreataddhang.supplierName = item.supplierName;
    this.findsupplier.SupplierId = item.supplierId;
    this.findpurchcodesbysupplier();
  }
  //单号
  purchCodeList = [];
  findpurchcodesbysupplier() {
    this._partsOutService.findpurchcodesbysupplier(this.findsupplier).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.purchCodeList = res.result;
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //单号选择
  purchCode: string = '';
  info: string = '';
  setInfo() {
    this.info = this.purchCode;
  }





  findpurchcode = new findpurchcode();//单号
  public findTableIn = new findTableIn();//入库信息
  findTableInShow: boolean = false;
  purchItemCode(event) {
    console.log(event);
    console.log(this.purchCode);
    if (event) {

      console.log(event);
      this.findpurchcode.purchCode = event;
      this._partsOutService.findpurchbypurchcode(this.findpurchcode).then(
        (res) => {
          console.log(res)
          if (res.errcode == 0) {
            this.findTableInShow = true;
            this.findTableIn = res.result.purchInfoDtos[0];
            this.purchretreataddhang.purchCode = res.result.purchInfoDtos[0].purchCode;
          }
        }
      ).catch(
        (err) => {
          console.log(err);
        }
        )
    } else {
      console.log(event);
      this.findTableInShow = false;
      this.findTableIn = new findTableIn;
    }

  }
  //获取弹框数据
  public findModelIn = new findModelIn();
  getModelData() {
    // $('.purchansIn ').setAttribute('disabled','disabled')
    this.findModelIn.count = this.findTableIn.count - this.findTableIn.returnCount;
    this.findModelIn.depotName = this.findTableIn.depotName;
    this.findModelIn.depotPosName = this.findTableIn.depotPosName;
    this.findModelIn.partsBrandName = this.findTableIn.partsBrandName;
    this.findModelIn.partsCode = this.findTableIn.partsCode;
    this.findModelIn.partsId = this.findTableIn.partsId;
    this.findModelIn.partsName = this.findTableIn.partsName;
    this.findModelIn.partsSpec = this.findTableIn.partsSpec;
    this.findModelIn.partsTypeName = this.findTableIn.partsTypeName;
    this.findModelIn.partsUnit = this.findTableIn.partsUnit;
    this.findModelIn.price = this.findTableIn.price;
    this.findModelIn.purchCode = this.findTableIn.purchCode;
    this.findModelIn.purchId = this.findTableIn.purchId;
    this.findModelIn.taxPrice = this.findTableIn.taxPrice;
    this.findModelIn.returnCount = this.findTableIn.returnCount;
    this.findModelIn.totalPrice = Math.round((this.findModelIn.count * this.findTableIn.price) * 100) / 100;
    this.findModelIn.totalTaxPrice = Math.round((this.findModelIn.count * this.findTableIn.taxPrice) * 100) / 100;
    this.purchansFormInit();
    console.log(this.findModelIn);

  }
  //数量改变
  purchansCount(event) {
    this.findModelIn.totalTaxPrice = Math.round((event * this.findModelIn.taxPrice) * 100) / 100;
    this.findModelIn.totalPrice = Math.round((event * this.findModelIn.price) * 100) / 100;
  }
  purchansCountBlur() {
    FormValidate.validate(this.depotOut, this.formErrors);
  }
  //关闭弹框
  lgModalClose() {
    this._lgModal.hide();
    this.findModelIn = new findModelIn();
    console.log(this.findModelIn);
  }
  //弹框提交并关闭
  public findTableOut = new findTableOut();//退库信息
  findTableOutShow: boolean = false;
  modelSbumit() {
    
    this.purchaseReturnList = [];
    this.purchretreataddhang.stPurchRetreats = [];

    this.findTableOut = this.depotOut.value;
    this._lgModal.hide();
    this.findTableOutShow = true;
    this.findTableOut.partsUnit = this.findModelIn.partsUnit;
    console.log(this.findTableOut, this.depotOut.value);
    this.findModelIn = new findModelIn();


    this.purchaseReturn.partsId = this.findTableIn.partsId
    this.purchaseReturn.purchId = this.findTableIn.purchId
    this.purchaseReturn.stockId = this.findTableIn.stockId
    this.purchaseReturn.purchCode = this.findTableIn.purchCode
    this.purchaseReturn.retreatCount = this.findTableOut.count
    this.purchaseReturn.price = this.findTableOut.price;
    this.purchaseReturn.taxPrice = this.findTableOut.taxPrice
    this.purchaseReturn.totalPrice = this.findTableOut.totalPrice
    this.purchaseReturn.totalTaxPrice = this.findTableOut.totalTaxPrice
    this.purchaseReturnList.push(this.purchaseReturn);


    this.stPurchRetreat.partsId = this.findTableIn.partsId
    this.stPurchRetreat.purchId = this.findTableIn.purchId
    this.stPurchRetreat.stockId = this.findTableIn.stockId
    this.stPurchRetreat.retreatCount = this.findTableOut.count;
    this.stPurchRetreat.price = this.findTableOut.price;
    this.stPurchRetreat.taxPrice = this.findTableOut.taxPrice;
    this.stPurchRetreat.totalPrice = this.findTableOut.totalPrice;
    this.stPurchRetreat.totalTaxPrice = this.findTableOut.totalTaxPrice;
    this.purchretreataddhang.stPurchRetreats.push(this.stPurchRetreat);
  }
  //删除退库信息
  deletefindTableOut() {
    this.findTableOutShow = false;
    this.findTableOut = new findTableOut();
  }
  //弹框验证
  public depotOut: FormGroup;
  public purchansFormInit() {
    this.depotOut = this.fb.group({
      partsCode: ['', []],
      partsName: ['', []],
      partsTypeName: ['', []],
      partsBrandName: ['', []],
      partsSpec: ['', []],
      depotName: ['', []],
      depotPosName: ['', []],
      totalPrice: ['', []],
      totalTaxPrice: ['', []],
      taxPrice: ['', []],
      price: ['', []],
      count: ['1', [Validators.required, Validators.min(1), Validators.max(this.findTableIn.count - this.findTableIn.returnCount)]],
    });
    FormValidate.onValueChanged(this.depotOut, this.formErrors);
  }
  //错误信息
  public formErrors = {
    'count': {
      'required': ' 数量不能为空',
      'min': '数量不能小于1条',
      'max': '数量不能大于库存数量'
      // 'minlength': 'laest code min six'
    },
  }
  //生成采购退库单
  purchaseReturnList = [];
  public purchaseReturn = new purchaseReturn();
  createBill() {
    this._partsOutService.batchgeneratepurchretreat(this.purchaseReturnList).then(
      (res) => {
        console.log(res);
        
        this.purchaseReturn = new purchaseReturn();
        this.purchaseReturnList = [];
        this.oninit();
        this.getHanglogs();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )

  }
  //挂单
  stPurchRetreat = new stPurchRetreat();
  hangBill() {
    
    console.log(this.purchretreataddhang);
    this._partsOutService.purchretreataddhang(this.purchretreataddhang).then(
      (res) => {
        console.log(res);
        this.stPurchRetreat = new stPurchRetreat();
        this.oninit();
        this.getHanglogs();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //页面初始化
  oninit() {
    this.findSuppliers = new findSuppliers();
    this.purchCode = '';

    this.findsupplier = new findsupplier();
    this.findTableIn = new findTableIn();
    this.purchCodeList = [];

    this.findpurchcode = new findpurchcode();
    this.findTableOut = new findTableOut();
    this.findTableInShow = false;
    this.findTableOutShow = false;

  }
  //挂单信息
  hanglogs = new hanglogs();
  hangList = {
    result: [],
    totalCount: 0
  };
  getHanglogs() {
    this._partsOutService.gethanglogs(this.hanglogs).then(
      (res) => {
        console.log(res);
        this.hangList.result = res.result;
        this.hangList.totalCount = res.totalCount;
        this.hangOrderListCount =  res.totalCount;

      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  // 作废挂单
  deletehanglog(item) {
    console.log(item);
    this._partsOutService.deletehanglog(item.hangId).then(
      res => {
        console.log(res)
        this.getHanglogs();
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
  }
  // 挂单加载页面

  showHanglogItem(item) {
    console.log(item);
    this.dropdownShow = true;
    this._partsOutService.findpurchbypurchcode({ purchCode: item.orderNo }).then(
      res => {
        this.dropdownShow = false;
        console.log(res)
        this.findTableIn = res.result.purchInfoDtos[0];
        console.log(this.findTableIn);
        this.findTableInShow = true;

        let data = res.result.purchRetreatRecordDto;
        this.findSuppliers.supplierName = data[0].supplierName;
        this.findsupplier.SupplierId = data[0].supplierId;
        this.findpurchcodesbysupplier();

        this.findpurchcode.purchCode = data[0].purchCode;
        this.purchCode = data[0].purchCode;

        this.purchretreataddhang.purchCode = data[0].purchCode;
        this.purchretreataddhang.supplierName = data[0].supplierName;
        data.map((obj) => {
          if (obj.hang) {
            this.findTableOutShow = true;
            this.findTableOut = obj;
            //生成单号 
            this.purchaseReturn.partsId = obj.partsId;
            this.purchaseReturn.price = obj.price;
            this.purchaseReturn.purchCode = obj.purchCode;
            this.purchaseReturn.purchId = obj.purchId;
            this.purchaseReturn.retreatCount = obj.retreatCount;
            this.purchaseReturn.stockId = obj.stockId;
            this.purchaseReturn.taxPrice = obj.taxPrice;
            this.purchaseReturn.totalPrice = obj.totalPrice;
            this.purchaseReturn.totalTaxPrice = obj.totalTaxPrice;
            this.purchaseReturnList.push(this.purchaseReturn);
            this.purchaseReturn = new purchaseReturn();
            // 挂单
            this.stPurchRetreat.partsId = obj.partsId
            this.stPurchRetreat.price = obj.price
            this.stPurchRetreat.purchId = obj.purchId
            this.stPurchRetreat.retreatCount = obj.retreatCount
            this.stPurchRetreat.stockId = obj.stockId
            this.stPurchRetreat.taxPrice = obj.taxPrice
            this.stPurchRetreat.totalPrice = obj.totalPrice
            this.stPurchRetreat.totalTaxPrice = obj.totalTaxPrice
            this.purchretreataddhang.stPurchRetreats.push(this.stPurchRetreat);
            this.stPurchRetreat = new stPurchRetreat();
            console.log(this.findTableOut);
          }
        })
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
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
