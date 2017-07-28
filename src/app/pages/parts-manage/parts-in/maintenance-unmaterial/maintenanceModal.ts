import { PagedParams } from '../../../../privaders/common.modal';
export class mainUnmaterialSearch extends PagedParams {
  OrderNoOrCarNo: string
}
export class mainUnmaterialorderNoTable extends PagedParams {
  orderNo: string
}
export class mainmaterSearchTable {
  brandName: string
  carNo: string
  customerName: string
  modelName: string
  orderId: number
  orderNo: number
}
export class gethanglogsParams extends PagedParams {
  hangType: number=7
}
export class hanglogsParams {
  totalCount: number = 0;
  tablelist: Array<hanglogsTablelistParams> = new Array<hanglogsTablelistParams>();
}
export class hanglogsTablelistParams {
  "createTime": string;
  "customerCarNo": string;
  "customerMobile": string;
  "customerName": string;
  "departName": string;
  "dmlFlag": number;
  "dmlTime": string;
  "hangId": number;
  "hangType": number;
  "implUserId": number;
  "implUserName": string;
  "operUserId": number;
  "operUserName": string;
  "orderNo": string
}
export class maintenanceUnmaterParams {
  "orderCarDto": orderCar = new orderCar();
  "orderRepairDtos": Array<orderrepairdt> = new Array<orderrepairdt>();
  "repairPackInfoDtos": Array<repairPackInfo> = new Array<repairPackInfo>();
  "repairProjectDtos": Array<repairpaoject> = new Array<repairpaoject>();
  "repairRetreatRecordDto": Array<repairRetreatRecord> = new Array<repairRetreatRecord>()
}
export class orderCar {
  "createTime": string
  "modelName": string
  "name": string
  "orderId": number
  "orderNo": string
  "repairType": string
  "vin": string
}
export class orderrepairdt {
  "isExtra": boolean
  "isPass": boolean
  "orderRepairId": number
  "projectName": number
  "repairedUserId": number
  "repairedUserName": string
}
export class repairpaoject {
  "isExtra": true
  "isPass": true
  "orderRepairId": 0
  "projectName": "string"
  "repairedUserId": 0
  "repairedUserName": "string"
}
export class repairRetreatRecord {
  "depotName": "string"
  "depotPosName": "string"
  "partsBrandName": "string"
  "partsCars": Array<partscar> = new Array<partscar>()
  "partsCode": "string"
  "partsId": 0
  "partsName": "string"
  "partsSpec": "string"
  "partsTypeName": "string"
  "partsUnit": "string"
  "price": 0
  hang:boolean
  packUserId:number
  rpId:number
  stockId:number
  retreatUserId:number
  "projectName": "string"
  "remark": "string"
  "retreatCount": 0
  "retreatUserNname": "string"
  "serialNumber": "string"
  "totalPrice": 0
}
export class repairPackInfo {
  "count": number
  "depotName": string
  "depotPosName": string
  "packUserName": string
  "partsBrandName": string
  "partsCars": Array<partscar> = new Array<partscar>()
  "partsCode": string
  "partsId": number
  "partsName": string
  "partsSpec": string
  "partsTypeName": string
  "partsUnit": string
  "price": number
  "projectName": string
  "remark": string
  "returnCount": number
  "serialNumber": string
  "totalPrice": number
  "rpId": number
  "rpCode": string
  "stockId": number
  "retreatUserId": number
  "retreatUserName": string
  hang:boolean
}
export class partscar {
  "brandId": number
  "brandName": string
  "modelName": string
  "seriesId": number
  "seriesName": string
}
export class repairRetreatHangDto {
  "carNo": string
  "customerName": string
  "orderId": number
  "orderNo": string
  'stRepairRetreat':Array<stRepairRetreats> = new Array<stRepairRetreats>()
}


export class stRepairRetreats {
  "partsId": number
  "price": number
  "retreatCount": number
  "retreatUserId": number
  "retreatUserName": string
  "rpCode": string
  "rpId": number
  "stockId": number
  "totalPrice": number
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
