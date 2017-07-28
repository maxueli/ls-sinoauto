import { UserServiceComponent } from './user-service.component';
import { GdSelectComponent } from './gd-select/gd-select.component';
import { CreatGdComponent } from './creat-gd/creat-gd.component';
import { MaintenanceWorkComponent } from './maintenance-work/maintenance-work.component';
import { MaintenanceIncrementComponent } from './maintenance-increment/maintenance-increment.component';
import { MaintenanceSettlementComponent } from './maintenance-settlement/maintenance-settlement.component';
export const UserServiceRouter=[
    {
        path:'',
        component:UserServiceComponent,
        children:[
            {
                path:'',
                redirectTo:'gdselect',
                pathMatch:'full'
            },
            {
                path:'gdselect',//工单管理
                component:GdSelectComponent
            },{
                path:'creatgd',//创建工单
                component:CreatGdComponent
            },{
                path:'Maintenancework',//维修派工
                component:MaintenanceWorkComponent
            },{
                path:'Maintenanceincrement',//维修增项
                component:MaintenanceIncrementComponent
            },{
                path:'Maintenancesettlement',//维修结算
                component:MaintenanceSettlementComponent
            }
        ]
    }
]
export const UserServiceCom=[UserServiceComponent,GdSelectComponent,CreatGdComponent,MaintenanceIncrementComponent,MaintenanceSettlementComponent,MaintenanceWorkComponent]