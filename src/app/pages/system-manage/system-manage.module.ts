// Angular Imports
import { NgModule } from '@angular/core';
import { LoadChildren, RouterModule } from '@angular/router';
import { TreeModule } from 'ng2-tree';
import { ModalModule, PaginationModule, BsDropdownModule } from 'ngx-bootstrap';


// This Module's Components
import { SystemManageComponent } from './system-manage.component';

import { UserManageService } from './user-save/user-manage/user-manage.service';
import { StroeManageComponent } from './stroe-manage/stroe-manage.component';
import { StroeAddComponent } from './stroe-manage/stroe-add/stroe-add.component';
import { BaTreeComponent } from '../../theme/ba-tree/ba-tree.component';
import { CommonModule } from '@angular/common';
import { StroeManService } from './stroe-manage/stroeManageService';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


export const systemManageRouter = [
    {
        path: '',
        component: SystemManageComponent,
        children: [
            {
                path: 'partstool',//配件和工具
                loadChildren: './parts-tool/parts-tool.module#PartsToolModule'
            }, {
                path: 'usersave',//用户管理
                loadChildren: './user-save/user-save.module#UserSaveModule'
            },{
                path:'stroemanage',//门店管理
                component:StroeManageComponent
            },{
                path:'storeadd',//用户添加
                component:StroeAddComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(systemManageRouter),
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        CommonModule,
        TreeModule,
        FormsModule,ReactiveFormsModule
    ],
    declarations: [
        SystemManageComponent,StroeAddComponent,StroeManageComponent,BaTreeComponent
    ],
    exports: [
        SystemManageComponent,
    ],
    providers:[UserManageService,StroeManService]
})
export class SystemManageModule {

}

