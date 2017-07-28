import { Component, OnInit, ViewChild } from '@angular/core';
import { FormValidate } from '../../../../privaders/fromValidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { simAnim, fadeIn, flyIn } from '../../../../app.animation';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { helpers } from '../../../../privaders/helper';
import { partsOutService } from '../parts-out.service';
import { customer, addSellOut, sellOut, hanglogs, print } from './sell';
import { findpartsCode, findpartsName, sellOutDepot, newpartsShowData, dePotPosArray } from '../parts-out'
@Component({
  moduleId: module.id,
  selector: 'sell-out',
  templateUrl: 'sell-out.component.html',
  styleUrls: ['sell-out.component.scss'],
  animations: [flyIn]
})
export class SellOutComponent implements OnInit {
  @ViewChild('lgModal') public _lgModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  public selltotal: number = 0;
  public sellindex: number = 1;

  public customer = new customer();//客户名称
  public _customerData;
  public _customerDataShow: boolean = false;
  public addSellOut = new addSellOut();
  public sellOut = new sellOut();

  public FindusersinorgList = [];

  public findpartsCode = new findpartsCode();//配件编码
  public _findpartsCodeShow: boolean = false;
  public findpartsCodeData;

  public findpartsName = new findpartsName();//配件名称
  public _findpartsNameShow: boolean = false;
  public findpartsNameData;

  public sellOutDepot = new sellOutDepot();

  public newpartsShowData = new newpartsShowData();

  public dePotPosArray = new dePotPosArray();
  public addSellForm: FormGroup;
  public sellOutstock: FormGroup;

