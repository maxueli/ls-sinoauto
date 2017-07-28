import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';//引入的原因是如果服务器不再node服务器上
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { appMianRoute } from './app.router';
//开始注入服务
import { helpers } from './privaders/helper';
import { ApiService } from './privaders/apiService';
//指令注入
import { SearchSelectDirective } from './directive/selectbar';
import { AlertService } from './privaders/alertService';
import { AlertModule } from 'ngx-bootstrap';

//引入开始路由

@NgModule({
  declarations: [
    AppComponent,
    SearchSelectDirective,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appMianRoute),
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, helpers, ApiService,],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
