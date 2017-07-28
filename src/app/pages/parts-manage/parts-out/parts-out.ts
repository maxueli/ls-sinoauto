export class pageParams {
  public pageIndex = 1;
  public pageSize = 10;
  public setPage(index: number, size?: number) {
    this.pageIndex = index;
    this.pageSize = size || this.pageSize;
  }
}
// 搜索工单号、车牌号
export class materialSearch extends pageParams {
  OrderNoOrCarNo: string;
}
// 维修领料展示页面
export class Repairpack {
  orderId: number;
}
// 车辆信息
export class orderCar {
  modelName: string;
  name: string;
  orderId: number;
  orderNo: string;
  repairName: string;
  vin: string;
}
// 获取配件编码
export class findpartsCode extends pageParams {
  partsCode: string;
}
export class newpartsSend {
  projectName: string;//维修项目
  partsCode: string;//配件编码
  partsName: string;//配件名称
  partsTypeName: string;//配件类型
  brandName: string;//品牌
  partsSpec: string;//规格型号
  carModels: Array<carModel> = new Array<carModel>();//适用车型
  remark: string;//备注
  depots = [];
  depotId: string;//仓库
  depotPosId: string;//仓位
  inventory: number;//库存
  count: number = 1;//数量
  partsUnit: string;//单位
  sellPrice: number;//单价（元）
  totalPrice: number;//金额（元）
  repairedUserName: string;//领料人
  orderRepairId:number
}
export class carModel {
  modelName: string;
  remark: string;
  seriesId: string;
  modelId: string;
  factoryId: string;
  dmlTime: string;
  dmlFlag: string;
  createTime: string;
}
//获取配件名称
export class findpartsName extends pageParams {
  partsName: string;
}
//仓位
export class dePotPosArray {
  depotPosId: string;
  depotPosName: string;
}

//新增展示数据
export class newpartsShowData {
  projectName: string;//维修项目
  partsCode: string;//配件编码
  partsTypeName: string;//配件类型
  partsName: string;//配件名称
  brandName: string;//品牌
  partsSpec: string;//规格型号
  partsUnit: string;//单位
  carModels = [];//适用车型
  depotName: string;//仓库
  depotPosName: string;//仓位
  count: number;//数量
  sellPrice: number;//单价（元）
  totalPrice: number;//金额（元）
  remark: string;//备注
  repairedUserName: string;//领料人
  orderRepairId:number

}

export class repairPacks {
  "count": number
  "orderId": number
  "orderRepairId": number
  "packUserId": number
  "packUserName": string
  "partsId": number
  "price": number
  "returnCount": number=0
  "stockId": number
  "totalPrice": number
}
//挂单
export class gethanglog extends pageParams{
  hangType:number = 3;
}
//销售出库新增
export class sellOutDepot {
  partsCode: string;//配件编码
  partsName: string;//配件名称
  partsTypeName: string;//配件类型
  brandName: string;//品牌
  partsSpec: string;//规格型号
  partsUnit: string;//单位
  remark: string;//备注
  depots = [];
  depotId: string;//仓库
  depotName: string;
  depotPosId: string;//仓位
  depotPosName: string;
  inventory: number;//库存
  count: number = 1;//数量
  price: number;//单价（元）
  totalPrice: number;//金额（元）

}
//内部领料
export class intermaterial {
  partsCode: string;//配件编码
  partsName: string;//配件名称
  partsTypeName: string;//配件类型
  brandName: string;//品牌
  partsSpec: string;//规格型号
  partsUnit: string;//单位
  depots = [];
  depotId: string;//仓库
  depotName: string;
  depotPosId: string;//仓位
  depotPosName: string;
  inventory: number;//库存
  count: number = 1;//数量
  sellPrice: number;//单价（元）
  totalPrice: number;//金额（元）
}
export class print{
  receiveBill:string;//领料单号
  serialNo:string;//流水号
  carName:string;//车牌号
  openTime:any;//开单时间
  printData=[];//打印数据
  printTime:any;//打印时间
  operators:string;//操作人
  collector:string;//领料人
}
export class printList{
  rpCode:string;
  projectName:string;
  partsCode:string;
  partsTypeName:string;
  partsName:string;
  brandName:string;
  partsSpec:string;
  partsUnit:string;
  depotName:string;
  depotPosName:string;
  sellPrice:number;
  count:number;
  totalPrice:number;
  remark:string;
  repairedUserName:string;
}




