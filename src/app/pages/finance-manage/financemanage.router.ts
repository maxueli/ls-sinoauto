import { FinanceManageComponent } from './finance-manage.component';
import { MaintenanceCashierComponent } from './maintenance-cashier/maintenance-cashier.component';
import { SellCashierComponent } from './sell-cashier/sell-cashier.component';
export const financeManageRouter=[
    {
        path:'',
        component:FinanceManageComponent,
        children:[
            {
                path:'',
                redirectTo:'',
                pathMatch:'full'
            },{
                path:'maintenancecashier',//维修收银
                component:MaintenanceCashierComponent
            },{
                path:'sellcashier',//销售收银
                component:SellCashierComponent

            }
        ]
    }
]
export const FinanceManageCom=[FinanceManageComponent,MaintenanceCashierComponent,SellCashierComponent]