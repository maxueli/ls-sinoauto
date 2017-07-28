import { PartsOutComponent } from './parts-out.component';
import { MaintenanceMaterialComponent } from './maintenance-material/maintenance-material.component';
import { SellOutComponent } from './sell-out/sell-out.component';
import { InterMaterialComponent } from './inter-material/inter-material.component';
import { PurchansReturnsComponent } from './purchans-returns/purchans-returns.component';
export const partsoutRouter = [
    {
        path: '',
        component: PartsOutComponent,
        children: [
            {
                path: 'maintenance',//维修领料
                component: MaintenanceMaterialComponent
            }, {
                path: 'sellout',//销售出库
                component: SellOutComponent
            }, {
                path: 'intermaterial',//内部领料
                component: InterMaterialComponent
            }, {
                path: 'purchansreturn',//采购退库
                component: PurchansReturnsComponent
            }, {
                path: '',
                redirectTo: 'maintenance',
                pathMatch: 'full'
            }
        ]
    }
]
export const partsOutCom = [PartsOutComponent, MaintenanceMaterialComponent, SellOutComponent, InterMaterialComponent, PurchansReturnsComponent]