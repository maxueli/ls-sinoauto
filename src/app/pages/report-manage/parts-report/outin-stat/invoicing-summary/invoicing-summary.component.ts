import { Component } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { simAnim, fadeIn, flyIn } from '../../../../../app.animation';

@Component({
    moduleId: module.id,
    selector: 'invoicing-summary',
    templateUrl: 'invoicing-summary.component.html',
    styleUrls: ['invoicing-summary.component.scss'],
    animations:[flyIn]
})
export class InvoicingSummaryComponent {

    constructor(
        public _route: Router
    ) { }

    private localPage() {
        this._route.navigate(['/pages/reportManage/partsreport/outinstat/invoicingdetail']);
    }
}
