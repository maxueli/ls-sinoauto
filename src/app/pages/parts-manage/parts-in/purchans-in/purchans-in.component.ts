import { Component, ViewChild } from '@angular/core';
import { FormValidate } from '../../../../privaders/fromValidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { simAnim, fadeIn, flyIn } from '../../../../app.animation'
import { helpers } from '../../../../privaders/helper'
import { PurchansService } from './purchansService'
import { ModalDirective } from 'ngx-bootstrap'
import { print,hanglog, purchDto, purchs, findSuppliers, findpartsCode, findpartsName, dePotPosArray, newpartsSend, carModel } from './purchansModal'
@Component({
  moduleId: module.id,
  selector: 'purchans-in',
  templateUrl: 'purchans-in.component.html',
  styleUrls: ['purchans-in.component.scss'],
  animations: [flyIn]
})
export class PurchansInComponent {
  @ViewChild('lgModal') public _lgModal: ModalDirective;
  @ViewChild('dataModal') public dataModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  findpartsCode = new findpartsCode();
  findpartsName = new findpartsName();
  newpartsSend = new newpartsSend();
  dePotPosArray = new dePotPosArray();

  public print = new print();
  constructor(
    public _helpers: helpers,
    public _PurchansService: PurchansService,
    public fb: FormBuilder
  ) {

  }
  ngOnInit() {
    this.gethanglogs();
    this.supplierFormInit();
    // this.purchansFormInit();
  }
   public dropdownShow:boolean = false;
  public hangOrderListCount:number;
  pageChanged(event){
    this.hanglog.setPage(event.page);
    this._PurchansService.gethanglogs(this.hanglog).then(
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
    console.log(this.print);
    this.staticModal.hide();
    this._helpers.displaynone();
    window.print();
    this.print = new print();
    this._helpers.displayblock();
  }
  offprint(){
    this.staticModal.hide();
    this.print = new print();
  }
  //供应商名称获取焦点
  findSuppliers = new findSuppliers();
  getsupplierList = {
    result: [],
    totalCount: 0
  };
  supplierfocus() {
    $('.fa-search').addClass('fa-spinner fa-spin');
    this._PurchansService.findSuppliers(this.findSuppliers).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.getsupplierList = res;
          $('.fa-search').removeClass('fa-spinner fa-spin');
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //供应商失去焦点
  blursupplierName() {
    setTimeout(() => {
      this.getsupplierList.result = [];
      $('.fa-search').removeClass('fa-spinner fa-spin');

    }, 1000)
  }
  //供应商分页
  supplierPage(event) {
    this.findSuppliers.setPage(event.page);
    this.supplierfocus();

  }
  //获取供应商id
  supplierId: number;
  getsupplierId(item) {
    console.log(item);
    this.getsupplierList.result = [];
    this.findSuppliers.supplierName = item.supplierName;
    this.supplierId = item.supplierId;

    // this.purchansFormInit();
  }
  newSend() {
    this._lgModal.show()
    // this.supplierFormInit();
  }
  //获取配件编码
  findpartsCodeData = {
    totalCount: 0,
    result: []
  };
  _findpartsCodeShow: boolean = false;
  focusPartsCode() {
    $('.faCode ').addClass('fa-spinner fa-spin');
    this._PurchansService.getfindpartsCode(this.findpartsCode).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.findpartsCodeData = {
            totalCount: 0,
            result: []
          };
          this._findpartsCodeShow = true;
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
    FormValidate.validate(this.newpartsModel, this.formErrors);
    $('.faCode  ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this._findpartsCodeShow = false;
    }, 1000)
  }
  //配件编码选取一条
  public depotPos = [];
  obj = {
    partsId: '',
    depotId: '',
    purch: 1
  }
  partsCodeItem(item) {
    console.log(item);
    this._PurchansService.stockparts({ partsId: item.partsId, purch: 1 }).then(
      (res) => {
        console.log(res);
        this.findpartsCode.partsCode = res.result.parts.partsCode;
        this.findpartsName.partsName = res.result.parts.partsCode;
        this.newpartsSend.brandName = res.result.parts.brandName;
        this.newpartsSend.partsCode = res.result.parts.partsCode;
        this.newpartsSend.partsName = res.result.parts.partsName;
        this.newpartsSend.partsTypeName = res.result.parts.partsTypeName;
        this.newpartsSend.partsSpec = res.result.parts.partsSpec;
        this.newpartsSend.partsUnit = res.result.parts.partsUnit;
        this.newpartsSend.depotId = res.result.depotId;
        this.newpartsSend.depotName = res.result.depotName;
        this.newpartsSend.depots = res.result.depots;
        this.newpartsSend.depotPosId = res.result.depotPosId;
        this.newpartsSend.depotPosName = res.result.depotPosName;

        this.purchs.partsId = res.result.partsId;


        this.obj.partsId = res.result.partsId;
        this.dePotPosArray.depotPosId = res.result.depotPosId;
        this.dePotPosArray.depotPosName = res.result.depotPosName;
        this.depotPos.push(this.dePotPosArray);
        console.log(this.newpartsSend);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  // 配件名称获取焦点
  findpartsNameData = {
    totalCount: 0,
    result: []
  };
  findpartsNameDataShow = false;
  focusfindpartsName() {
    $('.faName ').addClass('fa-spinner fa-spin');
    this._PurchansService.getfindpartsCode(this.findpartsName).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.findpartsNameData = {
            totalCount: 0,
            result: []
          };
          this.findpartsNameDataShow = true;
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
  // 配件名称失去焦点
  blurfindpartsName() {
    FormValidate.validate(this.newpartsModel, this.formErrors);
    $('.faName  ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this.findpartsNameDataShow = false;
    }, 1000)
  }
  // 配件编码分页
  partsNamepageChanged(event) {
    this.findpartsName.setPage(event.page);
    this.focusfindpartsName();

  }
  //仓库change
  getDepotPosName(depotId) {
    let id = depotId.target.value;
    let text = depotId.target.selectedOptions[0].innerHTML;
    // console.log(depotId,id, '111111', text);
    this.depotPos = [];
    this.obj.depotId = id;
    console.log(this.obj);
    this.newpartsSend.depotName = text
    this._PurchansService.getstock(this.obj).then(
      (res) => {
        console.log(res);
        this.newpartsSend.depotPosId = res.result.depotPosId;
        this.depotPos = res.result.depotPoss;
        this.newpartsSend.depotPosName = res.result.depotPosName;

      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //数量改变
  countChange(event) {
    this.newpartsSend.totalTaxPrice = Math.round((event * this.newpartsSend.taxPrice) * 100) / 100;
    this.newpartsSend.totalPrice = Math.round((event * this.newpartsSend.taxPrice * 0.85) * 100) / 100;

  }
  //含税单价
  texPriceChange(event) {
    this.newpartsSend.price = Math.round((event * 0.85) * 100) / 100;
    this.newpartsSend.totalTaxPrice = Math.round((event * this.newpartsSend.count) * 100) / 100;
    this.newpartsSend.totalPrice = Math.round((event * 0.85 * this.newpartsSend.count) * 100) / 100;

  }

  //弹框提交并关闭
  newpartsSendList: Array<newpartsSend> = new Array;
  purchs = new purchs();
  purchDto = new purchDto();
  submitAndClose() {
    console.log(this.newpartsSend.isedit);
    if (this.newpartsSend.isedit) {
      console.log(111111111111)
      this.newpartsSendList.splice(this.editpartsindex, 1, this.newpartsSend);
      this.print.printData.splice(this.editpartsindex, 1, this.newpartsSend);
      this._lgModal.hide();
      this.dataModal.hide();
      this.newpartsSend = new newpartsSend();
      this.findpartsCode = new findpartsCode();
      this.findpartsName = new findpartsName();
      this.dePotPosArray = new dePotPosArray();
      this.dePotPosArray = new dePotPosArray();
      // this.findSuppliers = new findSuppliers();
      this.newpartsSend.isedit = false;
    } else {
      console.log(222222222222)
      // console.log(this.newpartsSendList);
      // this.purchs.partsId
      console.log(this.newpartsSend);
      this._lgModal.hide();
      this.dataModal.hide();
      this.newpartsSendList.push(this.newpartsSend);
      this.print.printData.push(this.newpartsSend);
      this.purchs.price = this.newpartsSend.price;
      this.purchs.stockId = this.newpartsSend.depotPosId;
      this.purchs.purchCount = this.newpartsSend.count;
      this.purchs.taxPrice = this.newpartsSend.taxPrice;
      this.purchs.totalPrice = this.newpartsSend.totalPrice;
      this.purchs.totalTaxPrice = this.newpartsSend.totalTaxPrice;
      this.purchs.supplierId = this.supplierId;
      // console.log(this.purchs);
      this.purchDto.purchs.push(this.purchs);
      this.purchs = new purchs();
      // console.log(this.newpartsModel.value, 11111111111, this.newpartsSend);
      this.newpartsSend = new newpartsSend();
      this.findpartsCode = new findpartsCode();
      this.findpartsName = new findpartsName();
      this.dePotPosArray = new dePotPosArray();
      this.dePotPosArray = new dePotPosArray();
      // this.findSuppliers = new findSuppliers();
    }

  }
  //编辑e
  editpartsindex;//下标
  editparts(item, i) {
    console.log(item);
    this.findpartsCode.partsCode = item.partsCode
    this.findpartsName.partsName = item.partsName
    this.editpartsindex = i;
    // this.newpartsSend = this.newpartsSendList[i];
    this.newpartsSend.count = this.newpartsSendList[i].count;
    this.newpartsSend.brandName = this.newpartsSendList[i].brandName;
    this.newpartsSend.depotId = this.newpartsSendList[i].depotId;
    this.newpartsSend.depotName = this.newpartsSendList[i].depotName;
    this.newpartsSend.depotPosId = this.newpartsSendList[i].depotPosId;
    this.newpartsSend.depotPosName = this.newpartsSendList[i].depotPosName;
    this.newpartsSend.depots = this.newpartsSendList[i].depots;
    this.newpartsSend.partsCode = this.newpartsSendList[i].partsCode;
    this.newpartsSend.partsId = this.newpartsSendList[i].partsId;
    this.newpartsSend.partsName = this.newpartsSendList[i].partsName;
    this.newpartsSend.partsSpec = this.newpartsSendList[i].partsSpec;
    this.newpartsSend.partsTypeName = this.newpartsSendList[i].partsTypeName;
    this.newpartsSend.partsUnit = this.newpartsSendList[i].partsUnit;
    this.newpartsSend.price = this.newpartsSendList[i].price;
    this.newpartsSend.supplierId = this.newpartsSendList[i].supplierId;
    this.newpartsSend.taxPrice = this.newpartsSendList[i].taxPrice;
    this.newpartsSend.totalPrice = this.newpartsSendList[i].totalPrice;
    this.newpartsSend.totalTaxPrice = this.newpartsSendList[i].totalTaxPrice;
    this.newpartsSend.isedit = true;
    // this.newpartsSend.depots = depotsList;
    console.log(this.newpartsSend)

  }
  remonewpartsSend(){
    // this.newpartsSend = this.newpartsSendList[this.editpartsindex];
    this.findpartsCode = new findpartsCode()
    this.findpartsName = new findpartsName();
    this.newpartsSend = new newpartsSend();
  }
  //删除
  deleteParts(i) {
    this.newpartsSendList.splice(i, 1);
    this.print.printData.splice(i,1);
  }
  //生成单号

  newBill() {
    this._PurchansService.addpurch(this.purchDto).then(
      (res) => {
        console.log(res);
        this.print.purchBill = res.result;
        this.staticModal.show();
        this.purchDto = new purchDto();
        this.newpartsSendList = [];
        this.findSuppliers = new findSuppliers();
        this.supplierId = 0;
        this.gethanglogs();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }


  //挂单
  posterpushans(item) {
    this._PurchansService.hangpurch(this.purchDto).then(
      (res) => {
        console.log(res);
        this.purchDto = new purchDto();
        this.newpartsSendList = [];
        this.gethanglogs();
        this.findSuppliers = new findSuppliers();
        this.print = new print();
        this.supplierId = 0;

      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //获取挂单信息
  hanglog = new hanglog();
  hanglogList = {
    totalCount: 0,
    result: []
  };
  gethanglogs() {
    this._PurchansService.gethanglogs(this.hanglog).then(
      (res) => {
        this.hanglogList.result = res.result;
        this.hanglogList.totalCount = res.totalCount;
        this.hangOrderListCount = res.totalCount;
        console.log(this.hanglogList);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //选择挂单信息加载数据

  gethanglogsdetail(item) {
    console.log(item);
    this.dropdownShow = true;
    this.purchDto.hangId = item.hangId;
    this._PurchansService.findpurchhang({ hangId: item.hangId }).then(
      (res) => {
        this.dropdownShow = false;
        console.log(res);
        let data = res.result;
        this.findSuppliers.supplierName = data[0].supplierName;
        this.supplierId = data[0].supplierId;

        this.newpartsSendList = data;

        // 打印
        this.print.printData = data;
        this.print.supplierName = data[0].supplierName;;

        data.map((obj) => {
          this.purchs.partsId = obj.partsId;
          this.purchs.price = obj.price;
          this.purchs.purchCount = obj.count;
          this.purchs.stockId = obj.depotPosId;
          this.purchs.supplierId = obj.supplierId;
          this.purchs.taxPrice = obj.taxPrice;
          this.purchs.totalPrice = obj.totalPrice;
          this.purchs.totalTaxPrice = obj.totalTaxPrice;
          // this.newpartsSend.depots.push({depotId:obj.depotId,depotName:obj.depotName});
          this.purchDto.purchs.push(this.purchs);
          this.purchs = new purchs();
        })
        // console.log(this.newpartsSend, this.newpartsSendList);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )

  }
  // 作废挂单
  deletehang = {
    hangId: 0,
    hangType: 10
  }
  giveuphanglogs(item) {
    this.deletehang.hangId = item.hangId;
    this._PurchansService.deletehang(this.deletehang).then(
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
  //错误信息
  newpartsModel: FormGroup;
  partsShowModel: FormGroup;
  public supplierFormInit() {
    this.newpartsModel = this.fb.group({
      partsCode: ['', [Validators.required]],
      partsName: ['', [Validators.required]],
      partsTypeName: ['', [Validators.required]],
      partsBrandName: ['', [Validators.required]],
      partsSpec: ['', [Validators.required]],
      partsUnit: ['', [Validators.required]],
      depotId: ['', [Validators.required]],
      depotPosId: ['', [Validators.required]],
      totalPrice: ['', [Validators.required]],
      totalTaxPrice: ['', [Validators.required]],
      taxPrice: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required]],
      // this.findModelIn.count - this.findModelIn.returnCount
      count: ['', [Validators.required, Validators.min(1)]],
    });
    FormValidate.onValueChanged(this.newpartsModel, this.formErrors);
    this.partsShowModel = this.fb.group({
      taxPrice: ['', [Validators.required, Validators.min(1)]],
      price: ['', []],
      // this.findModelIn.count - this.findModelIn.returnCount
      count: ['', [Validators.required, Validators.min(1)]],
    });
    FormValidate.onValueChanged(this.partsShowModel, this.partsShowErr);
  }

  //错误信息
  public formErrors = {
    'count': {
      'required': ' 数量不能为空',
      'min': '数量不能小于1条',
    },
    'partsCode': {
      'required': ' 配件编码不能为空',
    },
    'partsName': {
      'required': ' 配件名称不能为空',
    },
    'partsTypeName': {
      'required': ' 配件分类不能为空',
    },
    'partsBrandName': {
      'required': ' 品牌不能为空',
    },
    'partsSpec': {
      'required': ' 规格型号不能为空',
    },
    'partsUnit': {
      'required': ' 单位不能为空',
    },
    'depotId': {
      'required': '仓库不能为空',
    },
    'depotPosId': {
      'required': ' 仓位不能为空',
    },

    'taxPrice': {
      'required': ' 含税单价不能为空',
      'min': '含税单价不能小于1元',
    },
    'price': {
      'required': ' 不含税单价不能为空',
    },
    'totalTaxPrice': {
      'required': ' 含税金额不能为空',
    },
    'totalPrice': {
      'required': ' 不含税金额不能为空',
    },
  }
  public partsShowErr = {
    'taxPrice': {
      'required': ' 含税单价不能为空',
      'min': '含税单价小于1元',
    },
    'count': {
      'required': ' 数量不能为空',
      'min': '数量不能小于1条',
    },
  }
}
