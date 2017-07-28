import { Component } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../app.animation';
import { outputSummaryService } from './outputSummaryService'
import { outputSummaryModal } from './outputSummaryModal';

@Component({
    moduleId: module.id,
    selector: 'output-summary',
    templateUrl: 'output-summary.component.html',
    styleUrls: ['output-summary.component.scss'],
    animations: [flyIn]
})
export class OutputSummaryComponent {
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public searchLoad: boolean = true;
    public tableLoad: boolean = true;
    public outputParams: outputSummaryModal = new outputSummaryModal();
    public outputlist: Array<any>;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    constructor(
        public outputSummaryService: outputSummaryService
    ) { }
    ngOnInit() {
        this.outputSummary();
    }
    //获取产值汇总列表
    private outputSummary() {
        this.outputlist = null;
        this.outputSummaryService.getlists(this.outputParams).then(res => {
            this.totalItems = 0;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;//缺少totalCount值
                this.outputlist = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.outputParams.pageSize);
            }
            console.log(res);
        }).catch(Error => {
            console.log(Error);
        });
    }

    public outputsubmit() {
        this.outputSummary();
    }
    // 产值汇总分页
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.outputParams.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.outputParams.setPage(this.index);
        }
        this.outputSummary();
    }
    // 时间校验
    private timeChange() {
        if (this.outputParams.beginTime && this.outputParams.endTime) {
            this.outputParams.beginTime <= this.outputParams.endTime ? this.timeError = false : this.timeError = true;
            // console.log(this.searchParam.beginTime <= this.searchParam.endTime)
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }
}
