import { PagedParams } from '../../privaders/common.modal';
// 工单查询 
export class orderDetailInfo {
    public buyDate: string;         // 购车日期
    public carModelName: string;    // 车型
    public carNo: string;           // 车牌号
    public acountPerson: string;    // 结算方
    public brandName: string;       // 品牌ID
    public haveAdviseRepairProject: number;  // 是否存在建议维修项目 ,
    public haveExtra: number;                // 是否存在附加项目 ,
    public havePreView: boolean;             // 是否预检单 ,
    public haveUseParts: number;             // 是否使用维修配件 
    public estimatedDeliveryTime: string;   // 预计交车时间
    public factoryMileAge: number;      // 
    public mileage: number;             // 
    public mobile: string;          // 车主电话
    public name: string;            // 车主
    public orderId: number;
    public orderNo: string;         // 工单号
    public overtime: string;        // 超时
    public recommender: string;     // 介绍人
    public recommenderMobile: string;   // 介绍人电话
    public repairMobile: string;    // 送修人手机
    public repairName: string;      // 送修人
    public repairOrderInfoDtos: Array<repairOrderInfo> = new Array<repairOrderInfo>();
    public lastEntryMilage: number;     // 上次进厂里程
    public lastEntryTime: string;       // 上次进厂时间
    public nextMaintainDate: string;    // 建议下次保养日期
    public nextMileage: number;         // 建议下次保养行程里程数
    public repairStation: string;       // 维修工位
    public seriesName: string;          // 车系ID
    public serviceName: string;         // 服务顾问
    public settlementTime: string;      // 结算日期
    public vehicleDate: string;     // 验车日期
    public vin: string;             // VIN
}
export class repairOrderInfo {
    public assignTechnicanName: string;     // 指派技师名
    public discount: number;                // 折扣率
    public hourPrice: number;               // 工时单价
    public isAllot: number;
    public isExtra: boolean;                // 是否是增项
    public isPass: boolean;                 //是否通过验收
    public isTransfer: number;
    public orderId: number;                 // 工单Id
    public projectName: string;             // 维修项目名
    public repairHour: number;              // 维修工时
    public repairProjectId: number;         // 维修项目Id
    public repairType: number;              // 维修类型
    public totalCount: number;              // 项目金额
    public turnToSendName: string;          // 转派技师数据
}
export class orderSearch extends PagedParams {
    public orderStatus: string;         // 工单状态
    public carNo: string;               // 车牌号
    public name: string;                // 车主
    public repairName: string;          // 送修人
    public repairMobile: string;        // 送修人电话
    public orderNo: string;             // 工单编号
    public brandId: number;             // 品牌Id
    public carSeriesId: number;         // 车系Id
    public carModelId: number;          // 车型Id
    public serviceName: string;         // 服务顾问
    public repairType: number;          // 维修类型
    public factoryBeginTime: string;    // 入厂开始时间
    public factoryEndTime: string;      // 入厂结束时间
    public outFactoryBeginTime: string; // 出厂开始时间
    public outFactoryEndTime: string;   // 出厂结束时间
}
export class RepairPartsInfoDto {
    public num: number;
    public partId: number;           // 配件Id
    public partName: string;         // 配件名称
    public partsBrand: string;       // 配件品牌
    public partsSpec: string;        // 规格型号
    public price: number;            // 单价
    public repairProjectId: number;  // 维修工项Id
    public repairProjetName: string; // 维修工项
    public totoal: number;           // 金额
}
export class PreviewDto {
    public preview: PreviewOrderDto = new PreviewOrderDto();    // 预检单信息
    public previewPics: Array<StPreviewPic> = new Array<StPreviewPic>(); // 预检单图片信息
}
export class StPreviewPic {
    public createTime: string;
    public dmlFlag: number;
    public dmlTime: string;
    public picId: number;
    public picUrl: string = "";
    public previewId: number;
}

