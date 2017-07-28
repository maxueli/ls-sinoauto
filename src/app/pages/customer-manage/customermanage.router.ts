import { CustomerManageComponent } from './customer-manage.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerAddComponent } from './customer-info/customer-add/customer-add.component';
export const customermanageRouter = [
    {
        path: '',
        component: CustomerManageComponent,
        children: [
            {
                path: '',
                redirectTo: 'customerinfo',
                pathMatch: 'full'
            }, {
                path: 'customerinfo',//客户信息
                component: CustomerInfoComponent
            }, {
                path: 'customeradd',//客户信息
                component: CustomerAddComponent
            }
        ]
    }
]
export const customerManageCom = [CustomerManageComponent, CustomerInfoComponent, CustomerAddComponent]