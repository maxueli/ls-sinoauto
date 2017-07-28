// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { PartsManageComponent } from './parts-manage.component';
import { RouterModule } from '@angular/router';
import { partsmanageRouter, partsManageCom } from './partsmanage.router';
import { ModalModule,PaginationModule } from 'ngx-bootstrap';
import { TabsModule,BsDropdownModule } from 'ngx-bootstrap';
import { SupplierManageService } from './supplier-manage/supolierService';
import { partsPriceService } from './parts-price-inquiry/partsPriceService';
import { InventoryService } from './inventory-count/inventoryService'
import { storeManageService } from './stock-manage/stockManageService'
import { partsflowSercice } from './parts-flow/partsflowSercice'
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NguiDatetimePickerModule ,NguiDatetime} from '@ngui/datetime-picker'

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
        RouterModule.forChild(partsmanageRouter),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TabsModule.forRoot(),
        CommonModule,
        FormsModule,
        BsDropdownModule,
        NguiDatetimePickerModule,
        ReactiveFormsModule
    ],
    declarations: [
        partsManageCom,
    ],
    exports: [
        PartsManageComponent,
    ],
    providers:[SupplierManageService,partsPriceService,InventoryService,storeManageService,partsflowSercice]
})
export class PartsManageModule {

}
