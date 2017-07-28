import { RouterModule } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { LoginComponent } from './login.component';


//user路由模块
export const UserRouter=[
    {
        path:'',
        component:LoginComponent,
        children:[
            {
                path:'',
                redirectTo:'userLogin',
                pathMatch:'full'
            },{
                path:'userLogin',
                component:UserloginComponent
            }
        ]
    }
]