export class partsSellSelectTable {
  "brandName": string;
  "carModels": [
    {
      "createTime": string,
      "dmlFlag": number,
      "dmlTime": string;
      "factoryId": number;
      "modelId": number;
      "modelName": string;
      "remark": string;
      "seriesId": number
    }
  ];
  "inventory": number = 0;
  "originPlace": string;
  "packSpec": string;
  "partsCode": string;
  "partsId": number = 0;
  "partsName": string;
  "partsSpec": string;
  "partsTypeName": string;
  "partsUnit": string;
  "sellPrice": number = 0;
}
export class partsSellNamelist {
  name: string;
  mobile: string;
}
