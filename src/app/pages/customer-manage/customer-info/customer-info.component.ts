import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { simAnim, fadeIn, flyIn } from '../../../app.animation'
import { Customer, CustomerSearch } from '../customer-manage.model';
import { CustomerInfoService } from './customer-info.service';

@Component({
    moduleId: module.id,
    selector: 'customer-info',
    templateUrl: 'customer-info.component.html',
    styleUrls: ['customer-info.component.scss'],
    animations: [simAnim, fadeIn, flyIn]
})
export class CustomerInfoComponent implements OnInit {
    @ViewChild('viewDetail') public viewDetail: ModalDirective;
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public searchLoad: boolean = true;
    public tableLoad: boolean = true;
    public customer: Array<Customer>;
    public userDetail = { 'info': {}, 'cars': [] };
    public areaName = [];
    public searchParams: CustomerSearch = new CustomerSearch();
    public timeError: boolean = false;
    public maxDate = new Date();

    constructor(
        public _route: Router,
        public _service: CustomerInfoService
    ) { }

    ngOnInit() {
        this.loadCustomer();
    }

    // 加载客户信息
    private loadCustomer() {
        console.log(this.searchParams);
        this._service.getCustomer(this.searchParams).then(res => {
            console.log('客户信息   ', res);
            this.totalItems = 0;
            this.customer = null;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.customer = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.searchParams.pageSize);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    // 分页条选择
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.searchParams.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.searchParams.setPage(this.index);
        }
        this.loadCustomer();
    }
    // 取消条件查询
    private cancelLoadCustomer() {
        this.searchParams = new CustomerSearch();
        this.timeError = false;
        this.loadCustomer();
    }
    // 查询条件-建档日期校验
    private timeValueChanged(temp) {
        if (this.searchParams.beginTime && this.searchParams.endTime) {
            this.searchParams.beginTime < this.searchParams.endTime ? this.timeError = false : this.timeError = true;
        }
    }
    // 客户信息导出
    private customerExport() {
        this._service.exportExcel('customer').then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    // 根据客户Id查询客户信息
    private customerDetail(customerId) {
        console.log(customerId);
        this.tableLoad = false;
        this._service.getCustomerDetail(customerId).then(res => {
            console.log(res);
            this.viewDetail.show();
            this.tableLoad = true;
            if (res.errmsg == "success") {
                this.userDetail.info = res.result.customerInfoDto;
                this.userDetail.cars = res.result.customerCars;
                res.result.customerInfoDto.areaName && (this.areaName = res.result.customerInfoDto.areaName.split('-'));
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // 进入客户信息编辑页
    private localpage(code, customerId) {
        this._route.navigate(['/pages/customerManage/customeradd', { 'code': code, 'customerId': customerId }]);
    }
}
