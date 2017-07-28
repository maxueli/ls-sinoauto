import { Component, OnInit, ViewChild, } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { simAnim, fadeIn, flyIn, } from '../../../../app.animation';
import { helpers } from '../../../../privaders/helper'
import {  print, printList, gethanglog, repairPacks, carModel, newpartsShowData, dePotPosArray, materialSearch, Repairpack, orderCar, findpartsCode, findpartsName, newpartsSend } from '../parts-out'

import { partsOutService } from '../parts-out.service'

@Component({
  moduleId: module.id,
  selector: 'maintenance-material',
  templateUrl: 'maintenance-material.component.html',
  styleUrls: ['maintenance-material.component.scss'],
  animations: [flyIn]
})
export class MaintenanceMaterialComponent implements OnInit {
  @ViewChild('lgModal') public _lgModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  public dropdownShow:boolean=false;
  public gethanglog = new gethanglog();
  public hangOrderListCount:number=0;
  pageChanged(event){
    this.gethanglog.setPage(event.page);
    this._partsOutService.gethanglogs(this.gethanglog).then(
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
  public print = new print();
  public printList = new printList();
  public isShow: boolean = false;
  public materialSearch = new materialSearch();//搜索工单号或车牌号
  public _materialSearchShow: boolean = false;
  public materialtotal: number = 0;//搜索工单分页
  public materialindex: number = 1;//搜索工单分页

  public _Repairpack = new Repairpack();//展示页面信息

  public _orderCar = new orderCar();//车辆信息

  public findpartsCode = new findpartsCode();//获取配件编码
  public _findpartsCodeShow: boolean = false;
  public findpartsCodeData;

  public findpartsName = new findpartsName();//获取配件名称
  public _findpartsName: boolean = false;
  public findpartsNameData;

  public newpartsSend = new newpartsSend();//新建维修发料

  public depotPos = [];//仓位
  public dePotPosArray = new dePotPosArray();//仓位

  public materialSearchData;
  public orderRepairs;//维修项目
  public _orderRepairsShow: boolean;
  public repairPackLogs = [];//维修发料记录
  public _repairPackLogsShow: boolean;
  public repairRetreatRecords;//维修退料记录
  public _repairRetreatRecordsShow: boolean;

  public newpartsShowData = new newpartsShowData();//新增维修发料显示数据

  public _repairPacksList = new Array<repairPacks>();

  constructor(
    public _helpers: helpers,
    public _partsOutService: partsOutService,
  ) {

  }
  ngOnInit() {
    this.gethanglogs();
  }
  public status: { isopen: boolean } = { isopen: true };
  
  dyHtml(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // this.openTime = new Date();


    this.staticModal.hide();
    this._helpers.displaynone();
    console.log(this.print);
    window.print();
    this.submitInit();
    this._helpers.displayblock();
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
    if (checks.length == this.repairPackLogs.length) {
      $('input[name="allcheck"]').prop('checked', true);
    } else {
      $('input[name="allcheck"]:checked').prop('checked', false);
    }
    this.print.printData = [];
    for (let i = 0, data = this.repairPackLogs; i < data.length; i++) {

      for (let j = 0; j < checks.length; j++) {
        if (checks[j] == data[i].rpCode) {
          this.printList.rpCode = data[i].packUserName;
          this.printList.projectName = data[i].projectName
          this.printList.partsCode = data[i].parts.partsCode
          this.printList.partsTypeName = data[i].parts.partsTypeName
          this.printList.brandName = data[i].parts.brandName
          this.printList.partsSpec = data[i].parts.partsSpec
          this.printList.partsUnit = data[i].parts.partsUnit
          this.printList.depotName = data[i].depotName
          this.printList.depotPosName = data[i].depotPosName
          this.printList.sellPrice = data[i].price
          this.printList.count = data[i].count
          this.printList.totalPrice = data[i].totalPrice
          this.printList.remark = data[i].remark
          this.printList.repairedUserName = data[i].packUserName
          this.print.printData.push(this.printList);
          this.printList = new printList();
        }
      }
    }
    console.log(this.print.printData, this._orderCar);
    this.print.receiveBill = this.print.printData[0].rpCode;
    this.print.serialNo = this.print.printData[0].rpCode;
    this.print.operators = this.print.printData[0].repairedUserName;
    this.print.openTime = new Date();
    this.print.printTime = new Date();

  }




























  // 车辆工单号获取焦点获取数据
  getmaterial() {
    $('.fa-search ').addClass('fa-spinner fa-spin');
    this._partsOutService.getmaintenanceInfo(this.materialSearch).then(
      (res) => {
        if (res.errcode == 0) {
          this._newpartstableData = [];
          this.materialSearchData = res.result;
          this.materialtotal = res.totalCount;
          this.isShow = true;
          console.log(res);
          $('.fa-search ').removeClass('fa-spinner fa-spin');
        }
      }
    ).catch(
      (err) => {
        $('.fa-search ').removeClass('fa-spinner fa-spin');
        console.log(err);
      }
      )
  }
  // 车辆工单号失去焦点
  blurmaterial() {
    $('.fa-search ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this.isShow = false;
    }, 1000);
  }
  // 车辆工单号选中一条展示页面信息

  pitchItem(item) {
    this.print.carName = item.carNo;
    console.log(item);
    this._Repairpack.orderId = item.orderId;
    this.repairPacks.orderId = item.orderId;
    this._partsOutService.repairpack(this._Repairpack).then(
      (res) => {
        this.isShow = false;
        if (res.errcode == 0) {
          this._materialSearchShow = true;
          this._orderCar = res.result.orderCar;
          this.materialSearch.OrderNoOrCarNo = item.carNo;
          this.orderRepairs = res.result.orderRepairs;
          this.repairPackLogs = res.result.repairPackLogs;
          this.repairRetreatRecords = res.result.repairRetreatRecords;
          // this.newpartsSend.orderRepairId = res.result.
        }
        console.log(res);
        // console.log(this.repairPackLogs,11111111111);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      );
  }
  //搜索车牌工单分页条
  materialpage(event: any) {
    this.materialSearch.setPage(event.page);
    this.getmaterial();
  }
  // 新增发料
  sendMaterial(item?) {
    this._lgModal.show();
    if (item) {
      this.newpartsSend.projectName = item.projectName;
      this.newpartsSend.repairedUserName = item.repairedUserName;
      this.newpartsSend.orderRepairId = item.orderRepairId;
      this.repairPacks.orderRepairId = item.orderRepairId;
      this.repairPacks.packUserId = item.repairedUserId;
      this.repairPacks.packUserName = item.repairedUserName;
      console.log(item, this.newpartsSend, 1111111111);
    }
  }
  //获取焦点获取配件编码
  focusfindpartsCode() {
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
  //失去焦点获取备件编码
  blurfindpartsCode() {
    $('.faCode  ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this._findpartsCodeShow = false;
    }, 1000)
  }
  selectPro(target) {
    console.log(target, event);
  }
  obj = {
    partsId: '',
    depotId: ''
  }
  //配件编码选择一条
  carModel = new carModel();
  partsCodeItem(item) {
    let data = item;
    this.repairPacks.partsId = item.partsId;
    this._partsOutService.stockparts({ partsId: data.partsId }).then(
      (res) => {
        // console.log(res);
        if (res.errcode == 0 && res['result']) {
          this.repairPacks.stockId = res.result.depotPosId;
          this.depotPos = [];
          this.findpartsName.partsName = res.result.parts.partsName;
          this.findpartsCode.partsCode = res.result.parts.partsCode;
          this.newpartsSend.brandName = res.result.parts.brandName;
          this.newpartsSend.inventory = res.result.parts.inventory;
          this.newpartsSend.partsCode = res.result.parts.partsCode;
          this.newpartsSend.partsName = res.result.parts.partsName;
          this.newpartsSend.partsSpec = res.result.parts.partsSpec;
          this.newpartsSend.partsTypeName = res.result.parts.partsTypeName;
          this.newpartsSend.carModels = res.result.parts.carModels;
          if (res.result.parts.carModels[0] != undefined) {
            this.carModel.modelName = res.result.parts.carModels[0].modelName;
          }
          this.newpartsSend.depots = res.result.depots;
          this.newpartsSend.remark = res.result.depots[0].remark;
          this.newpartsSend.depotId = res.result.depotId;
          this.newpartsSend.depotPosId = res.result.depotPosId;
          this.newpartsSend.inventory = res.result.inventory;
          this.newpartsSend.partsUnit = res.result.parts.partsUnit;
          this.newpartsSend.sellPrice = res.result.parts.sellPrice;
          // this.newpartsSend.count = 1;
          this.newpartsSend.totalPrice = this.newpartsSend.count * this.newpartsSend.sellPrice;

          this.obj.partsId = res.result.partsId;


          this.newpartsShowData.depotName = res.result.depotName;
          this.newpartsShowData.depotPosName = res.result.depotPosName;


          this.dePotPosArray.depotPosId = res.result.depotPosId;
          this.dePotPosArray.depotPosName = res.result.depotPosName;
          this.depotPos.push(this.dePotPosArray);
          // console.log(this.depotPos);
          console.log(this.newpartsSend);
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      );

    console.log(item);
  }
  //配件编码分页
  findpartsCodeDatapageChanged(event) {
    this.findpartsCode.setPage(event.page);
    this.focusfindpartsCode();
  }
  //配件名称分页
  findpartsNamepageChanged(event) {
    this.findpartsName.setPage(event.page);
    this.focusfindpartsName();
  }
  //根据仓库id获取仓位
  getDepotPosName(id, value) {
    console.log(id, value);
    this.depotPos = [];
    this.obj.depotId = id;
    console.log(this.obj);
    this._partsOutService.getstock(this.obj).then(
      (res) => {
        console.log(res);
        this.newpartsSend.depotPosId = res.result.depotPosId;
        this.depotPos = res.result.depotPoss;
        this.newpartsShowData.depotName = res.result.depotName;
        this.newpartsShowData.depotPosName = res.result.depotPoss[0].depotPosName;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )

  }
  //获取焦点获取配件名称
  focusfindpartsName() {
    $('.faName ').addClass('fa-spinner fa-spin');
    this._partsOutService.getfindpartsCode(this.findpartsName).then(
      (res) => {
        this._findpartsName = true;
        console.log(res);
        this.findpartsNameData = res;
        // this.findpartsCodeData = res;
        $('.faName ').removeClass('fa-spinner fa-spin');
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )

  }
  //失去焦点获取配件名称
  blurfindpartsName() {
    $('.faName ').removeClass('fa-spinner fa-spin');
    setTimeout(() => {
      this._findpartsName = false;

    }, 1000);
  }
  //配件名称选择一条
  partsNameItem(item) {
    console.log(item);
    this.partsCodeItem(item);

  }
  //提交并关闭
  _newpartstableData = [];
  _newpartstableDataIsShow: boolean = false;

  submitAndClose() {
    this.newpartsShowData.orderRepairId = this.newpartsSend.orderRepairId;
    this.newpartsShowData.projectName = this.newpartsSend.projectName;
    this.newpartsShowData.partsCode = this.newpartsSend.partsCode;
    this.newpartsShowData.partsTypeName = this.newpartsSend.partsTypeName;
    this.newpartsShowData.partsName = this.newpartsSend.partsName;
    this.newpartsShowData.brandName = this.newpartsSend.brandName;
    this.newpartsShowData.partsSpec = this.newpartsSend.partsSpec;
    this.newpartsShowData.partsUnit = this.newpartsSend.partsUnit;
    this.newpartsShowData.carModels = this.newpartsSend.carModels;
    this.newpartsShowData.count = this.newpartsSend.count;
    this.newpartsShowData.sellPrice = this.newpartsSend.sellPrice;
    this.newpartsShowData.totalPrice = this.newpartsShowData.count * this.newpartsShowData.sellPrice;
    this.newpartsShowData.remark = this.newpartsSend.remark;
    this.newpartsShowData.repairedUserName = this.newpartsSend.repairedUserName;
    this.repairPacks.count = this.newpartsSend.count;
    this.repairPacks.price = this.newpartsSend.sellPrice;
    this.repairPacks.totalPrice = this.newpartsSend.totalPrice;
    // console.log(this.newpartsSend);
    this._newpartstableDataIsShow = true;
    if (this._newpartstableData.length <= 0) {
      this._newpartstableData.push(this.newpartsShowData);
      this._repairPacksList.push(this.repairPacks);
      this.print.printData.push(this.newpartsShowData);
    } else {
      this._newpartstableData.map((obj, i) => {
        if (obj.orderRepairId == this.newpartsShowData.orderRepairId && obj.partsCode == this.newpartsShowData.partsCode) {
          this._newpartstableData.splice(i, 1, this.newpartsShowData);
          this._repairPacksList.splice(i, 1, this.repairPacks);
          this.print.printData.splice(i, 1, this.newpartsShowData);
        } else {
          this._newpartstableData.push(this.newpartsShowData);
          this._repairPacksList.push(this.repairPacks);
          this.print.printData.push(this.newpartsShowData);
        }
      })
    }
    this.repairPacks = new repairPacks();
    this.newpartsSend = new newpartsSend();
    this.findpartsCode = new findpartsCode();
    this.findpartsName = new findpartsName();
    this.carModel = new carModel();
    console.log(this.print.printData);
    this.newpartsShowData = new newpartsShowData();
    this._lgModal.hide();
  }



  onKeyPress(event: any) {
    let keyCode = event.keyCode;
    console.log(keyCode);
    if (keyCode == 8) {
      event.returnValue = true;
    }
    if (keyCode >= 48 && keyCode <= 57) {
      event.returnValue = true;
      this.newpartsSend.totalPrice = this.newpartsSend.count * this.newpartsSend.sellPrice;
    } else {
      event.returnValue = false;
    }
    if (this.newpartsSend.count > this.newpartsSend.inventory) {
      console.log(this.newpartsSend.count);
      this.newpartsSend.count = this.newpartsSend.inventory;

    }
    console.log('keycode');
  }


  //删除新增发料
  deleteSend(i) {
    this._newpartstableData.splice(i, 1);
    this._repairPacksList.splice(i, 1);
  }
  //生成维修发料单
  repairPacks: repairPacks = new repairPacks();
  newPartsBill() {
    if (this._repairPacksList.length != 0) {
      // console.log(this._repairPacksList);
      this._partsOutService.addrepairpack(this._repairPacksList).then(
        (res) => {
          console.log(res);
          this.print.receiveBill = res.result;
          this.print.serialNo = res.result;
          this.staticModal.hide();
          this.submitInit();

        }
      ).catch(
        (err) => {
          console.log(err);
        }
        )
    }

  }
  submitInit() {//提交成功初始化
    this._repairPacksList = new Array<repairPacks>();
    this.findpartsName = new findpartsName();
    this.findpartsCode = new findpartsCode();
    this.newpartsSend = new newpartsSend();
    this._orderCar = new orderCar();
    this.materialSearch = new materialSearch();
    this.repairPackLogs = [];
    this._newpartstableData = [];
    this._newpartstableDataIsShow = false;
    this._materialSearchShow = false;
    this.gethanglogs();
  }
  //挂单
  hangBill() {
    if (this._repairPacksList.length != 0) {
      this._partsOutService.hangrepairpack(this._repairPacksList).then(
        (res) => {
          console.log(res);
          this.submitInit();

        }
      ).catch(
        (err) => {
          console.log(err);
        }
        )
    }
  }
  // 获取挂单信息
  hanglogsInfo = {
    totalCount: 0,
    result: []
  }
  gethanglogs() {
    let hanglog = new gethanglog();
    this._partsOutService.gethanglogs(hanglog).then(
      (res) => {
        console.log(res);
        this.hanglogsInfo.totalCount = res.totalCount;
        this.hanglogsInfo.result = res.result;
        this.hangOrderListCount = res.totalCount;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
      )
  }
  showHanglogItem(item) {
    this.dropdownShow = true;
    this._newpartstableData = [];
    this._partsOutService.repairpackhang({ hangId: item.hangId }).then(
      (res) => {
        this.dropdownShow = false;
        console.log(res);
        this.repairPackLogs = [];
        this._repairPacksList = [];
        let PackLog = res.result.repairPackLogs;
        this._materialSearchShow = true;
        this._orderCar = res.result.orderCar;
        this.materialSearch.OrderNoOrCarNo = item.carNo;
        this.orderRepairs = res.result.orderRepairs;
        this.repairRetreatRecords = res.result.repairRetreatRecords;
        this.repairPacks.orderId = res.result.orderId
        PackLog.map((obj) => {
          let partstable = {
            projectName: obj.projectName,
            partsCode: obj.parts.partsCode,
            partsTypeName: obj.parts.partsTypeName,
            partsName: obj.parts.partsName,
            brandName: obj.parts.brandName,
            partsSpec: obj.parts.packSpec,
            partsUnit: obj.parts.partsUnit,
            carModels: obj.parts.carModels,
            depotName: obj.depotName,
            depotPosName: obj.depotPosName,
            count: obj.count,
            sellPrice: obj.price,
            totalPrice: obj.totalPrice,
            remark: obj.remark,
            repairedUserName: obj.packUserName,
            rpCode: obj.rpCode,
          }
          // console.log(partstable);
          if (obj.isHang) {
            this._newpartstableData.push(partstable);
            this.repairPacks.count = obj.count
            this.repairPacks.orderRepairId = obj.orderRepairId
            this.repairPacks.packUserId = obj.packUserId
            this.repairPacks.packUserName = obj.packUserName
            this.repairPacks.partsId = obj.partsId
            this.repairPacks.price = obj.price
            this.repairPacks.stockId = obj.depotPosId;
            this.repairPacks.totalPrice = obj.totalPrice
            this._repairPacksList.push(this.repairPacks);
            console.log(this._repairPacksList, this.repairPacks);
            this.repairPacks = new repairPacks();
          } else {
            this.repairPackLogs.push(obj);
          }
        })
        // this._repairPacksList = this._newpartstableData;
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
    this._partsOutService.maintenancedeletehang(item.hangId).then(
      res => {
        console.log(res);
        this.gethanglogs();
        this._newpartstableData = [];
        this.materialSearch = new materialSearch();
        this._orderCar = new orderCar();
        this.orderRepairs = [];
        this.repairPackLogs = [];
        this.repairRetreatRecords = [];
        this.newpartsSend = new newpartsSend();
        this.findpartsCode = new findpartsCode();
        this.findpartsName = new findpartsName();
      }
    ).catch(
      err => {
        console.log(err);
      }
      )
  }

  closeModal() {
    this.newpartsSend = new newpartsSend();
    this.findpartsCode = new findpartsCode();
    this.findpartsName = new findpartsName();
  }
  public cardorgdid: any;
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
  public searchfocus() {
    // console.log(this.cardorgdid);
  }
}
