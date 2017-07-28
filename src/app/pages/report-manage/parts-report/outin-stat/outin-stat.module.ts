// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// This Module's Components
import { OutinStatComponent } from './outin-stat.component';
import { RouterModule } from '@angular/router';
import { outinStatRouter, outinStatCom } from './outinstat.router';
import { ModalModule, PaginationModule, CollapseModule, TabsModule } from 'ngx-bootstrap';
import { PurchasinStatService } from './purchasin-stat/purchasin-stat.service';
import { MaintenanceMaterialStatService } from './maintenance-material-stat/maintenance-material-stat.service';
import { partssellService } from './parts-sell-stat/partsSellService';
import { BaTableComponent } from '../../../../theme/ba-table/ba-table.component';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';
import { intePickingService } from './inter-picking/intePickingService'

NguiDatetime.locale =
    {
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
        RouterModule.forChild(outinStatRouter),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        CollapseModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NguiDatetimePickerModule
    ],
    declarations: [
        outinStatCom,
        BaTableComponent

    ],
    exports: [
        OutinStatComponent,

    ],
    providers: [PurchasinStatService, MaintenanceMaterialStatService, partssellService, intePickingService]
})
export class OutinStatModule {

}
