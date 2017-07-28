// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { RepairReportComponent } from './repair-report.component';
import { RouterModule } from '@angular/router';
import { repairreportRouter, repairReportCom } from './repairreport.router';
import { ModalModule,PaginationModule } from 'ngx-bootstrap';
import { historyService} from './repair-history/historyService'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiDatetimePickerModule ,NguiDatetime} from '@ngui/datetime-picker'


@NgModule({
    imports: [
        RouterModule.forChild(repairreportRouter),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        CommonModule,
        FormsModule,
        NguiDatetimePickerModule
    ],
    declarations: [
        repairReportCom,
    ],
    exports: [
        RepairReportComponent,
    ],
    providers:[historyService]
})
export class RepairReportModule {

}
