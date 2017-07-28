// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { UserRouter } from './user.router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginService } from './loginUserService';
import { ModalModule } from 'ngx-bootstrap';
import { BaModalComponent } from '../theme/ba-modal/ba-modal.component';
@NgModule({
    imports: [
        RouterModule.forChild(UserRouter),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ModalModule.forRoot()
    ],
    declarations: [
        LoginComponent,
        UserloginComponent,
        BaModalComponent
        
    ],
    exports: [
        BaModalComponent,

    ],
    providers:[UserLoginService]
})
export class LoginModule {

}
