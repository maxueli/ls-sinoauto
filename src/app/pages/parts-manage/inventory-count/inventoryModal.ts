export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class inventoryModal extends PageParams {
    public depotID: string;
    public inventoryCode: string;
    public depotName: string;
    public createTime: string;
    public operUserName: string;
}
export class inventorysearch extends PageParams {
    public inventoryCode: string;//仓库
    public beginTime: string;//开始时间
    public endTime: string;//结算时间
    public operUserName: string;//操作用户
}
export class depotParams extends PageParams {
    public depotName: string;
    public depotCode: string;

}
// export class insertInventory {
//     public depotId;
//     public cost;
//     public depotPosId;
//     public partsId;
//     public stock;

// }
export class searchDepotDetail extends PageParams {
    public depotId: number;
}
export class InsertInventoryDto {
    public depotId;
    public inventoryDetailsDto: Array<InsertInventoryDetailsDto> = new Array<InsertInventoryDetailsDto>();
}
export class InsertInventoryDetailsDto {
    public cost: number;
    public depotPosId: number;
    public operUserId: number;
    public partsId: number;
    public stock: number;
}