export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class partssearch extends PageParams {
    partsTypeName: string;
    partsCode: string;
    partsName: string;
    modelName: string;

}
export class partstypeParmas extends PageParams {
   public partsTypeName:string;

}

