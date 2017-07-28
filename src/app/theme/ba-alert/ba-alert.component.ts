import { Component, OnInit, ElementRef, EventEmitter, Input } from '@angular/core';
import { AlertService } from '../../privaders/alertService';

@Component({
    moduleId: module.id,
    selector: 'ba-alert',
    templateUrl: 'ba-alert.component.html',
    styleUrls: ['ba-alert.component.scss']
})
export class BaAlertComponent implements OnInit {
    private _alert: AlertService;
    constructor(
        public el: ElementRef
    ) {
    }
    ngOnInit() {
        this._alert.onShow.subscribe(() => this.el.nativeElement.scrollIntoView(false));
    }
    @Input('service')
    public closeAlert(i: number): void {
        var current = this._alert.alerts[i];
        console.log("111111");
        console.log(this._alert.alerts);
        let event = current['onClose'] as EventEmitter<void>;
        if (event !== null) {
            event.emit();
        }
        this._alert.alerts.splice(i, 1);
    }
}
