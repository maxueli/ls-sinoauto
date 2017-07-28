import { partsoutRouter, partsOutCom } from './partsout.router';

// Angular Imports
// import { CommonModule } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { PartsOutComponent } from './parts-out.component'
import { partsOutService } from './parts-out.service'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(partsoutRouter),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    partsOutCom,

  ],
  exports: [
    PartsOutComponent,
  ],
  providers: [
    partsOutService
  ]
})
export class PartsOutModule {

}
