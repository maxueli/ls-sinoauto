import { RouterModule } from '@angular/router';


//项目的主路由
/**
 * 用户的路由1.用户登录2.用户注册3.忘记密码
 * 内容部分的路由（由于内容比较多不写出列表）
 */
export const appMianRoute=[
    {
        path:'',
        redirectTo:'user',
        pathMatch:'full'
    },{
        path:'user',
        loadChildren:'./login/login.module#LoginModule'
    },{
        path:'pages',
        loadChildren:'./pages/pages.module#PagesModule'
    }
]