  public print = new print();
  constructor(
    public _helpers: helpers,
    public _partsOutService: partsOutService,
    public fb: FormBuilder,
  ) {

  }
  ngOnInit() {
    this.getFindusersinorg();
    this.sellFormInit();
    this.gethanglogs();
  }
  public dropdownShow: boolean = false;
  public hangOrderListCount: number;
  pageChanged(event) {
    this.hanglogs.setPage(event.page);
    this._partsOutService.gethanglogs(this.hanglogs).then(
      res => {
        console.log(res);
        this.hangOrderListCount = res.totalCount;
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
  }
  //获取焦点获取客户名称列表
  getCustomer() {
    $('.fa-search ').addClass('fa-spinner fa-spin');
    this._partsOutService.customer(this.customer).then(
      (res) => {
        console.log(res);
        $('.fa-search ').removeClass('fa-spinner fa-spin');
        this._customerData = res;
        this.selltotal = res.totalCount;
        this._customerDataShow = true;
        // this.customer.customerName = res.result.name;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //客户名称失去焦点
  blurCustomer() {
    setTimeout(() => {
      this._customerDataShow = false;
    }, 1000)
  }
  //客户名称分页
  sellpage(event) {
    console.log(event.page)
    this.customer.setPage(event.page);

    this.getCustomer();

  }
  //客户名称选择一条
  customer_Id;
  optCustomerItem(item) {
    console.log(item);
    this.customer.name = item.name;
    this.customer.customermobile = item.mobile;
    this.customer_Id = item.customerId;
    this._customerDataShow = false;
  }
  //获取销售员
  getFindusersinorg() {
    this._partsOutService.findusersinorg().then(
      (res) => {
        // console.log(res);
        if (res.errcode == 0) {
          this.FindusersinorgList = res.result;
          this.sellOut.sellerId = this.FindusersinorgList[0].userId;
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //新增弹框，获取客户id
  newAddItem() {
    this._lgModal.show();
    this.sellOut.customerId = this.customer_Id;
  }
  //配件编码获得焦点
  focusPartsCode() {
    $('.faCode ').addClass('fa-spinner fa-spin');
    this._partsOutService.getfindpartsCode(this.findpartsCode).then(
      (res) => {
        this._findpartsCodeShow = true;
        console.log(res);
        this.findpartsCodeData = res;
        $('.faCode ').removeClass('fa-spinner fa-spin');
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //配件编码失去焦点
  blurPartsCode() {
    FormValidate.validate(this.addSellForm, this.formErrors);
    $('.faCode  ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this._findpartsCodeShow = false;
    }, 1000)
  }
  //点击一条填充表格数据
  public depotPos = [];
  obj = {
    partsId: '',
    depotId: ''
  }
  inventorys;
  partsCodeItem(item) {
    console.log(item);
    let data = item;
    this._partsOutService.stockparts({ partsId: data.partsId }).then(
      (res) => {
        console.log(res);
        if (res.errcode == 0 && res['result']) {
          this.depotPos = [];
          this.findpartsName.partsName = res.result.parts.partsName;
          this.findpartsCode.partsCode = res.result.parts.partsCode;
          this.sellOutDepot.brandName = res.result.parts.brandName;
          this.sellOutDepot.inventory = res.result.inventory;
          this.sellOutDepot.partsCode = res.result.parts.partsCode;
          this.sellOutDepot.partsName = res.result.parts.partsName;
          this.sellOutDepot.partsSpec = res.result.parts.partsSpec;
          this.sellOutDepot.partsTypeName = res.result.parts.partsTypeName;
          this.sellOutDepot.depotName = res.result.depotName;
          this.sellOutDepot.depotPosName = res.result.depotPosName;
          this.sellOutDepot.depots = res.result.depots;
          this.sellOutDepot.remark = res.result.depots[0].remark;
          this.sellOutDepot.depotId = res.result.depotId;
          this.sellOutDepot.depotPosId = res.result.depotPosId;
          this.sellOutDepot.inventory = res.result.inventory;
          this.sellOutDepot.partsUnit = res.result.parts.partsUnit;
          this.sellOutDepot.price = res.result.parts.sellPrice;
          // this.newpartsSend.count = 1;
          this.sellOutDepot.totalPrice = this.sellOutDepot.count * this.sellOutDepot.price;
          this.obj.partsId = res.result.partsId;
          this.sellOut.partsId = res.result.partsId;
          this.dePotPosArray.depotPosId = res.result.depotPosId;
          this.dePotPosArray.depotPosName = res.result.depotPosName;
          this.depotPos.push(this.dePotPosArray);
          console.log(this.depotPos, this.sellOutDepot);

          this.inventorys = res.result.inventory;

        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //配件名称获得焦点
  focusPartsName() {
    $('.faName ').addClass('fa-spinner fa-spin');
    this._partsOutService.getfindpartsCode(this.findpartsName).then(
      (res) => {
        this._findpartsNameShow = true;
        console.log(res);
        this.findpartsNameData = res;
        $('.faName ').removeClass('fa-spinner fa-spin');
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //配件名称失去焦点
  blurPartsName() {
    FormValidate.validate(this.addSellForm, this.formErrors);
    $('.faCode  ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this._findpartsNameShow = false;
    }, 1000)
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
        this.sellOutDepot.depotPosId = res.result.depotPosId;
        this.depotPos = res.result.depotPoss;
        this.sellOutDepot.inventory = res.result.inventory;
        this.sellOutDepot.depotName = text;
        this.sellOutDepot.depotPosName = res.result.depotPosName;
        console.log(this.sellOutDepot);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //数量改变
  sellOutDepotCount(event) {
    if (event > this.sellOutDepot.inventory) {
      this.sellOutDepot.count = this.sellOutDepot.inventory;
      this.sellOutDepot.totalPrice = this.sellOutDepot.count * this.sellOutDepot.price;
    } else {
      this.sellOutDepot.totalPrice = this.sellOutDepot.count * this.sellOutDepot.price;
    }
  }
  //提交并关闭
  sellOutdepotTable = [];
  submitSell() {
    this.sellOutdepotTable.push(this.sellOutDepot);
    this.print.printData.push(this.sellOutDepot);
    this.print.sum = this.sellOutDepot.price;
    console.log(this.sellOutDepot);
    console.log(1111111111);
    console.log(this.addSellForm.value);
    this._lgModal.hide();


    let sellobj = this.addSellForm.value;
    this.sellOut.count = sellobj.count;
    this.sellOut.price = sellobj.price;
    this.sellOut.remark = sellobj.remark;
    this.sellOut.stockId = sellobj.depotPosId;
    this.sellOut.totalPrice = sellobj.totalPrice;
    this.addSellOut.sellOuts.push(this.sellOut);

    this.getFindusersinorg();
    this.findpartsCode = new findpartsCode();
    this.findpartsName = new findpartsName();
    this.sellOutDepot = new sellOutDepot();
    this.sellOut = new sellOut();
    console.log(this.addSellOut);
  }
  //删除一条
  selldeleteItem(i) {
    this.sellOutdepotTable.splice(i, 1);
    console.log(this.sellOutdepotTable);
    this.print.printData.splice(i, 1);
    this.addSellOut.sellOuts.splice(i, 1);
  }
  //生成销售出库单
  sellOutBill() {
    this._partsOutService.addsellout(this.addSellOut).then(
      (res) => {
        console.log(res);
        this.staticModal.show();
        this.sellOutdepotTable = []
        this.addSellOut = new addSellOut();

      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //生成挂单
  hangsellout() {
    console.log(this.addSellOut);
    this._partsOutService.hangsellout(this.addSellOut).then(
      (res) => {
        console.log(res);
        this.sellOutdepotTable = []
        this.addSellOut = new addSellOut();
        this.sellOut = new sellOut();
        this.gethanglogs();
        this.getFindusersinorg();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  // 获取挂单信息
  hanglogs = new hanglogs();
  hanglogsInfo = {
    totalCount: 0,
    result: []
  };
  gethanglogs() {
    this._partsOutService.gethanglogs(this.hanglogs).then(
      (res) => {
        console.log(res);
        this.hanglogsInfo = res;
        this.hangOrderListCount = res.totalCount;
      }
    ).catch(
      (err) => {
        console.log(err)
      }
      )
  }
  //选择一条挂单，加载页面
  showHanglogItem(item) {
    console.log(item.hangId);
    this.dropdownShow = true;
    this._partsOutService.findsellhang({ hangId: item.hangId }).then(
      (res) => {
        this.dropdownShow = false;
        console.log(res);
        this.addSellOut.sellOuts = [];
        this.addSellOut.hangId = res.result[0].hangId;
        this.customer.name = res.result[0].name;
        this.customer.customermobile = res.result[0].mobile;

        this.customer_Id = res.result[0].customerId;

        let data = res.result;
        this.sellOutdepotTable = data;
        for (let i = 0; i < data.length; i++) {
          this.print.printData.push(data);
          this.sellOut.count = data[i].count;
          this.sellOut.customerId = data[i].customerId;
          this.sellOut.partsId = data[i].partsId;
          this.sellOut.price = data[i].price;
          this.sellOut.remark = data[i].remark;
          this.sellOut.settlementType = data[i].settlementType;
          this.sellOut.stockId = data[i].depotPosId;
          this.sellOut.totalPrice = data[i].totalPrice;
          this.sellOut.sellerId = data[i].sellerId;
          this.addSellOut.sellOuts.push(this.sellOut);
          this.sellOut = new sellOut();
          console.log(this.addSellOut.sellOuts);
        }
        this.sellOut.sellerId = res.result[0].sellerId;
        // console.log( this.addSellOut);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  //s删除一条挂单数据
  deletehangItem(item) {
    console.log(item);
    this._partsOutService.deletehang({ hangId: item.hangId, hangType: item.hangType }).then((res) => {
      console.log(res);
      this.sellOutdepotTable = [];
      this.gethanglogs();
    }).catch((err) => {
      console.log(err);
    })
  }
  // 关闭弹框
  closemodal() {
    this.sellOutDepot = new sellOutDepot();
    this.findpartsCode = new findpartsCode();
    this.findpartsName = new findpartsName();
  }





  //From 初始化
  public sellFormInit() {
    this.addSellForm = this.fb.group({
      partsCode: ['', [Validators.required]],
      partsName: ['', [Validators.required]],
      partsTypeName: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      partsSpec: ['', [Validators.required]],
      partsUnit: ['', [Validators.required]],
      depotId: ['', [Validators.required]],
      depotPosId: ['', []],
      inventory: ['', [Validators.required]],
      count: ['', [Validators.required, Validators.min(1),]],
      price: ['', [Validators.required, Validators.min(1)]],
      totalPrice: ['', [Validators.required]],
      remark: ['', []],

    });
    FormValidate.onValueChanged(this.addSellForm, this.formErrors);


    this.sellOutstock = this.fb.group({
      customerName: ['', [Validators.required]],

    });
    FormValidate.onValueChanged(this.sellOutstock, this.sellOutstockErr);
  }
  public sellOutstockErr = {
    'customerName': {
      'required': '客户名称不能为空',
    }
  }
  //错误信息
  public formErrors = {
    'partsCode': {
      'required': '配件编码不能为空',
      // 'minlength': 'laest code min six'
    },
    'partsName': {
      'required': ' 配件名称不能为空',
      // 'minlength': 'laest code min six'
    },
    'partsTypeName': {
      'required': ' 配件分类不能为空',
      // 'minlength': 'laest code min six'
    },
    'brandName': {
      'required': ' 品牌不能为空',
      // 'minlength': 'laest code min six'
    },
    'partsSpec': {
      'required': ' 规格型号不能为空',
      // 'minlength': 'laest code min six'
    },
    'partsUnit': {
      'required': ' 单位不能为空',
      // 'minlength': 'laest code min six'
    },
    'inventory': {
      'required': ' 库存不能为空',
      // 'minlength': 'laest code min six'
    },
    'count': {
      'required': ' 库存不能为空',
      'min': '数量不能小于1',

      // 'minlength': 'laest code min six'
    },
    'price': {
      'required': ' 价格不能为空',
      'min': '价格不能小于1',
      // 'minlength': 'laest code min six'
    },



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
