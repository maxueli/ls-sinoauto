export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class user extends PageParams {
    public searchKey: string;
}
export class adduser {
    public userId: string;
    public userName: string;
    public mobile: string;
    public password: string;
    public roleIdStr: string;
    public posIdStr: string;
    public remark: string;
}