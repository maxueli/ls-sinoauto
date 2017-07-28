import { Component, ViewChild } from '@angular/core';
import { simAnim, fadeIn, flyIn } from '../../../app.animation';
import { storeMangeModal, editstockParams, depotParams, cartypeParmas, partsParams, stockParmas, EnableParams } from './stockManageModal';
import { storeManageService } from './stockManageService';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
    moduleId: module.id,
    selector: 'stock-manage',
    templateUrl: 'stock-manage.component.html',
    styleUrls: ['stock-manage.component.scss'],
    animations: [flyIn]
})
export class StockManageComponent {
    @ViewChild('addhint') public addhint: ModalDirective;
    @ViewChild('addstore') public addstore: ModalDirective;
    @ViewChild('lgModal') public lgModal: ModalDirective;
    @ViewChild('editmodal') public editmodal: ModalDirective;
    public totalItems = [0, 0, 0, 0];
    public TotalCount: number;
    public index: number = 1;
    public maxPageSize: number = 1;
    public choosePage: number;
    public searchLoad: boolean = true;
    public tableLoad: boolean = true;
    public storeParmas: storeMangeModal = new storeMangeModal();
    public searcstoreParams: storeMangeModal = new storeMangeModal();
    public editstockid: editstockParams = new editstockParams();
    public depotParams: depotParams = new depotParams();
    public cartypeParmas: cartypeParmas = new cartypeParmas();
    public partsParams: partsParams = new partsParams();
    public editParams: partsParams = new partsParams();
    public stockParmas: stockParmas = new stockParmas();
    public tijiaoParmas: stockParmas = new stockParmas();//提交新增配件
    public EnableParams: EnableParams = new EnableParams();
    public storelist: Array<any>;
    public depotlist: Array<any>;
    public cartypelist: Array<cartypeParmas>;
    public partslist: Array<cartypeParmas>;
    public partstypelist: Array<any>;
    public partsbrandslist: Array<any>;
    public depotPoslist: Array<any>;
    public cardeskey = [];
    public cardesvalue = [];
    public arr = [];
    public flag: string;

    public isShow: boolean = false;
    public nameisShow: boolean = false;
    public TypeisShow: boolean = false;
    public brandNameinshow: boolean = false;
    public PosNameisShow: boolean = false;
    public carModelisShow: boolean = false;
    public disabled: boolean = true;
    constructor(
        public storeMangeService: storeManageService,
    ) { }
    ngOnInit() {
        this.storelistinfo();
        this.depot();
        this.cartype();
        this.partsinfo();
        this.partstypes();
        this.partsbrands();

    }
    //获取库存管理列表
    public storelistinfo() {
        // console.log(this.storeParmas);
        this.storelist = null;
        this.storeMangeService.getlist(this.storeParmas).then(res => {
            console.log(res);
            this.TotalCount = 0;
            if (res.result.length > 0) {
                this.TotalCount = res.totalCount;
                this.storelist = res.result;
                this.maxPageSize = Math.ceil(res.totalCount / this.storeParmas.pageSize);
                this.partsParams.maxStock = res.result.maxStock;//最大库存
                this.partsParams.minStock = res.result.minStock;//最小库存
                this.tijiaoParmas.minStock = res.result.remark;//备注
            }
        }).catch(res => {
            console.log(res);
        });
    }
    // 编辑详情
    public editstock(contentid) {
        this.editstockid.stockId = contentid;
        this.storelist = null;
        this.storeMangeService.postlist(this.editstockid).then(res => {
            console.log(res);
            this.editParams.depotName = res.result.depotName;//配件仓库
            this.editParams.partsCode = res.result.parts.partsCode;//配件编码
            this.editParams.partsTypeName = res.result.parts.partsTypeName;//配件分类
            this.editParams.partsName = res.result.parts.partsName;//配件名称
            this.editParams.partsBrandName = res.result.parts.brandName;//品牌
            this.editParams.partsSpec = res.result.parts.partsSpec;//规格型号
            this.editParams.partsUnit = res.result.parts.partsUnit;//单位
            this.editParams.depotPosName = res.result.depotPosName;//库位
            this.editParams.maxStock = res.result.maxStock;//最大库存
            this.editParams.minStock = res.result.minStock;//最小库存
            this.editParams.originPlace = res.result.parts.originPlace;//来源地
            this.editParams.packSpec = res.result.parts.packSpec;//包装规格
            this.editParams.remark = res.result.remark;//备注
            this.editParams.stockId = res.result.stockId;
            // this.editParams.depotId = res.result.depotId;
            // this.editParams.depotPosId = res.result.depotPosId;
            // this.editParams.partsId = res.result.parts.partsId;
            // this.editParams.partsTypeId = res.result.parts.partsTypeId;
            // this.editParams.brandId = res.result.parts.partsBrandId;
            this.storelistinfo();
        }).catch(Error => {
            console.log(Error);
        })

    }
    //获取仓库
    public depot() {
        this.depotlist = null;
        this.storeMangeService.postdepot(this.depotParams).then(res => {
            console.log('仓库', res);
            this.depotlist = res.result;
            this.storeParmas.depotId = res.result.depotId;

        }).catch(Error => {
            console.log(Error);
        });
    }
    //获取仓位信息
    public depotPosName() {
        console.log(this.stockParmas)
        this.storeMangeService.depotPosName(this.stockParmas).then(res => {
            this.depotPoslist = res.result;
            this.searcstoreParams.depotId = res.result.depotId;
            console.log(res);

        }).catch(Error => {
            console.log(Error);
        });
    }
    public changerdepot(id) {
        this.stockParmas.depotId = id;
        this.tijiaoParmas.depotId = id
        this.editParams.depotId = id
        this.depotPosName();
    }

