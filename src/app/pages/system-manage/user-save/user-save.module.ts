// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// This Module's Components
import { UserSaveComponent } from './user-save.component';
import { userSaveRouter, userSaveCom } from './usersave.router';
import { ModalModule, PaginationModule, BsDropdownModule } from 'ngx-bootstrap';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
    imports: [
        RouterModule.forChild(userSaveRouter),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        BsDropdownModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TreeviewModule.forRoot()
    ],
    declarations: [
        userSaveCom,
    ],
    exports: [
        UserSaveComponent,
    ]
})
export class UserSaveModule {

}
