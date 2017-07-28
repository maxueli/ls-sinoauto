import { PagedParams } from '../../privaders/common.modal';
export class Customer {
    public createTime: string       //创建时间
    public creatorName: string      //创建人名称
    public customerId: number       //客户ID
    public endExpenseTime: string   //末次进厂时间
    public firstExpenseTime: string //首次进场时间
    public mobile: string           //手机号
    public name: string             //车主姓名
    public sourceChannel: number    //来源渠道（网络平台/宣传广告/直接到店/ 朋友介绍 / 微信 / 店铺活动）
}
export class CustomerSearch extends PagedParams {
    public name: string;            //车主姓名
    public mobile: string;          //手机号
    public sourceChannel: string;   //来源渠道
    public beginTime: string;       //建档日期 - 开始 
    public endTime: string;         //建档日期 - 结束 
}
export class CunstomerDetail {
    public customerCars: Array<DetailCars> = [];
    public customerInfoDto: DetailInfo = new DetailInfo();
}
export class DetailCars {
    public carNo: string;               // 车牌号
    public brandName: string;           // 品牌
    public seriesName: string;          // 车系
    public modelName: string;           // 车型名称
    public carModelId: number;          // 车型ID
    public vin: string;                 // 车架号
    public carColor: string;            // 车辆颜色
    public engineNo: string;            // 发动机号
    public vehicleDate: string;         // 验车日期
    public buyDate: string;             // 购车日期
    public insuranceExpireDate: string; // 保险到期日期
    public insuranceCompanyId: number;  // 保险公司Id
}
export class DetailInfo {
    public customerId: number;          // 客户ID
    public mobile: string;              // 手机号        
    public gender: number = 1;          // 性别
    public birthday: string;            // 生日
    public idNumber: string;            // 身份证号
    public name: string;                // 车主
    public landline: string;            // 座机
    public fax: string;                 // 传真
    public email: string;               // Email
    public sourceChannel: number;       // 来源渠道
    public proId: number;               // 省份
    public cityId: number;              // 城市
    public countryId: number;           // 区县
    public areaName: string;            // 地址全称
    public address: string;             // 详细地址
}
export class CarBrand extends PagedParams {
    public brandName: number;   // 品牌名称
}
export class CarSeries extends PagedParams {
    public brandId: number;     // 品牌id
    public seriesName: string;  // 车系名称
}
export class CarModel extends PagedParams {
    public seriesId: number;    // 车系id
    public modelName: string;   // 车型名称
}