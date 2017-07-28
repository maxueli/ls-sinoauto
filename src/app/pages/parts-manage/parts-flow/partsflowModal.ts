export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class partsflowModal extends PageParams {
    public partsId;
    public stockId;
    public type;
    public beginTime: string;
    public endTime: string;

}
export class flowtemParams extends PageParams {
    public brandName:string;//品牌
    public partsCode:string;//配件编码
    public partsName:string;//配件名称
    public partsTypeName:string;//配件分类
    public partsSpec:string;//规格型号
    public partsUnit:string;//单位
    public inventory:string;//库存量
    public createTime:string;//最新入库日期
    public dmlTime:string;//最新出库日期

}
