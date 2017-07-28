import { PartsManageComponent } from './parts-manage.component';
import { PartsPriceInquiryComponent } from './parts-price-inquiry/parts-price-inquiry.component';
import { StockManageComponent } from './stock-manage/stock-manage.component';
import { PartsOutComponent } from './parts-out/parts-out.component';
import { PartsInComponent } from './parts-in/parts-in.component';
import { InventoryCountComponent } from './inventory-count/inventory-count.component';
import { PartsFlowComponent } from './parts-flow/parts-flow.component';
import { SupplierManageComponent } from './supplier-manage/supplier-manage.component';
import { ToolsComponent } from './tools/tools.component';
import { InventoryDetailComponent } from './inventory-count/inventory-detail/inventory-detail.component';

export const partsmanageRouter=[
    {
        path:'',
        component:PartsManageComponent,
        children:[
            {
                path:'',
                redirectTo:'priceinquiry',
                pathMatch:'full'
            },{
                path:'priceinquiry',//配件售价查询
                component:PartsPriceInquiryComponent,
            },{
                path:'stockmanage',//库存管理
                component:StockManageComponent
            },{
                path:'partsout',//配件出库
                loadChildren:'./parts-out/parts-out.module#PartsOutModule'
            },{
                path:'partsin',//配件入库
                loadChildren:'./parts-in/parts-in.module#PartsInModule'
            },{
                path:'inventorycount',//盘点清单
                component:InventoryCountComponent
            },{
                path:'partsflow',//配件流水
                component:PartsFlowComponent
            },{
                path:'supplier',//供应商管理
                component:SupplierManageComponent
            },{
                path:'tools',//配件和工具
                loadChildren:'./tools/tools.module#ToolsModule'
            },{
                path:'inventorydetail',
                component:InventoryDetailComponent
            }
        ]
    }
]
export const partsManageCom=[PartsManageComponent,PartsPriceInquiryComponent,StockManageComponent,InventoryCountComponent,PartsFlowComponent,SupplierManageComponent,InventoryDetailComponent]