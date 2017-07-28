import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'invoicing-detail',
    templateUrl: 'invoicing-detail.component.html',
    styleUrls: ['./invoicing-detail.component.scss']
})

export class InvoicingDetailComponent implements OnInit {
    constructor(
        public _route: Router
    ) { }

    ngOnInit() { }

    private localPage() {
        this._route.navigate(['/pages/reportManage/partsreport/outinstat/invoicingsummary']);
    }

}