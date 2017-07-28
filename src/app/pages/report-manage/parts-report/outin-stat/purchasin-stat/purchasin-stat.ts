import { PagedParams } from '../../../../../privaders/common.modal';
export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class purchreport extends PageParams {
    public supplierId: Number;
    public beginTime: string;
    public endTime: string;
    public orgId: Number;
}
export class repairdetail {
    public purchCode: string;
}
export class detailInfo {
    public purchCode: string;
    public supplierName: string;
    public createTime: string;
    public operUserName: string;
    public depotName: string;
    public depotPosName: string;
    public price: Number;
    public taxPrice: Number;
    public totalTaxPrice: Number;
    public count: Number;
    public totalPrice: Number;
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
export class stCarModel {
    public createTime: string;
    public dmlFlag: Number;
    public dmlTime: string;
    public factoryId: Number;
    public modelId: Number;
    public modelName: string;
    public remark: string;
    public seriesId: Number;
}
// 供应商查询参数
export class suppliersearch extends PagedParams {
    public supplierCode: string;
    public supplierName: string;
    public contacts: string;
    public contactPhone: string;
}
// 门店查询参数
export class storesearch extends PagedParams {
    public orgName: string;
    public level: string;
    public orgNature: Number;
}
export class searchtableParam extends PagedParams {
    public supplierName: string;
    public supplierCode: string;
    public contacts: string;
}
export class supplierSelectParam extends PagedParams {
    public supplierCode: string;
    public supplierName: string;
    public contacts: string;
    public contactPhone: string;
}
// 导出
export class exportInfos {
    public beginTime: string;
    public endTime: string;
    public supplierId: Number;
    public orgId: Number;
}