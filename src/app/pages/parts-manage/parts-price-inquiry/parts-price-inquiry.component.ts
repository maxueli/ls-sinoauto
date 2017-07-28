import { Component } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { partsPriceService } from './partsPriceService';
import { partssearch, partstypeParmas } from './partsPriceModal';

@Component({
    moduleId: module.id,
    selector: 'parts-price-inquiry',
    templateUrl: 'parts-price-inquiry.component.html',
    styleUrls: ['parts-price-inquiry.component.scss'],
    animations: [flyIn]
})
export class PartsPriceInquiryComponent {
    // public partsParams: partsPriceModal = new partsPriceModal();
    public totalItems: number;
    public total: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public searchLoad: boolean = true;
    public tableLoad: boolean = true;
    public isparts: boolean = false;
    public searchParams: partssearch = new partssearch();
    public partstypeParmas: partstypeParmas = new partstypeParmas();
    public list: Array<any>;
    public listname: Array<any>;
    public partstypelist: Array<any>;
    constructor(
        public partsPriceService: partsPriceService
    ) { }

    ngOnInit() {
        this.partslist();


    }
    //获取配件销售价格查询列表
    private partslist() {
        this.list = null;
        this.partsPriceService.getlists(this.searchParams).then(res => {
            console.log(res);
            this.totalItems = 0;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.total = res.totalCount;
                this.list = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.searchParams.pageSize);
            }

        })
            .catch(Error => {
                console.log(Error)
            })
    }
    // 配件分类下拉
    public partstype() {
        this.partsPriceService.partstype(this.searchParams).then(res => {
            console.log(res);
            if (res.result.length > 0) {
                this.partstypelist = res.result;
            }

        }).catch(Error => {
            console.log(Error)
        });
    }
    // 点击inpu显示隐藏内容
    public partsTypeName() {
        this.isparts = true;
        this.partstype()
    }
    //获取下拉item
    public selectTypeName(content){
        this.searchParams.partsTypeName = content.partsTypeName;
         this.isparts = false;
    }


    //配件销售价格查询
    private partsearch() {
        this.partslist();
    }
    //配件销售价格分页
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.searchParams.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.searchParams.setPage(this.index);
        }
        this.partslist();
    }
        // 配件销分页条页数更改
    private pageChange(event, temp) {
        if (temp == 'selectTypeName') {
            this.searchParams.setPage(event.page);
             this.partslist();
        }
    }

}
