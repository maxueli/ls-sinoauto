import { Component, OnInit } from '@angular/core';
// import { EchartOption } from 'echarts-ng2';
import { EChartOption } from 'echarts-ng2'
@Component({
    moduleId: module.id,
    selector: 'purchasingmanage',
    templateUrl: 'purchasingmanage.component.html',
    styleUrls: ['purchasingmanage.component.scss']
})
export class PurchasingmanageComponent implements OnInit {
    // 定义实体
    // public option: EChartOption;

    constructor() {

    }
    ngOnInit() {
        this.initEcharts();
    }
    //初始化图表
    public initEcharts() {
        // this.option = {
        //     title: { text: '我是ng2第一个图表' },
        //     tooltip: { trigger: 'axis' },
        //     legend: {
        //         data: ['销售']
        //     },
        //     xAxis: {
        //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '袜子']
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销售',
        //         type: 'bar',
        //         data: [3, 4, 50, 34, 54]
        //     }]
        // }
    }

}
