import { Component, ViewChild } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { InventoryService } from './inventoryService';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { inventoryModal, inventorysearch, depotParams, InsertInventoryDto, searchDepotDetail, InsertInventoryDetailsDto } from './inventoryModal';

@Component({
    moduleId: module.id,
    selector: 'inventory-count',
    templateUrl: 'inventory-count.component.html',
    styleUrls: ['inventory-count.component.scss'],
    animations: [flyIn]
})
export class InventoryCountComponent {
    @ViewChild('lgModal') public lgModal: ModalDirective;
    public inventoryPatams: inventoryModal = new inventoryModal();
    public inventorysearch: inventorysearch = new inventorysearch();
    public createParam: InsertInventoryDto = new InsertInventoryDto();
    // public depotParams: depotParams = new depotParams();
    public depotParams: depotParams = new depotParams();
    public insertInventory: InsertInventoryDetailsDto = new InsertInventoryDetailsDto();
    public list: Array<inventoryModal>;
    public dateils: Array<any>;
    public depotlist: Array<any>;
    // public insertlist: Array<insertInventory> = new Array<insertInventory>();
    public countinsert: Array<any> = new Array<any>();
    // public countObg: insertInventory = new insertInventory();
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public dateilLength: number;
    public tableLoad: boolean = true;

    public searchDepotDetail: searchDepotDetail = new searchDepotDetail();
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    constructor(
        public _route: Router,
        public inventoryService: InventoryService,
    ) { }

    ngOnInit() {
        this.inventorylist();
        this.depotChange();

    }
    // 获取盘点清单列表
    private inventorylist() {
        this.list = null;
        this.inventoryService.getlist(this.inventorysearch)
            .then(res => {
                console.log(res);
                this.totalItems = 0
                if (res.result.length > 0) {
                    this.totalItems = res.totalCount;
                    this.list = res.result;
                    this.maxPageSize = Math.ceil(res.totalCount / this.inventorysearch.pageSize);
                }
            })
            .catch(Error => {
                console.log(Error)
            })
    }

    //获取仓库
    private depotChange() {
        this.inventoryService.postdepot(this.depotParams).then(res => {
            console.log('获取仓库    ', res);
            this.depotlist = res.result;
            this.searchDepotDetail.depotId = res.result[0].depotId;

        }).catch(Error => {
            console.log(Error);
        });
    }
    // 创建盘点清单
    private Establish() {

        this.inventoryService.getdlist(this.searchDepotDetail)
            .then(res => {
                console.log('仓库detail   ', res);
                this.dateils = res.result;
                this.dateilLength = res.totalCount;
                this.createParam = new InsertInventoryDto();
                this.createParam.depotId = Number(this.searchDepotDetail.depotId);
                res.result.forEach(element => {
                    this.insertInventory = new InsertInventoryDetailsDto();
                    this.insertInventory.cost = element.totalCost;
                    this.insertInventory.depotPosId = element.depotPosId;
                    this.insertInventory.stock = element.stockId;
                    this.insertInventory.partsId = element.partsId;
                    this.createParam.inventoryDetailsDto.push(this.insertInventory);
                });
            })
            .catch(resp => {
                console.log(resp)
            })
    }
    //生成盘点清单
    public Generate() {
        console.log(this.createParam);
        this.Establish();
        this.inventoryService.Generate(this.createParam)
            .then(res => {
                console.log(res);

            })
            .catch(resp => {
                console.log(resp)
            })
        //点击生成盘点清单 关闭模态框 重新加载清单列表
        this.lgModal.hide();
        this.inventorylist();
    }

    public depotsearc() {
        this.Establish();


    }
    // 查询
    private inventorySearc() {
        this.inventorylist();
    }

    // 获取盘点清单分页
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.inventorysearch.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.inventorysearch.setPage(this.index);
        }
        this.inventorylist();
    }
    private detail(conentid, inventoryCode) {

        this._route.navigate(['/pages/partsManage/inventorydetail', { 'conentid': conentid, 'code': inventoryCode }]);
    }


    // 时间校验
    private timeChange() {
        if (this.inventorysearch.beginTime && this.inventorysearch.endTime) {
            this.inventorysearch.beginTime <= this.inventorysearch.endTime ? this.timeError = false : this.timeError = true;
            // console.log(this.searchParam.beginTime <= this.searchParam.endTime)
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }

}
