// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CustomerManageComponent } from './customer-manage.component';
import { RouterModule } from '@angular/router';
import { customermanageRouter, customerManageCom } from './customermanage.router';
import { TabsModule, ModalModule, PaginationModule, CollapseModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker'
import { CustomerInfoService } from './customer-info/customer-info.service';

@NgModule({
    imports: [
        RouterModule.forChild(customermanageRouter),
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        CollapseModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NguiDatetimePickerModule
    ],
    declarations: [
        customerManageCom
    ],
    exports: [
        CustomerManageComponent,
    ],
    providers: [
        CustomerInfoService
    ]
})
export class CustomerManageModule { }
