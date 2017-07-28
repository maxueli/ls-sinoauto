export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class outputSummaryModal extends PageParams {
     public orgNature:string;
     public beginTime:string;
     public endTime:string;
     public endTaveragePerUnitYieldime:number;//平均单产
     public blend:number;//混合
     public createTime:string;//订单创建时间
     public enteringPlantCount:string;//进厂台次
     public machineRepair:number;//机修
     public orgName:string;//门店姓名
     public partsSellPrice:number;//配件
     public sheetMetal:number;//钣金
}