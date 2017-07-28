import { ManageAnlysisComponent } from './manage-anlysis.component';
import { OutputSummaryComponent } from './output-summary/output-summary.component';
export const manageanlysisRouter = [
    {
        path: '',
        component: ManageAnlysisComponent,
        children: [
            {
                path: 'outputsummary',
                component: OutputSummaryComponent
            }
        ]
    }
]
export const manageAnlysisCom = [ManageAnlysisComponent, OutputSummaryComponent]