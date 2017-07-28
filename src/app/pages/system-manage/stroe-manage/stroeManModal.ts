import { PagedParams } from '../../../privaders/common.modal';
export class orgLeve {
    orgId: number;
    level: string = "1";
}
export class stroeManSelect extends PagedParams {
    orgId: number
}
export class stroeManlist {
    "address": string
    "cityId": number
    "countyId": number
    "level": string
    "levelDesc": string
    "orgId": number
    "orgName": string
    "orgNature": number
    "orgNatureDesc": string
    "pId": number
    "pName": string
    "provinceId": number
}
export class addstroe {
    "address": string="zhangsdf"
    "cityId": number=1222
    "countyId": number=1222
    "isEnable": boolean=false
    "level": string="11"
    "mobile": string="13276059988"
    "orgName": string="sdfsdfs"
    "orgNature": number=2
    "password": string="zqaizq"
    "pid": number=50505
    "provinceId": number=5555
    "username": string="zhangqiang"
}