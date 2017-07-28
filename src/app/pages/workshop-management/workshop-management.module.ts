// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// This Module's Components
import { WorkshopManagementComponent } from './workshop-management.component';
import { RouterModule } from '@angular/router';
import { workshopRoute, workshopCompon } from './workshopmanagement.router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MaintenanceAcceptanceService } from './maintenance-acceptance/maintenance-acceptance.service';
import { MaintenanceWorkereService } from './maintenance-worker/maintenance-worker.service';

@NgModule({
    imports: [
        RouterModule.forChild(workshopRoute),
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        PopoverModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        workshopCompon,
    ],
    exports: [
        WorkshopManagementComponent,
    ],
    providers: [MaintenanceAcceptanceService, MaintenanceWorkereService]
})
export class WorkshopManagementModule {

}
