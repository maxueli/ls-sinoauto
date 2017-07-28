import { pageParams } from '../parts-out';
export class findSuppliers extends pageParams {
    supplierName: string;
}
export class findsupplier extends pageParams {
    SupplierId: number;
}
export class findpurchcode extends pageParams {
    purchCode: string;
}

export class findTableIn {
    count: number;
    depotName: string;
    depotPosName: string;
    partsBrandName: string;
    partsCode: string;
    partsName: string;
    partsSpec: string;
    partsTypeName: string;
    partsUnit: string;
    partsId: string;
    purchCode: string;
    purchId: string;
    stockId: string;
    price: number;
    returnCount: number;
    taxPrice: number;
    totalPrice: number;
    totalTaxPrice: number;
}
export class findModelIn {
    count: number;
    depotName: string;
    depotPosName: string;
    partsBrandName: string;
    partsCode: string;
    partsName: string;
    partsSpec: string;
    partsTypeName: string;
    partsUnit: string;
    partsId: string;
    purchCode: string;
    purchId: string;
    stockId: string;
    price: number;
    returnCount: number;
    taxPrice: number;
    totalPrice: number;
    totalTaxPrice: number;
}
export class findTableOut {
    count: number;
    depotName: string;
    depotPosName: string;
    partsBrandName: string;
    partsCode: string;
    partsName: string;
    partsSpec: string;
    partsTypeName: string;
    partsUnit: string;
    partsId: string;
    purchCode: string;
    purchId: string;
    stockId: string;
    price: number;
    returnCount: number;
    taxPrice: number;
    totalPrice: number;
    totalTaxPrice: number;
}
export class purchaseReturn {
    partsId: string;
    price: number;
    purchCode: string;
    purchId: string;
    retreatCount: number;
    stockId: string;
    taxPrice: number;
    totalPrice: number;
    totalTaxPrice: number;
}
export class purchretreataddhang {
    purchCode: string;//单号
    supplierName: string;//供应商名字
    stPurchRetreats: Array<stPurchRetreat> = [];
}
export class stPurchRetreat {
    partsId: string;
    price: number;
    purchId: string;
    retreatCount: number;
    stockId: string;
    taxPrice: number;
    totalPrice: number;
    totalTaxPrice: number;
}
//挂单
export class hanglogs extends pageParams {
    hangType: number = 6;
}
export class print {
    receiveBill: string;//领料单号
    department: string;//部门
    openTime: any;//开单时间
    printData = [];//打印数据
    sum: number;
    printTime: any;//打印时间
    operators: string;//操作人
    collector: string;//领料人
}
