import { PartsInComponent } from './parts-in.component';
import { MaintenanceUnmaterialComponent } from './maintenance-unmaterial/maintenance-unmaterial.component';
import { SellInComponent } from './sell-in/sell-in.component';
import { InterUnmaterialComponent } from './inter-unmaterial/inter-unmaterial.component';
import { PurchansInComponent } from './purchans-in/purchans-in.component';
export const partsInRouter=[
    {
        path:'',
        component:PartsInComponent,
        children:[
            {
                path:'maintenanceunmaterial',//维修退料，
                component:MaintenanceUnmaterialComponent
            },{
                path:'sellin',//销售退库
                component:SellInComponent
            },{
                path:'interunmaterial',//内部退料
                component:InterUnmaterialComponent
            },{
                path:'purchansin',//采购入库
                component:PurchansInComponent
            }
        ]
    }
]
export const partsInCom=[PartsInComponent,MaintenanceUnmaterialComponent,SellInComponent,InterUnmaterialComponent,PurchansInComponent]