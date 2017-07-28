import { state } from '@angular/animations';
export class PageParams {
    public pageIndex = 1;
    public pageSize = 10;
    public setPage(index: number, size?: number) {
        this.pageIndex = index;
        this.pageSize = size || this.pageSize;
    }
}
// 按照车牌删选信息
export class maintenance extends PageParams {
    public condition: string;
    public orderStatus: string;
}
export class repairOrderInfoDto {
    public assignTechnicanName: string;
    public turnToSendName: string;
    public discount: Number;
    public hourPrice: Number;
    public isTransfer: Number;
    public projectName: Number;
    public repairProjectId: Number;
    public repairType: Number;
    public totalCount: Number;
    public condition: Number;
}
// 详情信息
export class detailInfoDto {
    public preViewOrder: boolean;
    public repairOrderInfoDtoList: RepairOrderInfoDto = new RepairOrderInfoDto();
    public useParts: boolean;
}
export class RepairOrderInfoDto {
    public assignTechnicanName: string;
    public projectName: string;
    public turnToSendName: string;
    public discount: Number;
    public hourPrice: Number;
    public isTransfer: Number;
    public orderId: Number;
    public repairHour: Number;
    public repairProjectId: Number;
    public repairType: Number;
    public totalCount: Number;
}
// 配件信息
export class partsInfo {
    public num: Number;
    public partId: Number;
    public price: Number;
    public repairProjectId: Number;
    public totoal: Number;
    public partName: string;
    public partsBrand: string;
    public partsSpec: string;
    public repairProjetName: string;
}
// 查询预检单所需参数
export class preViewParams {
    public orderId: string;
}
// 预检单信息
export class preViewInfo {
    public createTime: string;
    public customerSignUrl: string;
    public dashboardExc: string;
    public dashboardRemark: string;
    public dmlTime: string;
    public faultDesc: string;
    public finishTime: string;
    public interiorPicUrl: string;
    public partsExc: string;
    public partsRemark: string;
    public previewerName: string;
    public surfacePicUrl: string;
    public customerCarId: Number;
    public dashboardExcNum: Number;
    public dashboardNum: Number;
    public dashboardPassNum: Number;
    public dmlFlag: Number;
    public isCreatedOrder: Number;
    public orderId: Number;
    public mileage: Number;
    public partsTestExcNum: Number;
    public partsTestNum: Number;
    public partsTestPassNum: Number;
    public previewId: Number;
    public previewStatus: Number;
    public previewerId: Number;
    public remainingOil: Number;
    public repairType: Number;
}
// 确认指派技师
export class dispatchingParamDto {
    public dmlflag: Number;
    public repairOrderIds: Array<any>;
    public userId: Number;
}
// 验收项目
export class checkOrder {
    public mileage: Number;
    public orderRepairIdList: Array<any>;
}