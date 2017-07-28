// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { PartsInComponent } from './parts-in.component';
import { RouterModule } from '@angular/router';
import { partsInRouter, partsInCom } from './partsin.router';

import {BsDropdownModule} from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { MaintenanceUnmaterialTable } from './maintenanceUnmaterial.table';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { maintenanceService } from './maintenance-unmaterial/maintenanceService';
import { interUnmaterialService } from './inter-unmaterial/interUnmaterialService';
import { PurchansService } from './purchans-in/purchansService';
import { sellInService } from './sell-in/sellinService';
import { PopoverModule } from 'ngx-bootstrap';
const PARTSINCOM=[
    MaintenanceUnmaterialTable
]
@NgModule({
    imports: [
        RouterModule.forChild(partsInRouter),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,PopoverModule.forRoot()
    ],
    declarations: [
        partsInCom,PARTSINCOM
    ],
    exports: [
        PartsInComponent,
    ],
    providers:[maintenanceService,interUnmaterialService,PurchansService,sellInService]
})
export class PartsInModule {

}
