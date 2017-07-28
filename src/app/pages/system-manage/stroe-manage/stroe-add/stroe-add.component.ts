import { Component } from '@angular/core';
import { TreeModel, NodeEvent, RenamableNode, Ng2TreeSettings } from 'ng2-tree';
import { StroeManService } from '../stroeManageService';
import { smallSelectOption } from '../../../../privaders/common.modal';
import { addstroe } from '../stroeManModal';
@Component({
    moduleId: module.id,
    selector: 'stroe-add',
    templateUrl: 'stroe-add.component.html',
    styleUrls: ['stroe-add.component.scss']
})
export class StroeAddComponent {
    public myBaTree:Array<any>=new Array<any>();
    public localarea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public cityarea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public provincearea: Array<smallSelectOption> = new Array<smallSelectOption>();
    public addstroeparams:addstroe=new addstroe();
    constructor(
        private service: StroeManService
    ) { }
    ngOnInit(){
        this.initstroeTreelist();
        // this.addstroe();
        // this.getloadarea();
    }

    public getloadarea() {
        this.service.getlocalarea().then(res => {
            this.localarea = res.result.data;
            console.log(this.localarea)
            this.loadCitys(this.localarea[0][0]);
        }).catch(err => {
            console.log(err);
        });
    }
    //获取当前市
    public loadCitys(provId) {
        // this.cityarea;
        for (let i = 0; i < this.localarea.length; i++) {
            if (this.localarea[i][0] == Number(provId)) {
                this.cityarea = this.localarea[i][3];
                // this.addmodel.cityId = this.addmodel.cityId ? this.addmodel.cityId : this.localarea[i][3][0][0];
                console.log(this.cityarea);
                this.loadthreecity(this.localarea[i][3][0][0]);
                return;
            }
        }
    }
    //获取三级市
    public loadthreecity(cityId) {
        for (let i = 0; i < this.cityarea.length; i++) {
            if (this.cityarea[i][0] == Number(cityId)) {
                this.provincearea = this.cityarea[i][3];
                console.log(this.provincearea);
                this.threequ(this.cityarea[i][3][0][0]);
                return;
            }
        }
    }
    public threequ(districtId) {
        for (let j = 0; j < this.provincearea.length; j++) {
            console.log(this.provincearea[j]);
            if (this.provincearea[j][0]) {
                // this.area.q += this.threecity[
                return
            }
        }
    }
    //添加
    public addstroe(){
        this.service.addstroe(this.addstroeparams).then(resp=>{
            console.log("添加")
            console.log(resp);
        }).catch(resp=>{
            console.log(resp);
        })
    }
    //初始化列表
    public initstroeTreelist(){
        this.myBaTree=new Array<any>();
        this.service.getstroeTreelist().then(resp=>{
            console.log(resp);
            this.myBaTree.push(resp.result);
        }).catch(resp=>{
            console.log(resp)
        })
    }
    public baTreeGoback(event){
        console.log(event)
        if(event.code==1){
            this.initstroeTreelist();
        }
    }
}
