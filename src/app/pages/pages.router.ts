
import { PagesComponent } from './pages.component';
import { PurchasingmanageComponent } from './purchasingmanage/purchasingmanage.component';
import { LoadChildren, RouterModule } from '@angular/router';
/**
 * 主页子路由
 */

export const pageRoute = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                redirectTo: 'purchasing',
                pathMatch: 'full'
            }, {
                path: 'purchasing',
                component: PurchasingmanageComponent
            },{
                path:'userService',//用户接待
                loadChildren:'./user-service/user-service.module#UserServiceModule'
            },{
                path:'workshopmanage',//车间管理
                loadChildren:'./workshop-management/workshop-management.module#WorkshopManagementModule'
            },{
                path:'partsManage',//配件管理
                loadChildren:'./parts-manage/parts-manage.module#PartsManageModule'
            },{
                path:'customerManage',//客户管理
                loadChildren:'./customer-manage/customer-manage.module#CustomerManageModule'
            },{
                path:'financeManage',//财务管理
                loadChildren:'./finance-manage/finance-manage.module#FinanceManageModule'
            },{
                path:'reportManage',//报表管理
                loadChildren:'./report-manage/report-manage.module#ReportManageModule'
            },{
                path:'systemManage',//系统管理
                loadChildren:'./system-manage/system-manage.module#SystemManageModule'
            }
        ]
    }

]