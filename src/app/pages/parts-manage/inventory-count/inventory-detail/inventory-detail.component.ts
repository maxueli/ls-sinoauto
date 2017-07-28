import { Component } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventoryService'
import { inventoryModal } from '../inventoryModal';
import { helpers } from '../../../../privaders/helper';
import { simAnim, fadeIn, flyIn } from '../../../../app.animation';

@Component({
    selector: 'inventory-detail',
    templateUrl: 'inventory-detail.component.html',
    styleUrls: ['inventory-detail.component.scss'],
    animations:[flyIn]
})
export class InventoryDetailComponent {
    public detailparams: inventoryModal = new inventoryModal();
    // public detailparams: inventoryDetail = new inventoryDetail();
    public myparams: any;
    public printDate;
    public listetail: Array<any>;
    public isShow:boolean = true;

    constructor(
        public _route: Router,
        private _rout: ActivatedRoute,
        public inventoryService: InventoryService,
        public _helpers: helpers
    ) {
        this.myparams = this._rout.snapshot.params

    }

    ngOnInit() {
        this.inventorydetails();

    }
    //获取盘点清单详情
    private inventorydetails() {
        this.printDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        this.detailparams.depotID = this.myparams.conentid;
        this.detailparams.inventoryCode = this.myparams.code;
        console.log(this.detailparams);
        this.listetail = null;
        this.inventoryService.getdateils(this.detailparams)
        .then(res => {
            console.log(res);
            this.listetail = res.result;
        })
        .catch(resp=>{
            console.log(resp)
        })
    }

    // 打印盘点清单
    private orderPrint() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock()
    }

    private detail() {
        this._route.navigate(['/pages/partsManage/inventorycount']);
    }

}