// 创建工单
export class UserInfo extends PagedParams {
    public condition: string;   // 车主名称或车牌号
}
export class CarBrand extends PagedParams {
    public brandName: string;   // 品牌名称
}
export class CarSeries extends PagedParams {
    public brandId: number;     // 品牌id
    public seriesName: string;  // 车系名称
}
export class CarModel extends PagedParams {
    public seriesId: number;    // 车系id
    public modelName: string;   // 车型名称
}
export class ParamDto {
    public amountDue: number;               // 应收金额
    public carId: number;                   // 客户车辆ID，由已存在客户和挂单作为基础信息创建工单时，应作为参数给
    public carNo: string;                   // 车牌号
    public driveMileage: number;            // 行驶里程
    public estimatedDeliveryTime: string = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + (new Date().getHours() + 2) + ':' + new Date().getMinutes();   // 预计交车时间
    public hangId: number;                  // 挂单ID，由挂单作为基础信息创建工单或再次挂单时，应作为参数给
    public lastInFactoryMileage: number;    // 上次进厂里程，不作参数
    public lastInFactoryTime: string;       // 上次进厂时间，不作参数
    public mobile: string;                  // 车主手机号
    public modelId: number;                 // 车型ID
    public modelInfoDto: CarModelInfoDto = new CarModelInfoDto();  // 车辆信息
    public name: string;                    // 车主姓名
    public nextMaintainDate: string;        // 建议下次保养日期
    public nextMileage: number;             // 建议下次保养里程
    public orderId: number;                 // 工单ID，由挂单作为基础信息创建工单或再次挂单时，应作为参数给
    public previewId: number;               // 预检单ID，创建工单时，若存在预检单，应给出此参
    public projectParamDtos: Array<RepairProjectDto> = new Array<RepairProjectDto>();     // 维修项目
    public recommender: string;             // 推荐人
    public recommenderMobile: string;       // 推荐人电话
    public repairMobile: string;            // 送修人电话
    public repairName: string;              // 送修人
    public repairStation: string;           // 维修工位
    public repairType: number;              // 维修类型
    public repairTypeDesc: string;          // 维修类型描述
    public sourceChannel: number;           // 来源渠道类型
    public sourceChannelDesc: string;       // 来源渠道描述，此处只作为返回值，不做参数要求 ,
    public totalDiscountPrice: number;      // 优惠 ,
    public totalHourCost: number;           // 工时费 ,
    public totalMaterialsCost: number;      // 材料费 ,
    public vehicleDate: string;             // 验车日期
    public vin: string;                     // 车架号
}
export class CarModelInfoDto {
    public brandId: number;         // 品牌Id
    public brandName: string;       // 品牌
    public modelName: string;       // 车型
    public seriesId: number;        // 车系Id
    public seriesName: string;      // 车系
}
export class RepairProjectDto {
    public discount: number = 100;         // 折扣率
    public hourPrice: number;        // 工时单价
    public projectId: number;        // 维修项目ID
    public projectName: string;      // 维修项目名称
    public repairHour: number;       // 维修工时
    public repairId: number;         // 维修类型ID
    public totalCount: number;       // 总金额
    public repairType: string;
}
export class CreateOrderDto {
    public carId: number;
    public carNo: string;
    public detailProjectDtos: Array<DetailProjectDto> = new Array<DetailProjectDto>();
    public lastInFactoryMileage: number;
    public lastInFactoryTime: string;
    public mobile: string;
    public modelId: number;
    public modelInfoDto: CarModelInfoDto = new CarModelInfoDto();
    public name: string;
    public previewOrderDto: PreviewOrderDto = new PreviewOrderDto();
    public repairMobile: string;
    public repairName: string;
    public sourceChannel: number;
    public sourceChannelDesc: string;
    public vin: string;
    //  
    public repairType: string;
    public estimatedDeliveryTime: string;
    public driveMileage: string;
    public recommender: string;
    public recommenderMobile: string;
    public vehicleDate: string;
    public repairStation: string;
    public nextMaintainDate: string;
    public nextMileage: string;
}
export class DetailProjectDto {
    public discount: number;
    public hourPrice: number;
    public orderRepairId: number;
    public projectId: number;
    public projectName: string;
    public repairHour: number;
    public repairUserName: string;
    public totalCount: number;
    public repairPackDtos: Array<DetailRepairPackDto> = new Array<DetailRepairPackDto>();
}
export class DetailRepairPackDto {
    public count: number;
    public partsBrandName: string;
    public partsName: string;
    public partsSpec: string;
    public price: number;
    public repairProject: string;
    public totalPrice: number;
}
export class PreviewOrderDto {      // 预检单
    public createTime: string;
    public customerCarId: number;
    public customerSignUrl: string = "";
    public dashboardExc: string;
    public dashboardExcNum: number;
    public dashboardNum: number;
    public dashboardPassNum: number;
    public dashboardRemark: string;
    public faultDesc: string;
    public interiorPicUrl: string = '';
    public isCreatedOrder: number;
    public mileage: number;
    public orderId: number;
    public partsExc: string;
    public partsRemark: string;
    public partsTestExcNum: number;
    public partsTestNum: number;
    public partsTestPassNum: number;
    public picUrl: Array<string>;
    public previewId: number;
    public previewerId: number;
    public previewerName: string;
    public remainingOil: number;
    public repairType: number;
    public repairTypeDesc: string;
    public surfacePicUrl: string = '';
}

