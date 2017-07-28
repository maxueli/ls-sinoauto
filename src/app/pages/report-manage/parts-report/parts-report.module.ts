// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { PartsReportComponent } from './parts-report.component';
import { RouterModule } from '@angular/router';
import { partsreportRouter } from './partsreport.router';
import { NguiDatetimePickerModule ,NguiDatetime} from '@ngui/datetime-picker'
import { FormsModule } from '@angular/forms';

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
        RouterModule.forChild(partsreportRouter),
        NguiDatetimePickerModule,
        FormsModule
    ],
    declarations: [
        PartsReportComponent,
    ],
    exports: [
        PartsReportComponent,
    ]
})
export class PartsReportModule {

}
