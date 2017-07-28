export class SelectOption {
    constructor(
        public text?: string,
        public value?: string,
        public selected?: boolean
    ) {
    }
}
export class SelectOptionGroup {
    public label: string;
    public options: Array<SelectOption>;

    constructor(label: string, options: Array<SelectOption>) {
        this.label = label;
        this.options = options;
    }
}
export class SearchParams {
    public serialize(): string {
        let self = this;
        return Object.keys(this)
            .filter(key => key !== "keyName")
            .map(function (key) {
                if (self[key] === '' || self[key] === null || self[key] === undefined) return null;
                return key + "=" + self[key];
            })
            .filter(m => m != null)
            .join('&');
    }

    protected keyName: string;

    public init(): void {
        let key = `SearchParams.${this.keyName}`;
        let value = sessionStorage.getItem(key);
        if (!value) return;
        let obj = JSON.parse(value);
        Object.keys(this).forEach(key => {
            if (obj[key] !== undefined && obj[key] !== null) {
                this[key] = obj[key];
            }
        });
    }

    public save(): void {
        let key = `SearchParams.${this.keyName}`;
        let value = JSON.stringify(this);
        sessionStorage.setItem(key, value);
    }
}

export class PagedParams extends SearchParams {
    public pageIndex = 1;
    public pageSize = 10;

    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
export class allTableModal{
    code:string=""//用来验证唯一
    url:string=""//请求的地址
    params?:any//请求参数
}
export class smallSelectOption{
    public key:number;
    public value:string;
}