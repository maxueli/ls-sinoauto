import { PagedParams } from '../../../../../privaders/common.modal';
export class partsSellStatParams {
    "sellId": number;
    "sellCode": string;
    "name": string;
    "userName": string;
    "totalPrice": number;
    "settlementType": string;
    "createTime": Date;
    "operUserName": string
    mobile: string
}
export class partsSellSelectParam extends PagedParams {
    partsCode: string;
    partsTypeName: string;
    partsName: string
    name: string
    mobile: string
    beginTime: string
    endTime: string
    orgId: string
}
export class searchtableParam extends PagedParams {
    partsCode: string;
    partsTypeName: string;
    partsName: string
}
export class searchtableUser extends PagedParams {
    public name: string;
    public sellCode: string;

}
export class partsSellid {
    public sellCode: string;
}
export class partsinfo {
    public partsTypeName: string;
}
//配件参数
export class partsParams extends PagedParams {
    public inventory;//库存量
    public brandName: string;//品牌
    public partsCode: string;//配件编码
    public partsTypeName: string;//配件分类
    public partsName: string;//配件名称
    public partsSpec: string;//规格型号
    public name: string;//客户名称
    public mobile: string;//手机号码

}