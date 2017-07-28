// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ManageAnlysisComponent } from './manage-anlysis.component';
import { RouterModule } from '@angular/router';
import { manageanlysisRouter, manageAnlysisCom } from './manageanlysis.router';
import {PaginationModule } from 'ngx-bootstrap';
import { outputSummaryService } from './output-summary/outputSummaryService';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiDatetimePickerModule ,NguiDatetime} from '@ngui/datetime-picker'

@NgModule({
    imports: [
        PaginationModule.forRoot(),
        RouterModule.forChild(manageanlysisRouter),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NguiDatetimePickerModule
    ],
    declarations: [
        manageAnlysisCom,
    ],
    exports: [
        ManageAnlysisComponent,
    ],
    providers:[outputSummaryService]
})
export class ManageAnlysisModule {

}