    //库存管理查询
    private storeserach() {

        this.storelistinfo();
        console.log(this.storeParmas);
    }



    public items: string[] = ['The first choice!',
        'And another choice for you.', 'but wait! A third!'];
    public onHidden(): void {
        console.log('Dropdown is hidden');
    }
    public onShown(): void {
        console.log('Dropdown is shown');
    }
    public isOpenChange(): void {
        console.log('Dropdown state is changed');
    }
    //获取配件编码焦点执行
    public getflowinfo() {
        this.isShow = true;
    }
    //获取配件名称焦点执行
    public partsNameinfo() {
        this.nameisShow = true;
    }
    //分类
    public TypeName() {
        this.TypeisShow = true;
    }
    //品牌
    public brandName() {
        this.brandNameinshow = true;
    }
    //库位
    public PosName() {
        this.PosNameisShow = true;
    }
    //适用车型
    public carModel() {
        this.carModelisShow = true;
    }
    //适用车型信息添加
    public addcartype(e, item) {
        var t = e.target, c = t.checked;
        if (c) {
            this.cardeskey.push(item.key);
            this.cardesvalue.push(item.value);
        } else {
            //需要传给后台的key
            for (var i = 0; i < this.cardeskey.length; i++) {
                if (this.cardeskey[i] == item.key) {
                    this.cardeskey.splice(i, 1);
                }
            }
            console.log(this.cardeskey);
            //需要显示的value
            for (var i = 0; i < this.cardesvalue.length; i++) {
                if (this.cardesvalue[i] == item.value) {
                    this.cardesvalue.splice(i, 1);
                }
            }
        }
        console.log(this.cardesvalue);

    }

