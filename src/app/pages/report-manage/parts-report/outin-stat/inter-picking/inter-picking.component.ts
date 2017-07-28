import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../../../app.animation';
import { intePickingModal, interPickinginfo, interPickingdatwils, interPickingparts } from './intePickingModal';
import { intePickingService } from './intePickingService'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { helpers } from '../../../../../privaders/helper';
@Component({
    moduleId: module.id,
    selector: 'inter-picking',
    templateUrl: 'inter-picking.component.html',
    styleUrls: ['inter-picking.component.scss'],
    animations: [flyIn]
})

export class InterPickingComponent {
    @ViewChild('lgModal') public lgModal: ModalDirective;
    public interParams: intePickingModal = new intePickingModal();
    public interParamsId: interPickinginfo = new interPickinginfo();
    public interParamsdateils: interPickingdatwils = new interPickingdatwils();
    public interparts: interPickingparts = new interPickingparts();
    public totalItems: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public searchLoad: boolean = true;
    public tableLoad: boolean = true;
    public interLength: number;
    public Intelist: Array<any>;
    public Intedateils: Array<any>;
    public timeError: boolean = false;
    public notSubmit: boolean = false;
    public packUserId;
    public packOrgId;;
    constructor(
        public intePickingService: intePickingService,
        public _helpers: helpers,
    ) { }
    ngOnInit() {
        this.InterPicking();
        this.getpackUserId()
    }
    //获取内部领料统计列表
    private InterPicking() {
        this.Intelist = null;
        this.intePickingService.getinfo(this.interParams)
            .then(res => {
                console.log(res);
                this.totalItems = 0;
                if (res.result.length > 0) {
                    this.totalItems = res.totalCount;
                    this.Intelist = res.result;
                    this.maxPageSize = Math.ceil(res.totalCount / this.interParams.pageSize);
                }
            }).catch(Error => {
                console.log(Error)
            })
    }
    //获取内部领料详情列表
    private Interdetails(ipcode) {
        this.interParamsId.ipCode = ipcode;
        this.intePickingService.postdateilds(this.interParamsId).then(res => {
            console.log(res);
            this.interParamsdateils = res.result;
            this.interparts = res.result.parts;

            this.lgModal.show();
        }).catch(Error => {
            console.log(Error);
        });

    }

    //获取领料人id
    public packUserList = [];
    public getpackUserId() {
        this.intePickingService.findusersinorg().then((res) => {
            console.log(res);
            if (res.errcode == 0) {
                this.packUserList = res.result;
                this.interParams.packUserId = res.result[0].userId;
                this.getpackOrgId(this.interParams.packUserId);
            }
        }
        ).catch(
            (err) => {
                console.log(err);
            }
            );
    }
    //获取部门id
    public departList = [];
    public getpackOrgId(packUserId) {
        if (packUserId) {
            this.intePickingService.departments(packUserId).then((res) => {
                console.log(res);
                if (res.errcode == 0) {
                    this.departList = res.result;
                    this.interParams.packOrgId = res.result[0].depId;
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    //根据领料人ID 获取部门
    packUserIdchange(id, event) {
        this.getpackOrgId(id);
    }
    //内部领料查询
    private Intersearch() {
        this.InterPicking();
    }




    //内部领料分页
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.interParams.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.interParams.setPage(this.index);
        }
        this.InterPicking();
    }
    // 时间校验
    private timeChange() {
        if (this.interParams.beginTime && this.interParams.endTime) {
            this.interParams.beginTime <= this.interParams.endTime ? this.timeError = false : this.timeError = true;
            console.log(this.interParams.beginTime <= this.interParams.endTime)
        }
        this.notSubmit = false;
        if (this.timeError == true) {
            this.notSubmit = true;
        }
    }
    // 打印内部领料
    private orderPrint() {
        this._helpers.displaynone();
        window.print();
        this._helpers.displayblock()
    }

}
