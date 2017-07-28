import { pageParams } from '../parts-out'
export class insidePackDto {
    hangId?: string;
    insidePacks: Array<insidePack> = []
}
export class insidePack {
    packCount: number;
    packOrgId: number;
    packUserId: number;
    partsId: number;
    price: number;
    returnCount: number = 0;
    stockId: number;
    totalPrice: number;
}
export class hanglogs extends pageParams {
    hangType: number = 5;
}
export class hanginsidepackList {
    partsCode: string;//配件编码
    partsName: string;//配件名称
    partsTypeName: string;//配件类型
    brandName: string;//品牌
    partsSpec: string;//规格型号
    partsUnit: string;//单位
    depotName: string;
    depotPosName: string;
    inventory: number;//库存
    count: number = 1;//数量
    sellPrice: number;//单价（元）
    totalPrice: number;//金额（元）
}
  export class print {
  receiveBill:string;//领料单号
  department:string;//部门
  openTime: any;//开单时间
  printData = [];//打印数据
  sum:number;
  printTime: any;//打印时间
  operators: string;//操作人
  collector: string;//领料人
}
