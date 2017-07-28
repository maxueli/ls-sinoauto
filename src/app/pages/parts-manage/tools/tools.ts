export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
// 仓库列表
export class depot extends PageParams{
    public depotName: string;
    public depotCode: string;
}
// 添加仓库信息
export class adddepot{
    public depotName: string;
    public depotCode: string;
    public remark: string;
}