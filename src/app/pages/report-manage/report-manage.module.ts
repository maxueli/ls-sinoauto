// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ReportManageComponent } from './report-manage.component';
import { RouterModule } from '@angular/router';
import { reportManageRouter } from './reportmanage.router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        RouterModule.forChild(reportManageRouter),
        CommonModule,
        FormsModule
    ],
    declarations: [
        ReportManageComponent,
    ],
    exports: [
        ReportManageComponent,
    ]
})
export class ReportManageModule {

}
