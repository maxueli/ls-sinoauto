export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class suppliersearc extends PageParams {
    public supplierId: number;
    public supplierName: string;
    public supplierCode: string;
    public supplierAddress: string;
    public contacts: string;
    public contactPhone: string;
    public zipCode: string;
    public shortName: string;
    public remark: string;
    public landline: string;

}
export class addsupplier {
    public supplierId: number;
    public supplierCode: string;
    public contactPhone: string;
    public contacts: string;
    public isEnable: true;
    public landline: string;
    public remark: string;
    public shortName: string;
    public supplierAddress: string;
    public supplierName: string;
    public zipCode: string;
}

export class Insertsupplier {
    public supplierDetailsDto: Array<EnableParams> = new Array<EnableParams>();
}
export class EnableParams {
    public supplierId;
    public isEnable: boolean;
}


