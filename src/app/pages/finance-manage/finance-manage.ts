export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
// 销售、维修收银列表
export class cash extends PageParams {
    public carNo: string;
    public cashierStatus: Number;
    public endTime: Date;
    public mobile: string;
    public name: string;
    public orderStatus: Number;
    public settlementNo: string;
    public settlementType: Number;
    public startTime: Date;
}
// 销售收银详细信息
export class detailListInfo {
    public sellCode: string;
    public customer: string;
    public seller: string;
    public sellTime: string;
    public depotName: string;
    public depotPosName: string;
    public price: Number;
    public count: Number;
    public totalPrice: Number;
    public remark: string;
}
// 销售收银配件信息
export class detailSellPartsInfo {
    public partsBrandName: string;
    public partsCode: string;
    public partsName: string;
    public partsSpec: string;
    public partsTypeName: string;
    public partsUnit: string;
}
// 确定收银
export class checkMonry {
    public cashMoney: string = '0'; //现金
    public wechatMoney: string = '0'; //微信
    public alipayMoney: string = '0'; //支付宝
    public bankMoney: string = '0'; //银行卡
    public cardMoney: string = '0'; //储蓄卡
    public checkMoney: string = '0'; //支票
    public claimMoney: string = '0'; //索赔
    public insuranceMoney: string = '0'; //保险理赔
    public id: Number;
    public cashType: Number;
}
// 销售收银详情
export class cashierDetail {
    public carNo: string;
    public carModel: string;
    public vin: string;
    public repairName: string;
    public repairMobile: string;
    public orderNo: string;
    public name: string;
    public mobile: string;
    public estimatedDeliveryTime: string;
    public servicerName: string;
    public recommender: string;
    public recommenderMobile: string;
    public repairTypeDesc: string;
    public deliveryTime: Date;
    public mileage: string;
    public factoryMileage: string;
    public amountDue: string = '0';
}
// 维修项目信息
export class projectDto {
    public projectName: string;
    public orderRepairId: Number;
    public projectId: Number;
    public repairHour: Number;
    public hourPrice: Number;
    public discount: Number;
    public totalCount: string = '0';
    public repairUserName: string;
    public repairPackDtos: DetailRepairPackDto = new DetailRepairPackDto();
}
export class DetailRepairPackDto {
    public count: Number;
    public partsId: Number;
    public price: Number;
    public rpId: Number;
    public totalPrice: string = '0';
    public partsBrandId: Number;
    public partsBrandName: string;
    public partsName: string;
    public partsSpec: string;
    public projectName: string;
}
// 结算信息
export class settlementDto {
    public settlementUserName: string;
    public settlementNo: string;
    public settlementTime: string;
}
// 筛选参数
export class cashsearch extends PageParams {
    public carNo: string;
    public cashierStatus: string;
    public endTime: Date;
    public mobile: string;
    public name: string;
    public orderStatus: string;
    public settlementNo: string;
    public settlementType: Number;
    public startTime: Date;
}





