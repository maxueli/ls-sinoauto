import { Injectable } from '@angular/core';
import { ApiService } from '../../../../privaders/apiService';
@Injectable()
export class sellInService {
    constructor(
        public api: ApiService
    ) { }

    // 查询模块挂单数据
    public getHangLogs(search) {
        let url = "gethanglogs";
        return this.api.get(url, search);
    }

    // 查询销售退库信息
    public getSellRetreats(orderNo) {
        let url = "findsellretreats";
        return this.api.get(url, orderNo);
    }

    // 删除指定模块的某一个挂单信息
    public deletehang(id, type) {
        let url = `deletehang?hangId=${id}&hangType=${type}`;
        return this.api.delete(url);
    }

    // 批量生成退库数据
    public batchGenerateSellRetreat(param) {
        let url = "batchgeneratesellretreat";
        return this.api.post(url, param);
    }

    // 挂单
    public sellRetreatAddHang(param) {
        let url = "sellretreataddhang";
        return this.api.post(url, param);
    }
}