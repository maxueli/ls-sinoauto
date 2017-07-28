// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// This Module's Components
import { FinanceManageComponent } from './finance-manage.component';
import { RouterModule } from '@angular/router';
import { financeManageRouter, FinanceManageCom } from './financemanage.router';
import { TabsModule, ModalModule, PaginationModule, CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { SellCashierService } from './sell-cashier/sell-cashier.service';
import { MaintenanceCashierService } from './maintenance-cashier/maintenance-cashier.service';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';

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

@NgModule({
    imports: [
        RouterModule.forChild(financeManageRouter),
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        CommonModule,
        FormsModule,
        NguiDatetimePickerModule
    ],
    declarations: [
        FinanceManageCom,
    ],
    exports: [
        FinanceManageComponent,
    ],
    providers: [SellCashierService, MaintenanceCashierService]
})
export class FinanceManageModule {

}
