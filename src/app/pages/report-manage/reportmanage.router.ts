import { ReportManageComponent } from './report-manage.component';
export const reportManageRouter=[
    {
        path:'',
        component:ReportManageComponent,
        children:[
            {
                path:'manageanlysis',//经营分析
                loadChildren:'./manage-anlysis/manage-anlysis.module#ManageAnlysisModule'
            },{
                path:'repairreport',//维修报表
                loadChildren:'./repair-report/repair-report.module#RepairReportModule'
            },{
                path:'partsreport',//配件报表
                loadChildren:'./parts-report/parts-report.module#PartsReportModule'
            }
        ]
    }
]