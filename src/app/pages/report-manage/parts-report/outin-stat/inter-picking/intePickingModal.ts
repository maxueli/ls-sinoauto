
export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class intePickingModal extends PageParams {
    public userName:string;
    public packUserId;
    public ipId;
    public packOrgId;
    public beginTime: string;
    public endTime: string;
}
export class interPickinginfo {
    public ipCode: string;
}
//详情
export class interPickingdatwils {
    public ipCode: string;
    public departmentName: string;
    public depotName: string;
    public createTime: string;
    public operUserName: string;
}
//parts
export class interPickingparts {
    public inventory;
    public originPlace: string;
    public packSpec: string;
    public partsCode: string;
    public partsId;
    public partsName: string;
    public partsSpec: string;
    public partsTypeName: string;
    public partsUnit: string;
    public sellPrice: number;
}