    public stockitem(sign, content) {
        //适用车型item
        if (sign == 2) {
            this.tijiaoParmas.partsId = content.partsId;
            this.editParams.partsId = content.partsId;
            this.partsParams = content;
            this.partsParams.partsBrandName = content.brandName;//品牌

            console.log(content);

        } else if (sign == 3) {
            this.partsParams.partsBrandName = content.partsBrandName;
            this.tijiaoParmas.brandId = content.partsBrandId;
            this.editParams.brandId = content.partsBrandId;
            this.partsParams.partsBrandName = content.partsBrandName;
            this.editParams.partsBrandName = content.partsBrandName;

            console.log(this.partsParams.partsBrandName);
            console.log(content);
        } else if (sign == 4) {
            this.partsParams.partsTypeName = content.partsTypeName;
            this.editParams.partsTypeName = content.partsTypeName;
            this.tijiaoParmas.partsTypeId = content.partsTypeId;
            this.editParams.partsTypeId = content.partsTypeId;
            console.log(content);
        } else if (sign == 5) {
            this.partsParams.depotPosName = content.depotPosName;
            this.editParams.depotPosName = content.depotPosName;
            console.log(content);
            this.tijiaoParmas.depotPosId = content.depotPosId;

        }
    }
    public cardesclose() {
        this.cardesvalue.pop();

    }
    //失去焦点执行
    public blurflowinfo() {
        setTimeout(() => {
            this.isShow = false;
            this.nameisShow = false;
            this.TypeisShow = false;
            this.brandNameinshow = false;
            this.PosNameisShow = false;
        }, 200);
    }
    public RClose() {
        this.carModelisShow = false;
    }
    //获取车型适用信息
    public cartype() {
        this.cartypelist = null;
        this.storeMangeService.cartype(this.cartypeParmas).then(res => {
            //console.log(res);
            if (res.result.length > 0) {
                this.totalItems[0] = res.totalCount;
                this.cartypelist = res.result;

            }
        }).catch(Error => {
            console.log(Error);
        })
    }
    //获取配件信息
    public partsinfo() {
        this.partslist = null;
        this.storeMangeService.partsinfo(this.partsParams).then(res => {
            console.log(res);
            if (res.result.length > 0) {
                this.totalItems[3] = res.totalCount;
                this.partslist = res.result;
                this.partsParams.partsId = res.result[0].partsId;
            }

        }).catch(Error => {
            console.log(Error)
        });
    }
    // 获取配件分类
    public partstypes() {
        this.partstypelist = null;
        this.storeMangeService.partstype(this.partsParams).then(res => {
            console.log(res);
            if (res.result.length > 0) {
                this.totalItems[1] = res.totalCount;
                this.partstypelist = res.result;
            }

        }).catch(Error => {
            console.log(Error)
        });
    }
    // 获取品牌
    public partsbrands() {
        this.partsbrandslist = null;
        this.storeMangeService.partsbrands(this.partsParams).then(res => {
            console.log(res);
            if (res.result.length > 0) {
                this.totalItems[2] = res.totalCount;
                this.partsbrandslist = res.result;
            }

        }).catch(Error => {
            console.log(Error)
        });
    }
    //库存新增提交
    public stocksubmit() {
        this.tijiaoParmas.carModelIds = this.cardeskey;
        this.tijiaoParmas.maxStock = this.partsParams.maxStock;
        this.tijiaoParmas.minStock = this.partsParams.minStock;
        this.tijiaoParmas.partsCode = this.partsParams.partsCode;
        this.tijiaoParmas.partsUnit = this.partsParams.partsUnit;
        this.tijiaoParmas.partsName = this.partsParams.partsName;
        this.tijiaoParmas.originPlace = this.partsParams.originPlace;
        this.tijiaoParmas.partsSpec = this.partsParams.partsSpec;
        this.tijiaoParmas.depotPosName = this.partsParams.depotPosName;
        this.tijiaoParmas.partsBrandName = this.partsParams.partsBrandName
        console.log(this.tijiaoParmas);
        this.storeMangeService.addstock(this.tijiaoParmas).then(res => {
            console.log(res);
            this.addstore.hide();
            this.addhint.show();
            this.storelistinfo();
        }).catch(Error => {
            console.log(Error);
        })
    }
    //库存编辑提交
    public stockedit() {
        console.log(this.editParams);
        this.storeMangeService.stockedit(this.editParams).then(res => {
            console.log(res);
            this.lgModal.hide();
            this.storelistinfo();
            this.editmodal.show();
        }).catch(Error => {
            console.log(Error);
        })
    }
    //库存管理分页
    private pageChanged(event, nodeName?) {
        if (nodeName == 'SELECT') {
            this.index = 1;
            this.choosePage = null;
            this.storeParmas.setPage(this.index, Number(event.target.value));
        } else {
            if (nodeName == 'BUTTON') {
                this.index = this.choosePage;
            } else {
                if (this.index == event.page) return;
                this.index = event.page;
                this.choosePage = null;
            }
            this.storeParmas.setPage(this.index);
        }
        this.storelistinfo();
    }

    //适用车辆分页
    private paging(event, temp) {
        if (temp == 'carModel') {
            this.cartypeParmas.setPage(event.page);
            this.cartype();
        } else if (temp == 'partsTypeName') {
            this.partsParams.setPage(event.page);
            this.partstypes();
        } else if (temp == 'partsBrand') {
            this.partsParams.setPage(event.page);
            this.partsbrands();
        } else if (temp == 'partsinfo') {
            this.partsParams.setPage(event.page);
            this.partsinfo();
        }
    }
    // 判断全选与全不选
    public ischeckAll() {
        if ($('input[name="allselect"]').is(":checked")) {
            $('input[name="radios"]').prop('checked', true);
            this.disabled = false;
        } else {
            $('input[name="radios"]:checked').prop('checked', false);
            this.disabled = true;
        }
    }
      //单选按钮
    public selelctradio() {
        if ($('input[name="radios"]').is(":checked")) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
    }
    // 单选、多选判断按钮状态并取值
    public isRadio(e, item) {
        var t = e.target, c = t.checked;
        if (c) {
            this.arr.push(item.stockId);
        } else {
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] == item.stockId) {
                    console.log(this.arr[i]);
                    console.log(item.stockId);
                    this.arr.splice(i, 1);
                }
            }
        }
        console.log(this.arr);
    }


    //是否启用
    public Enable() {
        console.log(this.arr);
        this.storeMangeService.stockstatus(this.arr).then(res => {
            console.log(res);
            this.storelistinfo();
            this.disabled = true;
        }).catch(Error => {
            console.log(Error)
        })
    }

}
