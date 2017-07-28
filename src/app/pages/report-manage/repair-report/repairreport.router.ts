import { RepairReportComponent } from './repair-report.component';
import { RepairHistoryComponent } from './repair-history/repair-history.component';
export const repairreportRouter = [
    {
        path: '',
        component: RepairReportComponent,
        children: [
            {
                path: 'repairhistory',//维修历史
                component: RepairHistoryComponent
            }
        ]
    }
]
export const repairReportCom=[RepairReportComponent,RepairHistoryComponent]