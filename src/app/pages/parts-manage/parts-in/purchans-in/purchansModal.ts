import { PagedParams } from '../../../../privaders/common.modal';

//采购入库的挂单信息
export class purchansposterParams extends PagedParams {

}
//采购入库的列表
export class purchansTableListParams {

}
export class findSuppliers extends PagedParams {
  supplierName: string;
}
// 获取配件编码
export class findpartsCode extends PagedParams {
  partsCode: string;
}
//获取配件名称
export class findpartsName extends PagedParams {
  partsName: string;
}
//仓位
export class dePotPosArray {
  depotPosId: string;
  depotPosName: string;
}
export class newpartsSend {
  isedit: boolean;
  "partsId": number;
  "supplierId": number;
  partsCode: string;//配件编码
  partsName: string;//配件名称
  partsTypeName: string;//配件类型
  brandName: string;//品牌
  partsSpec: string;//规格型号
  partsUnit: string;//单位
  depots = [];
  depotId: string;//仓库
  depotName: string;//仓库
  depotPosId: string;//仓位
  depotPosName: string;//仓位
  count: number;//数量
  price: number;//单价（元）
  totalPrice: number;//金额（元）
  taxPrice: number;//含税单价（元）
  totalTaxPrice: number;//含税金额（元）
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
export class purchDto {
  hangId?: number
  purchs: Array<purchs> = []
}
export class purchs {
  "partsId": number;
  "price": number;
  "purchCount": number;
  "returnCount": number = 0;
  "stockId": string;
  "supplierId": number;
  "taxPrice": number;
  "totalPrice": number;
  "totalTaxPrice": number;
}
export class hanglog extends PagedParams {
  hangType: number = 10;
}
export class print {
  supplierName: string;//供应商名字
  purchBill:string;//入库单号
  openTime: any;//开单时间
  printData = [];//打印数据
  taxPrice:number;
  price:number;
  printTime: any;//打印时间
  operators: string;//操作人
}
