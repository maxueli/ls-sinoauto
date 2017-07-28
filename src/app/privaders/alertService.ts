import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class AlertService {
    public alerts: Array<Object> = [];
    public onShow = new EventEmitter();
    private show(msg: string, type?: AlertType, dismissble?: boolean, dismissOnTimeout?: number):CloseableAlert {
        var alertType = type || AlertType.Info;
        var model = {
            msg: msg,
            type: AlertType[alertType].toLowerCase(),
            dismissble: dismissble === false ? null : dismissble,
            dismissOnTimeout: dismissOnTimeout === 0 ? null : (dismissOnTimeout || 3000)
        }
        console.log(model);
        this.alerts.push(model);
        this.onShow.emit();
        return new CloseableAlert(model);
    }
    public warn(msg: string, dismissible?: boolean, dismissOnTimeout?: number): CloseableAlert {
        console.log('zq');
        return this.show(msg, AlertType.Warning, dismissible, dismissOnTimeout);
    }

    public info(msg: string, dismissible?: boolean, dismissOnTimeout?: number): CloseableAlert {
        return this.show(msg, AlertType.Info, dismissible, dismissOnTimeout);
    }

    public success(msg: string, dismissible?: boolean, dismissOnTimeout?: number): CloseableAlert {
        console.log('aaaaa')
        console.log(msg);
        return this.show(msg, AlertType.Success, dismissible, dismissOnTimeout);
    }

    public error(msg: string, dismissible?: boolean, dismissOnTimeout?: number): CloseableAlert {
        return this.show(msg, AlertType.Danger, dismissible, dismissOnTimeout);
    }

    public clear(): AlertService {
        this.alerts = [];
        return this;
    }
}
export enum AlertType {
    Info = 0,
    Success = 1,
    Warning = 2,
    Danger = 3
}
export class CloseableAlert {
    constructor(public model: any) { }
    public onClose(generatorOrNext?: any, error?: any, complete?: any) {
        let event = new EventEmitter<void>();
        event.subscribe(generatorOrNext, error, complete);
        this.model.onClose = event;
    }
}