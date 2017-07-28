export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class storeMangeModal extends PageParams {
    public depotId;
    public depotPosName: string;
    public partsCode: string;
    public partsName: string;
    public modelName: string;

}

//编辑
export class editstockParams {
    public stockId;
    public stockStatus: string;
    public depotName: string;
    public depotPosId: string;
    public depotPosName: string;
    public partsCode: string;
    public partsTypeName: string;
    public partsName: string;
    public brandName: string;
    public partsSpec: string;
    public inventory: string;
    public modelName: string;
    public partsUnit: string;
    public cost: string;
    public totalCost: string;
    public sellPrice: string;
    public lastBid: string;
    public maxStock: string;
    public minStock: string;
    public packSpec: string;
    public originPlace: string;
    public remark: string;

}
//仓库
export class depotParams extends PageParams {
    public depotName: string;
    public depotCode: string;
    public depotId;
}
//获取车型
export class cartypeParmas extends PageParams {
    public key;
    public value: string;
}
//获取库存状态
export class EnableParams {
    public stockId;
    public stockStatus: boolean;
}
//配件参数
export class partsParams extends PageParams {
    public brandId;
    public depotName: string;//仓库
    public depotPosName: string;//库位
    public maxStock;//最大存库
    public minStock;//最小库存
    public partsCode: string;
    public partsTypeId;//配件类型ID
    public partsTypeName: string;
    public partsBrandId: string;
    public brandName: string;
    public partsBrandName: string;
    public partsName: string;
    public partsSpec: string;//规格型号
    public partsUnit: string;
    public originPlace: string;
    public packSpec: string;//包装规格
    public remark: string;
    public carModels = [];
    public partsId;//配件ID
    public stockId;
    public depotId;
    public depotPosId;
    public depotPosNam: string;
}

export class stockParmas extends PageParams {
    public depotId;//仓库ID
    public brandId;//品牌ID
    public partsBrandId;//品牌ID
    public carModelIds;//使用车型
    public depotPosId;//仓位ID
    public depotPosName: string;//仓位
    public maxStock;//最大库存
    public minStock;//最小库存
    public originPlace: string;//产地
    public packSpec: string;//包装规格
    public partsCode: string;//配件编码
    public partsId;//配件ID
    public partsName: string;//配件名称
    public partsSpec: string;//规格型号
    public partsTypeId;//配件类型ID
    public partsUnit: string;//单位
    public stockId;
    public partsBrandName: string;
}
