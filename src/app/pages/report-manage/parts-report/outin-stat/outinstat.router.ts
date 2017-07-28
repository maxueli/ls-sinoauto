import { OutinStatComponent } from './outin-stat.component';
import { PurchasinStatComponent } from './purchasin-stat/purchasin-stat.component';
import { MaintenanceMaterialStatComponent } from './maintenance-material-stat/maintenance-material-stat.component';
import { PartsSellStatComponent } from './parts-sell-stat/parts-sell-stat.component';
import { InterPickingComponent } from './inter-picking/inter-picking.component';
import { InvoicingSummaryComponent } from './invoicing-summary/invoicing-summary.component';
import { InvoicingDetailComponent } from './invoicing-summary/invoicing-detail/invoicing-detail.component';
export const outinStatRouter = [
    {
        path: '',
        component: OutinStatComponent,
        children: [
            {
                path: 'purchasinstat',//采购入库统计
                component: PurchasinStatComponent,
            }, {
                path: 'maintenancematerialstat',//维修发料统计
                component: MaintenanceMaterialStatComponent
            }, {
                path: 'partssellstat',//配件销售统计
                component: PartsSellStatComponent
            }, {
                path: 'interpicking',//内部领料统计
                component: InterPickingComponent
            }, {
                path: 'invoicingsummary',//进销存统计
                component: InvoicingSummaryComponent
            }, {
                path: 'invoicingdetail',//进销存统计
                component: InvoicingDetailComponent
            }
        ]
    }
]
export const outinStatCom = [OutinStatComponent, PurchasinStatComponent, MaintenanceMaterialStatComponent, PartsSellStatComponent, InterPickingComponent, InvoicingSummaryComponent, InvoicingDetailComponent]