// 维修结算
export class settlement extends PagedParams {
    public carNo: string;           // 车牌 ,
    public orderNo: string;         // 工单号 ,
    public orderStatus: number;     // 工单状态：5待结算，6已结算
    public settlementNo: string;    // 结算单号 ,
    public startTime: string;       // 进厂时间
    public endTime: string;         // 进厂时间 ,
}
export class OrderInfoDetail {
    public buyDate: string;         // 购车日期
    public carModel: string;        // 车型
    public carNo: string;           // 车牌号
    public cashAmountDue: number;   // 收银应收金额
    public deliveryTime: string;
    public detailProjectDtos: Array<detailProjectDtos> = new Array<detailProjectDtos>();
    public detailSettlementDto: Array<detailSettlementDto> = new Array<detailSettlementDto>();
    public estimatedDeliveryTime: string;   // 预计交车时间
    public factoryMileage: number;      // 
    public mileage: number;             // 
    public mobile: string;          // 车主电话
    public name: string;            // 车主
    public orderId: number;
    public orderNo: string;         // 工单号
    public overtime: string;        // 超时
    public recommender: string;     // 介绍人
    public recommenderMobile: string;   // 介绍人电话
    public repairMobile: string;    // 送修人手机
    public repairName: string;      // 送修人
    public repairType: number;      // 维修类型
    public repairTypeDesc: string;
    public servicerName: string;    // 服务顾问
    public settlementAmountDue: number; // 结算应收金额
    public totalDiscountPrice: number;  // 优惠
    public totalHourCost: number;       // 工时费
    public totalMaterialsCost: number;  // 材料费
    public vehicleDate: string;     // 验车日期
    public vin: string;             // VIN
}
export class detailProjectDtos {
    public discount: number;
    public hourPrice: number;
    public orderRepairId: number;
    public projectId: number;
    public projectName: string;
    public repairHour: number;
    public repairPackDtos: Array<repairPackDtos> = new Array<repairPackDtos>();
    public repairUserName: string;
    public totalCount: number;
}
export class repairPackDtos {
    public count: number;
    public partsBrandName: string;
    public partsName: string;
    public partsSpec: string;
    public price: number;
    public repairProject: string;
    public totalPrice: number;
}
export class detailSettlementDto {
    public settlementId: number;
    public settlementMoney: number;
    public settlementNo: string;
    public settlementTime: string;
    public settlementUserName: string;
}
export class SettlementOperation {
    public orderId: number;         // 工单号
    public amountDue: number;       // 金额
    public settlementType: number = 1;  // 结算方式
}

// 维修增项
export class orderInfo extends PagedParams {
    public condition: string;        // 工单号或车牌号
}
export class OrderInfoDto {
    public brandName: string;               // 品牌ID
    public carModelName: string;            // 车型ID
    public carNo: string;                   // 车牌号
    public estimatedDeliveryTime: string;   // 预计交车时间
    public haveExtra: number;               // 是否存在附加项目
    public haveUseParts: number;            // 是否使用维修配件
    public mileage: number;                 // 行程里程
    public mobile: string;                  // 手机号
    public name: string;                    // 车主姓名
    public nextMaintainDate: string;        // 建议下次保养日期
    public nextMileage: number;             // 建议下次保养行程里程数
    public orderId: number;                 // 工单ID
    public orderNo: string;                 // 工单编号
    public recommender: string;             // 介绍人
    public recommenderMobile: string;       // 介绍人电话
    public repairMobile: string;            // 送修人电话
    public repairName: string;              // 送修人
    public repairOrderInfoDtos: Array<any>;   //维修项目
    public repairStation: string;           // 维修工位
    public repairType: number;              // 车辆维修类型
    public seriesName: string;              // 车系ID
    public vehicleDate: string;             // 验车日期
    public vin: string;                     // 车架号
}
export class HangUpProjectDto {
    public carNo: string;                                       // 车牌号
    public customerName: string;                                // 车主
    public orderNo: string;                                     // 工单号
    public orderId: number;                                     // 工单id
    public repairDtos: Array<RepairDto> = [];                   // 新增维修增项列表
    public stAdviseRepairProjects: Array<AdviseRepair> = [];    // 新增建议维修项目列表
    public stExtraProjects: Array<ExtraProject> = [];           //新增额外维修项目列表
}
export class RepairDto {
    public projectName: string;         //维修项目名
    public repairType: number;          //维修类型
    public repairHour: number;          //维修工时
    public hang: boolean;               //是否挂单
    public hourPrice: number;           //工时单价
    public discount: number = 100;      //折扣率
    public totalCount: number;          //项目金
    public orderId: number;             //工单Id
    public repairProjectId: number;     //维修项目Id
}
export class AdviseRepair {
    public hang: boolean;              //是否挂单
    public projectId: number;
    public projectName: number;
    public orderId: number;             //工单Id
    public remark: string;
}
export class ExtraProject {
    public isHang: boolean;              //是否挂单
    public orderId: number;             //工单Id
    public projectContent: string;
}
export class repairProject extends PagedParams {
    public projectName: string;     // 维修项目名称
}
export class searchHangOrder extends PagedParams {
    public hangType: number = 2;    // 挂单类型=2 表示维修增项挂单信息
}