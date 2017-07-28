import { toolsRouter, toolsCom } from './tools.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Imports
// import { CommonModule } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { ToolsComponent } from './tools.component';
import { WarehouseService } from './warehouse-definition/warehouse-definition.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(toolsRouter),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        toolsCom,
    ],
    exports: [
        ToolsComponent,
    ],
    providers: [WarehouseService]
})
export class ToolsModule {

}
