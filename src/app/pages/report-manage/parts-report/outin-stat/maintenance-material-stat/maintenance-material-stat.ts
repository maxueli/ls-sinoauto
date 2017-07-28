export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class repairreport extends PageParams {
    public carNo: string;
    public beginTime: string;
    public endTime: string;
    public orgId: Number;
}
export class repairdetail {
    public rpCode: string;
}
export class detailInfo {
    public rpCode: string;
    public carNo: string;
    public createTime: string;
    public operUserName: string;
    public repairProject: string;
    public depotName: string;
    public depotPosName: string;
    public price: Number;
    public count: Number;
    public totalPrice: Number;
    public remark: string;
    public packUserName: string;
    public parts: partsInfo = new partsInfo();
}
export class partsInfo {
    public partsCode: string;
    public partsTypeName: string;
    public partsName: string;
    public brandName: string;
    public partsSpec: string;
    public partsUnit: string;
    public carModels: Array<any>;
    public inventory: Number;
    public originPlace: string;
    public packSpec: string;
    public partsId: Number;
    public sellPrice: Number;
}
// 门店查询参数
export class storesearch extends PageParams {
    public orgName: string;
    public level: string;
    public orgNature: Number;
}
// 车牌号查询参数
export class carnosearch extends PageParams {
    public carNo: string;
}
// 导出
export class exportInfos {
    public beginTime: string;
    public endTime: string;
    public carNo: string;
    public orgId: Number;
}

