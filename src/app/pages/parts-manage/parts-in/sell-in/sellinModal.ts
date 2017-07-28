import { PagedParams } from '../../../../privaders/common.modal';
export class sellUserParams extends PagedParams {
    name: string
}
export class sellUser {
    name: string;
    mobile: string;
}
export class findallselloutcodeParams extends PagedParams {
    sellOutCode: string; // 销售出库单号
}
export class HangOrderSearch extends PagedParams {
    public hangType: number = 8;    // 销售退库标识 8，不可更改
}
export class SellRetreatDto {
    public sellOutInfoDtos: SellOutInfoDto = new SellOutInfoDto();                      // 维修出库集合
    public sellRetreatRecordDtos: Array<SellRetreatRecordDto> = new Array<SellRetreatRecordDto>();
    public sellRetreatSelectDto: SellRetreatSelectDto = new SellRetreatSelectDto();     // 维修退库查询条件

}
export class SellOutInfoDto {
    public count: number;               //数量
    public depotName: string;           //仓库
    public depotPosName: string;        //库位
    public inventory: number;           //库存量
    public partsBrandName: string;      //配件品牌
    public partsCode: string;           //配件编码
    public partsId: number;             //配件ID
    public partsName: string;           //配件名称
    public partsSpec: string;           //规格型号
    public partsTypeName: string;       //配件分类
    public partsUnit: string;           //单位
    public price: number;               //单价
    public returnCount: number;         //已退数量
    public sellCode: string;            //销售出库编码
    public sellId: number;            //销售出库ID
    public stockId: number;             //仓库-配件表I
    public totalPrice: number;          //金额
}
export class SellRetreatRecordDto {
    public depotName: string;           //仓库
    public depotPosName: string;        //库位
    public hang: boolean;
    public inventory: number;           //库存量
    public partsBrandName: string;      //配件品牌
    public partsCode: string;           //配件编码
    public partsId: number;             //配件ID
    public partsName: string;           //配件名称
    public partsSpec: string;           //规格型号
    public partsTypeName: string;       //配件分类
    public partsUnit: string;           //单位
    public price: number;               //单价
    public retreatCount: number;        //已退数量
    public sellCode: string;            //销售出库编码
    public sellerId: number;            //销售出库ID
    public stockId: number;             //仓库-配件表Id
    public totalPrice: number;          //金额
}
export class SellRetreatSelectDto {
    public name: string;       //客户名称,
    public sellCode: string;             //销售退库单号,
    public mobile: string;           //电话
}
export class SellRetreat {
    public partsId: number;
    public price: number;
    public retreatCount: number;
    public sellCode: string;
    public sellId: number;
    public srCode: string;
    public srId: number;
    public stockId: number;
    public totalPrice: number;
}
export class SellRetreatHang {
    public customerName: string;
    public sellCode: string;
    public stSellRetreats: Array<SellRetreat> = new Array<SellRetreat>();
}