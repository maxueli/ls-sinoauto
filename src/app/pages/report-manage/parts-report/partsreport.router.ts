import { PartsReportComponent } from './parts-report.component';
export const partsreportRouter=[
    {
        path:'',
        component:PartsReportComponent,
        children:[
            {
                path:'outinstat',//出入库统计
                loadChildren:'./outin-stat/outin-stat.module#OutinStatModule'
            }
        ]
    }
]