export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class historyModal extends PageParams {
    carNo: string;//车牌号
    servicerName: string;//服务顾问
    inBeginTime: string;//进厂开始时间
    inEndTime: string;//进厂结束时间
    outBeginTime: string;//出厂开始时间
    outEndTime: string;//出厂结束时间
}
export class historyDetail {
    public orderId: string;
}
//历史维修详情
export class historyinfo {
    public carNo: string;
    public repairType: string;
    public repairName: string;
    public servicerName: string;
    public settlementUserName: string;
    public settlementName: string;
    public mileage: number;
    public factoryMileage: number;
    public modelName: string;
    public vin: string;
    public repairMobile: string;
    public orderNo: string;
    public settlement_no: string;
    public settlementTime: string;
    public createTime: string;
    public deliveryTime: string;
    public manHourFee: number;
    public manHourDiscount: number;//工时优惠金额 
    public manHourReceivableAmount: number;//工时应收金额
    public manHourTotalPrice: number;//工时合计金额
    public materialReceivableAmount: number;//材料应收金额    

}
//历史维修详情收费清单
export class Tolllist {
    public discountAmount: number;//优惠
    public manHourFee: number;//工时费
    public manHourRemark: number;//工时备注
    public materialFee;//材料费
    public materialRemark: number;//材料备注
    public totalPrice: number;//金额合计
    public receivableAmount: number;//应收金额
}
//历史维修详情工时明细
export class historyinfoTime {
    public projectName: string;//维修项目
    public discount: number;//折扣
    public repairHour: number;//结算工时
    public hourPrice: number;//结算工时单价
    public totalCount: number;//总价
    public remark: string;//备注  
}
//历史维修详情材料明细
export class historyMaterial {
    public partsName: string;//配件名称
    public price: number;//单价
    public count;//数量
    public totalPrice: number;//金额
    public remark: string;//备注
}
