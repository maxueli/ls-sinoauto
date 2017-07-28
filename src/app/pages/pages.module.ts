// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EchartsNg2Module } from 'echarts-ng2';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';

// This Module's Components
import { PagesComponent } from './pages.component';
import { pageRoute } from './pages.router';
import { PurchasingmanageComponent } from './purchasingmanage/purchasingmanage.component';

@NgModule({
    imports: [
        RouterModule.forChild(pageRoute),
        EchartsNg2Module,//图标
        CommonModule,
        BsDropdownModule.forRoot()
    ],
    declarations: [
        PagesComponent,
        PurchasingmanageComponent
    ],
    exports: [
        PagesComponent,
    ]
})
export class PagesModule {

}
