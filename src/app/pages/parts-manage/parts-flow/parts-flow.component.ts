import { Component } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { partsflowModal, flowtemParams } from './partsflowModal';
import { partsflowSercice } from './partsflowSercice'

@Component({
    moduleId: module.id,
    selector: 'parts-flow',
    templateUrl: 'parts-flow.component.html',
    styleUrls: ['parts-flow.component.scss'],
    animations: [flyIn]
})
export class PartsFlowComponent {
    public partsflowParams: partsflowModal = new partsflowModal();
    public flowtemParams: flowtemParams = new flowtemParams();
    public isShow: boolean = false;
    public contntisShow: boolean = false;
    public nameisShow: boolean = false;
    public istableshow1: boolean = true;
    public istableshow2: boolean = false;
    public istableshow3: boolean = false;
    public istableshow4: boolean = false;
    public flowlist: Array<any>;
    public flowlists: Array<any>;
    public alldateinfo: Array<any>;
    public totalItems: number;
    public pagetotal: number;
    public total = [0, 0];
    public pagetotals = [0, 0, 0];
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public searchLoad: boolean = true;
    public tableLoad: boolean = true;
    public listlength: number;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    constructor(
        public flowService: partsflowSercice
    ) { }
    ngOnInit() {
        this.flowinfo()
    }
    //获取下拉数据信息
    private flowinfo() {
        this.flowService.postlist(this.partsflowParams).then(res => {
            console.log(res);
            this.totalItems = 0;
            if (res.result.length > 0) {
                this.totalItems = res.totalCount;
                this.total[0] = res.totalCount;
                this.total[1] = res.totalCount;
                this.flowlist = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.flowtemParams.pageSize);
            }
        }).catch(Error => {
            console.log(Error);
        })
    }
    //获取配件编码焦点执行
    public getflowinfo() {
        this.isShow = true;

    }
    //获取配件名称焦点执行
    public partsNameinfo() {
        this.nameisShow = true;
    }
    //失去焦点执行
    public blurflowinfo() {
        setTimeout(() => {
            this.isShow = false;
            this.nameisShow = false;
        }, 500);
    }
    //item传过来的值
    public flowtem(content) {
        this.flowtemParams = content;
        //console.log(this.flowtemParams);
        this.flowtemParams.partsCode = content.parts.partsCode;
        this.flowtemParams.partsName = content.parts.partsName;
        this.flowtemParams.partsTypeName = content.parts.partsTypeName;//配件类型
        this.flowtemParams.brandName = content.parts.brandName;//品牌
        this.flowtemParams.partsSpec = content.parts.partsSpec;//规格型号
        this.flowtemParams.partsUnit = content.parts.partsUnit;//单位
        this.flowtemParams.inventory = content.parts.inventory;//库存量
        this.flowtemParams.createTime = content.createTime;//最新入库日期
        this.flowtemParams.dmlTime = content.dmlTime;//最新出库日期
        setTimeout(() => {
            this.contntisShow = true;
            this.nameisShow = false;
            this.isShow = false;
        }, 200);
        // console.log(this.flowtemParams);

    }
    public flowinfoid(partsId, stockId) {
        this.partsflowParams.partsId = partsId;
        this.partsflowParams.stockId = stockId;
        this.flowlists = null;
        // console.log(partsId,stockId);
        this.flowService.getlist(this.partsflowParams).then(res => {
            console.log(res);
            this.totalItems = 0;
            if (res.result.length > 0) {
                this.pagetotal = res.totalCount;
                this.flowlists = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.partsflowParams.pageSize);
            }
        }).catch(Error => {
            console.log(Error);
        })
    }
    //获取维修发料 配件销售 采购入库 内部领料 数据
    public faliao(number) {
        this.partsflowParams.type = number;
        this.flowService.getlist(this.partsflowParams).then(res => {
            console.log(res);
            this.totalItems = 0;
            if (res.result.length > 0) {
                this.alldateinfo = res.result;
                this.totalItems = res.totalCount
                this.pagetotals[1] = res.totalCount;
                this.pagetotals[2] = res.totalCount;
                this.pagetotals[3] = res.totalCount;
                this.pagetotals[4] = res.totalCount;
                this.maxPageSize = Math.ceil(res.totalCount / this.partsflowParams.pageSize);
            }

        }).catch(Error => {
            console.log(Error);
        })
    }
    //查询明细
    public Detailed() {
        this.flowService.getlist(this.partsflowParams).then(res => {
            console.log(res);
            this.totalItems = 0;
            this.alldateinfo = res.result;

        }).catch(Error => {
            console.log(Error);
        })
    }
    //y显示or隐藏
    public isshow1() {
        this.istableshow1 = true;
        this.istableshow2 = false;
        this.istableshow3 = false;
        this.istableshow4 = false;
    }
    public isshow2() {
        this.istableshow1 = false;
        this.istableshow2 = true;
        this.istableshow3 = false;
        this.istableshow4 = false;
    }
    public isshow3() {
        this.istableshow1 = false;
        this.istableshow2 = false;
        this.istableshow3 = true;
        this.istableshow4 = false;
    }
    public isshow4() {
        this.istableshow1 = false;
        this.istableshow2 = false;
        this.istableshow3 = false;
        this.istableshow4 = true;
    }
    // // 配件流水账分页
    // private pageChanged(event, nodeName?) {
    //     if (nodeName == 'SELECT') {
    //         this.index = 1;
    //         this.choosePage = null;
    //         this.partsflowParams.setPage(this.index, Number(event.target.value));
    //     } else {
    //         if (nodeName == 'BUTTON') {
    //             this.index = this.choosePage;
    //         } else {
    //             if (this.index == event.page) return;
    //             this.index = event.page;
    //             this.choosePage = null;
    //         }
    //         this.partsflowParams.setPage(this.index);
    //     }
    //     // start;
    //     this.flowService.getlist(this.partsflowParams).then(res => {
    //         console.log(res);
    //         this.totalItems = 0;
    //         if (res.result.length > 0) {
    //             this.alldateinfo = res.result;
    //            this.pagetotal[0] = res.totalCount;
    //            this.pagetotal[1] = res.totalCount;
    //             this.maxPageSize = Math.ceil(res.totalCount / this.partsflowParams.pageSize);
    //         }

    //     }).catch(Error => {
    //         console.log(Error);
    //     })
    //     //end
    // }


    // 配件流水账分页
    private pagination(event) {
        this.flowService.getlist(this.partsflowParams).then(res => {

            this.totalItems = 0;
            if (res.result.length > 0) {
                this.flowlists = res.result;
            }
        }).catch(Error => {
            console.log(Error);
        })
        this.partsflowParams.setPage(event.page);
    }
    private pageing(event, falg) {

        if (falg = 'lingliao') {
            this.flowService.getlist(this.partsflowParams).then(res => {
                console.log(res);
                if (res.result.length > 0) {
                    this.alldateinfo = res.result;
                }

            }).catch(Error => {
                console.log(Error);
            })

        } else if (falg = 'kucun') {
            this.flowService.getlist(this.partsflowParams).then(res => {
            }).catch(Error => {
                console.log(Error);
            })
        } else if (falg = "xiaos") {
            this.flowService.getlist(this.partsflowParams).then(res => {
                console.log(res);
            }).catch(Error => {
                console.log(Error);
            })

        } else if (falg = "weixiu") {
            this.flowService.getlist(this.partsflowParams).then(res => {
                console.log(res);
                if (res.result.length > 0) {
                    this.alldateinfo = res.result;
                }
            }).catch(Error => {
                console.log(Error);
            })
        }
        this.partsflowParams.setPage(event.page);

    }





    //配件分类下拉分页条
    private page(event, sign) {
        if (sign = "partsCode") {
            this.partsflowParams.setPage(event.page);
            this.flowinfo();
        } else if (sign = 'partsName') {
            this.partsflowParams.setPage(event.page);
            this.flowinfo();
        }
    }
    // 时间校验
    private timeChange() {
        if (this.partsflowParams.beginTime && this.partsflowParams.endTime) {
            this.partsflowParams.beginTime <= this.partsflowParams.endTime ? this.timeError = false : this.timeError = true;
            // console.log(this.searchParam.beginTime <= this.searchParam.endTime)
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }
}
