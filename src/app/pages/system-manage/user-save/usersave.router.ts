import { UserSaveComponent } from './user-save.component'
import {UserManageComponent} from './user-manage/user-manage.component'
export const userSaveRouter = [
    {
        path: '',
        component: UserSaveComponent,
        children:[
            {
                path:'usermanage',//用户管理
                component:UserManageComponent
            }
        ]
    }
]
export const userSaveCom=[UserSaveComponent,UserManageComponent]