import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap'
import { FormValidate } from '../../../../privaders/fromValidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { simAnim, fadeIn, flyIn } from '../../../../app.animation'
import { helpers } from '../../../../privaders/helper'
import { allTableModal } from '../../../../privaders/common.modal';
import { print, mainUnmaterialSearch, gethanglogsParams, repairRetreatHangDto, hanglogsParams, stRepairRetreats, maintenanceUnmaterParams, repairPackInfo, partscar } from './maintenanceModal';
import { maintenanceService } from './maintenanceService';

@Component({
  moduleId: module.id,
  selector: 'maintenance-unmaterial',
  templateUrl: 'maintenance-unmaterial.component.html',
  styleUrls: ['maintenance-unmaterial.component.scss'],
  animations: [flyIn]
})
export class MaintenanceUnmaterialComponent {
  @ViewChild('lgModal') public _lgModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  public _mainUnTable: allTableModal = new allTableModal();
  public mainUnmaerSearch: mainUnmaterialSearch = new mainUnmaterialSearch();
  public handlogsParams: gethanglogsParams = new gethanglogsParams();
  public _hanglogsParams: hanglogsParams = new hanglogsParams();
  public mainUnmaParams: maintenanceUnmaterParams = new maintenanceUnmaterParams();
  public repairPackInfodata: repairPackInfo = new repairPackInfo();
  public partscar: partscar = new partscar();
  public repairRetreatHangDto: repairRetreatHangDto = new repairRetreatHangDto();

  public print = new print();

