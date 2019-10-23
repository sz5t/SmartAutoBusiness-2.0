import { Component, OnInit, Input, Inject } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnAttributeFormComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-form/cn-attribute-form.component';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
@Component({
  selector: 'app-cn-attribute-table',
  templateUrl: './cn-attribute-table.component.html',
  styleUrls: ['./cn-attribute-table.component.less']
})
export class CnAttributeTableComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  public dataList = [];
  async ngOnInit() {
    console.log("table配置", this.config, this.attributeConfig);
    await this.load();
  }

  drop(event: CdkDragDrop<string[]>): void {
   // moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
  }

  createModal(): void {
    console.log('createModal');
    this.componentService.modalService.create({
      nzWidth: '85%',
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: '对象属性',
      //  nzContent: '',
      nzContent: CnAttributeFormComponent,
      nzComponentParams: {
        config: this.attributeConfig
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK', );


      }
    });
  }

  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: { PID: this.config.keyId }, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue
    });
  }

  loadingConfig = {
    "url": "sd/B_P_D_CONFIG_JSON_P/procedure",  // operation 操作 query
    "ajaxType": "post",
    "params": [
      {
        "name": "PID",
        "type": "componentValue",
        "valueName": "PID",
        "dataType": "string"
      },
      {
        "name": "TYPE",
        "type": "value",
        "valueName": "PID",
        "dataType": "int",
        "value":2
      },
    ],
    "filter": [

    ]
  }
  /**
   * load 自加载
   */
  public async load() {

    const url = this.loadingConfig.url;
    const method = this.loadingConfig.ajaxType;
    const params = {
      ...this.buildParameters(this.loadingConfig.params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
   // console.log("数组加载", response.data,response.data._procedure_resultset_1[0].W);
    if(response.data._procedure_resultset_1[0]['W']===""){}
    else{
      const d = JSON.parse(response.data._procedure_resultset_1[0]['W']) ;
      this.convertData(d);
    }



  }


  convertData(d?) {

      d.data.forEach(item => {
      const datalistitem = {};
      datalistitem['rowId'] = item['keyId'];
      datalistitem['rowSelected'] = false;
      item.data.forEach(itemfeild => {
        datalistitem[itemfeild['feild']] = itemfeild['value']?itemfeild['value']:'未知';
      });
      this.dataList.push(datalistitem);
    });

    this.dataList=this.dataList.filter(item=> item.rowId!=='');

    console.log('最终数据集', this.dataList, this.config.columns);

  }

  public setSelectRow(rowData?, $event?) {
    if (!rowData) {
      return false;
    }
    if ($event) {
      const src = $event.srcElement || $event.target;
      if (src.type !== undefined) {
        return false;
      }
      $event.stopPropagation();
      $event.preventDefault();
    }

    // 选中当前行
    if (this.dataList.length > 0) {
      this.dataList.map(row => {
        if(row['rowId'] === rowData['rowId']) {
          row['rowSelected'] = true;
        } else {
          row['rowSelected'] = false;
        }
      });
    }

    return true;
  }

  public _datalist =
    {
      "keyId": "38BA1724-6314-47D1-9EAD-5B89458004A0",
      "refKeyId": "A3F056DE-365C-4AB0-A85F-BCCDD34C427D",
      "type": "array",
      "data": [
        {
          "keyId": "281737CB-8DAE-4F7B-98FD-E10B1B4AFF3E",
          "refKeyId": "MFYojRxTxcy8rk0WO1GbsAbdw8zU00Cc",
          "type": "object",
          "data": [
            {
              "keyId": "DF032B8B-04F8-4C6B-9E51-4DFB25FFFC12",
              "refKeyId": "YGPdeeQZJFICx4dD7pwrTd9i2hRvKai4",
              "feild": "text",
              "type": "value",
              "value": "1",
              "data": ""
            }, {
              "keyId": "7658AFB0-8015-45EB-B6E3-AEFC9EC435E8",
              "refKeyId": "BHGDbmG6ZnHSAlxgJDd8AQEqKRGS5yy5",
              "feild": "id",
              "type": "value",
              "value": "2",
              "data": ""
            }, {
              "keyId": "BE14A27E-93B0-4B16-9498-206D0F96C379",
              "refKeyId": "sGp0Mq7poWGStMpAYIllclrTAZDL5qTx",
              "feild": "icon",
              "type": "value",
              "value": "3",
              "data": ""
            }, {
              "keyId": "CC39FB40-8509-4748-AD47-5CE235E3C24E",
              "refKeyId": "mcrLJs4KgbqNR4inuxR8bdl7TCFdzBUu",
              "feild": "toggle",
              "type": "object",
              "value": "4",
              "data": [{
                "keyId": "9B38D06F-03B8-455D-A82C-C8D37511BA12",
                "refKeyId": "3694F33A-F035-4339-A45D-E35A146DD234",
                "type": "object",
                "data": [{
                  "keyId": "B6D0A8D7-EF99-4CEE-B4CD-8C08F70B77F4",
                  "refKeyId": "2bq8vMJl2XBBYJsQ4jYutXNVPbD80fAI",
                  "feild": "type",
                  "type": "value",
                  "value": "",
                  "data": ""
                }, {
                  "keyId": "A2F41199-D473-4444-BB10-28B9FC03363E",
                  "refKeyId": "MQUuR9xIXs2RV3OnsZl6Fbc0y55zNpEQ",
                  "feild": "toggleProperty",
                  "type": "value",
                  "value": "",
                  "data": ""
                }, {
                  "keyId": "B043C534-D3CF-462A-A572-D5A184474C9E",
                  "refKeyId": "a1wnjUxGBXmrcLzK1hZcuYjjZKNOQFAb",
                  "feild": "values",
                  "type": "array",
                  "value": "",
                  "data": [{
                    "keyId": "24B8AF6C-1338-421C-A4E8-ADF6C8C2D416",
                    "refKeyId": "59A59475-E639-4775-B4A4-CB6BDD170036",
                    "type": "array",
                    "data": [{
                      "keyId": "EE8C911D-BB99-4646-8C0A-30A75F18DAFD",
                      "refKeyId": "eGKhdLT5ZcCk6JMqZZ2gxqbbLOjLlgS2",
                      "type": "object",
                      "data": [{
                        "keyId": "42A7EC35-8A03-44F6-BB10-FB6E9F8ABB8C",
                        "refKeyId": "9bnAn5VfXM8OQzYE8dHkLMtBkaDemGPM",
                        "feild": "name",
                        "type": "value",
                        "value": "",
                        "data": ""
                      }, {
                        "keyId": "347B91C1-F141-418C-B4C3-7FEE8848C390",
                        "refKeyId": "yuBMfu796f6beGQosfSJpnCriIjDEmke",
                        "feild": "value",
                        "type": "value",
                        "value": "",
                        "data": ""
                      }]
                    }]
                  }]
                }]
              }]
            }, {
              "keyId": "B59D342A-271A-468D-9B16-174DA199569E",
              "refKeyId": "e3kch6VPFYcoRpHYKeSYcYHS2bhs9ByV",
              "feild": "state",
              "type": "value",
              "value": "5",
              "data": ""
            }, {
              "keyId": "2B9DBC40-AD94-48E3-B56D-F252A4DBB263",
              "refKeyId": "xbwLvS7VPszwKRb5he5kuyEl9SxguMP9",
              "feild": "execute",
              "type": "array",
              "value": "6",
              "data": [{
                "keyId": "6940D3AC-6FEB-4022-9F13-E31D2F1DAF22",
                "refKeyId": "6D2C62BF-9F98-4B70-BCF9-D9AFAA81EF6E",
                "type": "array",
                "data": [{
                  "keyId": "94964D66-A81B-4FDF-A4E4-3033D88285FF",
                  "refKeyId": "1WHTVKcEbARAsLNOE9f5dWfEKt7r9aqJ",
                  "type": "object",
                  "data": []
                }]
              }]
            }, {
              "keyId": "0BCB017C-FC86-4264-96EB-C4FCE415AB04",
              "refKeyId": "HOVrnhI4RVxF1nHCTPjfr5GGNowRU55H",
              "feild": "type",
              "type": "value",
              "value": "7",
              "data": ""
            }, {
              "keyId": "28955A93-BD9B-4551-965F-13B2AEA62C39",
              "refKeyId": "LuhE0MzXcPNJOO1j8TgtWKHifMPqWC8k",
              "feild": "color",
              "type": "value",
              "value": "8",
              "data": ""
            }, {
              "keyId": "58C0FA42-3650-4C31-9217-570F9CE078B5",
              "refKeyId": "O2ED5FoQpwye8an0Cmfibr636ynyx2oY",
              "feild": "hidden",
              "type": "value",
              "value": "9",
              "data": ""
            }, {
              "keyId": "30DB1746-BF46-496A-AAC7-99AA6A74E3A8",
              "refKeyId": "uvt3AGMQa1OlFmMGW6ELxpHpf9HqfKrq",
              "feild": "size",
              "type": "value",
              "value": "10",
              "data": ""
            }]
        }]
    }

    valueChange(){
      
    }
}
