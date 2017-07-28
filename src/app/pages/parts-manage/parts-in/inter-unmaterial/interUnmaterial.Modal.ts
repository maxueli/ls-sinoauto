import { PagedParams } from '../../../../privaders/common.modal';
export class interUnmaterpackUser {
    packUserId: number;
    finddeparts: number;
}
//用来查询内部领料单
export class departIdAnduserId {
    userId: number;
    departId: number;
    ipCode: string;
}
export class findinsideretreatsParam {

}
//post领料单
export class ReturnParams {
    public count;
    public surereturnCount:number;
    public depotName: string;
    public depotPosName: string;
    public inventory: number;
    public ipCode: string;
    public ipId :number;
    public partsBrandName: string;
    public partsCode: string;
    public partsId :number;
    public partsName: string;
    public partsSpec: string;
    public partsTypeName: string;
    public partsUnit: string;
    public price: number;
    public returnCount: string;
    public stockId: string;
    public totalPrice: number;
}
//post领料单
export class returnOk {
    public count;
    public surereturnCount:number;
    public depotName: string;
    public depotPosName: string;
    public inventory: number;
    public ipCode: string;
    public ipId :number;
    public partsBrandName: string;
    public partsCode: string;
    public partsId :number;
    public partsName: string;
    public partsSpec: string;
    public partsTypeName: string;
    public partsUnit: string;
    public price: number;
    public returnCount: string;
    public stockId: string;
    public totalPrice: number;
}
// 生成退料单
export class stInsideRetreats {
    "ipCode": string
    "ipId": number
    "partsId": number
    "price": number
    "retreatCount": string
    "stockId": string;
    "totalPrice": number
}
// 挂单
export class insideRetreatHangDto {
    "ipCode": string;
    "packDepart": string;
    "packUserName": string;
    "stInsideRetreats":Array<stInsideRetreats> = new Array<stInsideRetreats>();
}

export class gethanglogs extends PagedParams {
    hangType:number=9;

}