  constructor(
    public _helpers: helpers,
    public service: maintenanceService,
    public fb: FormBuilder
  ) {

  }
  public dropdownShow: boolean = false;
  public hangOrderListCount: number;
  pageChanged(event) {
    this.handlogsParams.setPage(event.page);
    this.service.gethandLogs(this.handlogsParams).then(
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



  public status: { isopen: boolean } = { isopen: true };
  dyHtml() {
    this.staticModal.hide();
    console.log(this.print);
    this._helpers.displaynone();
    window.print();
    this.print = new print()
    this._helpers.displayblock();
  }
  offprint() {
    this.staticModal.hide();
    this.print = new print();
  }
  // 判断全选与全不选
  public ischeckAll() {
    if ($('input[name="allcheck"]').is(":checked")) {
      $('input[name="check"]').prop('checked', true);
      this.search();
    } else {
      $('input[name="check"]:checked').prop('checked', false);
      this.search();
    }
  }

  // 筛选信息
  public search() {
    let checks = [];
    $('input[name="check"]:checked').each((index, elem) => {
      checks.push($(elem).val())
    });
    if (checks.length == this.mainUnmaParams.repairRetreatRecordDto.length) {
      $('input[name="allcheck"]').prop('checked', true);
    } else {
      $('input[name="allcheck"]:checked').prop('checked', false);
    }
    this.print.printData = [];
    for (let i = 0, data = this.mainUnmaParams.repairRetreatRecordDto; i < data.length; i++) {

      for (let j = 0; j < checks.length; j++) {
        if (checks[j] == data[i].serialNumber) {
          console.log(data[i]);
          this.print.printData.push(data[i]);

        }
      }
    }
    this.print.receiveBill = this.print.printData[0].serialNumber;
    this.print.serialNo = this.print.printData[0].serialNumber;
    this.print.operators = this.print.printData[0].retreatUserNname;

    this.print.openTime = new Date();
    this.print.printTime = new Date();

  }
  hanglogspageChanged(event) {

  }




  alert() {
    // alert('00000000')
    console.log('1111111111')
  }
  ngOnInit() {
    this.gethanglogs();
    this.supplierFormInit();
  }
  //三个事件
  public partsSellReFocus(opt) {
    console.log(opt);
    // this.mainUnmaerSearch = new mainUnmaterialSearch();
    // this.mainUnmaerSearch[opt] = this.searchParam[opt];
    if (opt == "mainUntable") {
      this._mainUnTable = { code: opt, url: 'findno', params: this.mainUnmaerSearch };
    }
  }
  //blur事件
  public partsSellReBlur(opt) {
    if (opt == "mainUntable") {
      setTimeout(() => {
        this._mainUnTable = { code: 'closeCode', url: "" };
      }, 1000)
    }
  }
  //键盘点击事件
  public partsSellReKeyUp(event, opt) {
    this.mainUnmaerSearch[opt] = event.target.value;
    if (opt == "mainUntable") {
      this._mainUnTable = { code: opt, url: 'findno', params: this.mainUnmaerSearch };
    }
  }
  //挂单信息
  public gethanglogs() {
    this.handlogsParams.hangType = 7;
    this.service.gethandLogs(this.handlogsParams).then(resp => {
      console.log(resp);
      if (resp.errcode == 0) {
        console.log("111");
        this._hanglogsParams.totalCount = resp.totalCount;
        this._hanglogsParams.tablelist = resp.result;
        this.hangOrderListCount = resp.totalCount;
      }
    }).catch(resp => {
      console.log(resp);
    })
  }
  //获得详情
  public gethanglogsdetail(item) {
    console.log(item);
    this.dropdownShow = true;
    this.service.postdateils(item.orderNo).then(
      (res) => {
        this.dropdownShow = false;
        console.log(res);
        this.newOutmaterial = [];
        this.mainUnmaParams = res.result
        this.repairRetreatHangDto.carNo = res.result.orderCarDto.carNo;
        this.repairRetreatHangDto.customerName = res.result.orderCarDto.name;
        this.repairRetreatHangDto.orderId = res.result.orderCarDto.orderId;
        this.repairRetreatHangDto.orderNo = res.result.orderCarDto.orderNo;
        this.mainUnmaParams.repairRetreatRecordDto.map(
          (obj) => {
            console.log(obj.hang);
            if (obj.hang) {
              this.repairPackInfodata.count = obj.retreatCount;
              this.repairPackInfodata.depotName = obj.depotName;
              this.repairPackInfodata.depotPosName = obj.depotPosName
              this.repairPackInfodata.packUserName = obj.retreatUserNname
              this.repairPackInfodata.partsBrandName = obj.partsBrandName
              this.repairPackInfodata.partsCars = obj.partsCars
              this.repairPackInfodata.partsCode = obj.partsCode
              this.repairPackInfodata.partsId = obj.partsId
              this.repairPackInfodata.partsName = obj.partsName
              this.repairPackInfodata.partsSpec = obj.partsSpec
              this.repairPackInfodata.partsTypeName = obj.partsTypeName
              this.repairPackInfodata.partsUnit = obj.partsUnit
              this.repairPackInfodata.price = obj.price
              this.repairPackInfodata.projectName = obj.projectName
              this.repairPackInfodata.remark = obj.remark
              this.repairPackInfodata.retreatUserId = obj.retreatUserId
              this.repairPackInfodata.retreatUserName = obj.retreatUserNname
              this.repairPackInfodata.rpCode = obj.serialNumber
              this.repairPackInfodata.rpId = obj.rpId
              this.repairPackInfodata.serialNumber = obj.serialNumber
              this.repairPackInfodata.stockId = obj.stockId
              this.repairPackInfodata.totalPrice = obj.totalPrice
              this.newOutmaterial.push(this.repairPackInfodata);

              this.print.printData.push(this.repairPackInfodata);

              this.repairPackInfodata = new repairPackInfo();
              console.log(this.newOutmaterial);
              this.addstRepairRetreats();
            }
          }
        )
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
  }
  //放弃保存
  public giveuphanglogs(item) {
    console.log(item);
    this.service.deletehang(item.hangId).then(
      res => {
        console.log(res);
        this.gethanglogs();
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
  }
  //退料
  returnCount: number;
  public Return_mainten_unmaterial(item) {
    console.log(item);
    this.returnCount = item.count - item.returnCount;
    this.repairPackInfodata.count = item.count;
    this.repairPackInfodata.depotName = item.depotName;
    this.repairPackInfodata.depotPosName = item.depotPosName;
    this.repairPackInfodata.packUserName = item.packUserName;
    this.repairPackInfodata.partsBrandName = item.partsBrandName;
    this.repairPackInfodata.partsCars = item.partsCars;
    this.repairPackInfodata.partsCode = item.partsCode;
    this.repairPackInfodata.partsId = item.partsId;
    this.repairPackInfodata.partsName = item.partsName;
    this.repairPackInfodata.partsSpec = item.partsSpec;
    this.repairPackInfodata.partsTypeName = item.partsTypeName;
    this.repairPackInfodata.partsUnit = item.partsUnit;
    this.repairPackInfodata.price = item.price;
    this.repairPackInfodata.projectName = item.projectName;
    this.repairPackInfodata.remark = item.remark;
    this.repairPackInfodata.returnCount = item.returnCount;
    this.repairPackInfodata.serialNumber = item.serialNumber;
    this.repairPackInfodata.totalPrice = item.totalPrice;
    this.repairPackInfodata.rpCode = item.serialNumber;
    this.repairPackInfodata.rpId = item.rpId;
    this.repairPackInfodata.stockId = item.stockId;
    this.repairPackInfodata.retreatUserId = item.packUserId;
    this.repairPackInfodata.retreatUserName = item.packUserName;



    this.formErrors.count.max = `数量不能大于${this.returnCount}`;
    this.partscar = item.partsCars != null ? this.partscar = item.partsCars[0].modelName : new partscar();
    this.supplierFormInit();
    console.log(this.returnCount);
    //弹出一个弹框把值填充进去
  }
  // 改变数量
  countChange(event) {
    this.repairPackInfodata.totalPrice = Math.round((event * this.repairPackInfodata.price) * 100) / 100;
  }
  // 提交并关闭
  newOutmaterial = [];
  submitAndClose() {
    if (this.newOutmaterial.length != 0) {
      let obj = this.newOutmaterial.length;
      console.log(this.repairPackInfodata.serialNumber);
      for (let i = 0; i < obj; i++) {
        if (this.newOutmaterial[i].serialNumber == this.repairPackInfodata.serialNumber) {
          console.log(1111111111)
          this.newOutmaterial.splice(i, 1, this.repairPackInfodata);
          this.print.printData.splice(i, 1, this.repairPackInfodata);
          this.repairPackInfodata = new repairPackInfo();
          this._lgModal.hide();
          break;
        }
        if (i == obj - 1) {
          console.log(222222222222);
          this.newOutmaterial.push(this.repairPackInfodata);
          this.print.printData.push(this.repairPackInfodata);
          this.repairPackInfodata = new repairPackInfo();
          this._lgModal.hide();
        }
      }
    } else {
      this.newOutmaterial.push(this.repairPackInfodata);
      this.print.printData.push(this.repairPackInfodata);
      this.repairPackInfodata = new repairPackInfo();
      this._lgModal.hide();
    }
    console.log(this.newOutmaterial);
    this.addstRepairRetreats();
  }
  // 提交的数据
  stRepairRetreats = new stRepairRetreats();
  stRepairRetreatsList = [];
  addstRepairRetreats() {
    let obj = this.newOutmaterial;
    for (let i = 0; i < obj.length; i++) {
      this.stRepairRetreats.partsId = obj[i].partsId;
      this.stRepairRetreats.price = obj[i].price
      this.stRepairRetreats.retreatCount = obj[i].count
      this.stRepairRetreats.retreatUserId = obj[i].retreatUserId
      this.stRepairRetreats.retreatUserName = obj[i].retreatUserName
      this.stRepairRetreats.rpCode = obj[i].rpCode
      this.stRepairRetreats.rpId = obj[i].rpId
      this.stRepairRetreats.stockId = obj[i].stockId
      this.stRepairRetreats.totalPrice = obj[i].totalPrice

      this.repairRetreatHangDto.stRepairRetreat.push(this.stRepairRetreats);

      this.stRepairRetreatsList.push(this.stRepairRetreats);
      this.stRepairRetreats = new stRepairRetreats();
    }

  }
  //删除
  public delete_mainten_unmaterial(item) {
    console.log(item)
    this.newOutmaterial.splice(item, 1);
    this.print.printData.splice(item, 1);
    this.stRepairRetreatsList.splice(item, 1);
  }
  //添加维修退料单
  public add_mainten_unmaterial() {
    console.log(1111111);
    this.service.generate_mainten_unmaterial(this.stRepairRetreatsList).then(
      (res) => {
        console.log(res);
        this.staticModal.show();
        this.newOutmaterial = [];
        this.stRepairRetreatsList = [];
        this.repairRetreatHangDto = new repairRetreatHangDto();
        this.gethanglogs();
        this.service.gobackfather({ orderNo: this.orderNo }).then(
          res => {
            console.log(res);
            this.gobackItem(res.result);
          }
        ).catch(
          err => {
            console.log(err);
          }
          )
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )

  }
  //挂单
  public posters_mainten_unmaterial() {
    this.service.posters_mainten_unmaterial(this.repairRetreatHangDto).then(resp => {
      console.log(resp);
      this.gethanglogs();
      this.newOutmaterial = [];
      this.stRepairRetreatsList = [];
      this.repairRetreatHangDto = new repairRetreatHangDto();
      this.mainUnmaerSearch = new mainUnmaterialSearch();
      this.mainUnmaParams = new maintenanceUnmaterParams();
      this.repairPackInfodata = new repairPackInfo();
      this.print = new print();
    }).catch(resp => {
      console.log(resp)
    })
  }
  //详细信息
  orderNo
  gobackItem(event) {
    console.log(event);
    this.mainUnmaerSearch.OrderNoOrCarNo = event.orderCarDto.carNo;
    this.print.carName = event.orderCarDto.carNo;
    this.mainUnmaParams = event
    this.orderNo = event.orderCarDto.orderNo;
    this.repairRetreatHangDto.carNo = event.orderCarDto.carNo;
    this.repairRetreatHangDto.customerName = event.orderCarDto.customerName;
    this.repairRetreatHangDto.orderId = event.orderCarDto.orderId;
    this.repairRetreatHangDto.orderNo = event.orderCarDto.orderNo;
  }
  partsShowModel: FormGroup;
  public supplierFormInit() {
    this.partsShowModel = this.fb.group({
      count: ['', [Validators.required, Validators.min(1), Validators.max(this.returnCount)]],
    });
    FormValidate.onValueChanged(this.partsShowModel, this.formErrors);
  }
  public formErrors = {
    'count': {
      'required': ' 数量不能为空',
      'min': '数量不能小于1',
      'max': ''
    },
  }
}
