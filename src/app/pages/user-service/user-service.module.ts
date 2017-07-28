// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { UserServiceComponent } from './user-service.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceRouter, UserServiceCom } from './userservice.router';
import { TabsModule, ModalModule, PaginationModule, CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';
import { CreatGdService } from './creat-gd/creat-gd.service';
import { gdSelectService } from './gd-select/gd-select.service';
import { MaintenanceSettlementService } from './maintenance-settlement/maintenance-settlement.service';
import { MaintenanceIncrementService } from './maintenance-increment/maintenance-increment.service';
import { MaintenanceWorkereService } from './maintenance-work/maintenance-work.service';

NguiDatetime.locale = {
    currentTime: "当前时间",
    date: "日期",
    day: "日",
    hour: "小时",
    minute: "分钟",
    month: "月",
    time: "时间",
    year: "年"
}

const SERVICES = [
    CreatGdService,
    gdSelectService,
    MaintenanceSettlementService,
    MaintenanceIncrementService,
    MaintenanceWorkereService
];

@NgModule({
    imports: [
        RouterModule.forChild(UserServiceRouter),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        NguiDatetimePickerModule

    ],
    declarations: [
        UserServiceCom
    ],
    exports: [
        UserServiceComponent,
    ],
    providers: [SERVICES]
})
export class UserServiceModule {

}
