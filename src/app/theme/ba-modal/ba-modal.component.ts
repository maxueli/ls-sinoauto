import { Component, ViewChild, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
    moduleId: module.id,
    selector: 'ba-modal',
    templateUrl: 'ba-modal.component.html',
    styleUrls: ['ba-modal.component.scss']
})
export class BaModalComponent {
    @ViewChild('TipsModal') public TipsModal:ModalDirective
    @Input() modal:any;//接受上个组件传递的值
    @Output() OverModal:EventEmitter<any>=new EventEmitter<any>();
    constructor(){
        console.log(this.modal);
    }

    ngAfterViewChecked(){
        this.choseModal();
    }
    public choseModal(){
        let type=this.modal.type;
        if(type==0){
            console.log(this.modal);
            console.log("1122");
            //这是一个alert 单个确认按钮tipsModal
            this.TipsModal.show();
        }
    }
    public tipsClose(){
        this.TipsModal.hide();
        //关闭之后告诉组件我已经接受了到 了你这个值 
        this.modal.type=-1;
        this.OverModal.emit(this.modal);
    }
}
