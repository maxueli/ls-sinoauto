import { pageParams } from '../parts-out'
export class customer extends pageParams {
  name: string;
  customermobile?: string;
}
//增加销售出库
export class addSellOut {
  hangId?: number;
  sellOuts: Array<sellOut> = [];
}
export class sellOut {
  count: number = 1;//数量
  customerId: number;//客户id
  partsId: number;//配件id
  price: number;//单价
  remark: string;//备注
  returnCount: number = 0;//已退数量
  sellerId: number;//销售员id
  settlementType: number = 1;//结算方式
  stockId: number;//仓位id
  totalPrice: number;//金额
}
export class hanglogs extends pageParams {
  hangType: number = 4;
}
export class print {
  outSellBill: string;//出库单号
  customerName: string;//客户名称
  salesperson: string;//销售员
  openTime: any;//开单时间
  printData = [];//打印数据
  sum:number;
  printTime: any;//打印时间
  operators: string;//操作人
  collector: string;//领料人
}
