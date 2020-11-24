import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnAttributeFormComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-form/cn-attribute-form.component';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
@Component({
  selector: 'cn-attribute-table,[cn-attribute-table]',
  templateUrl: './cn-attribute-table.component.html',
  styleUrls: ['./cn-attribute-table.component.less']
})
export class CnAttributeTableComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  @Input() public typeConfig;
  @Input() public changeValue;
  @Input() public attributeType;
  @Input() public loadConfigValue;
  @Output() public execOperation = new EventEmitter();
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.tempValue ={}
  }

  public dataList = [];
  public arrData={};
  public SelectRow;
  async ngOnInit() {
    this.tempValue['ParentType'] =  this.attributeType?this.attributeType:2;
    this.setChangeValue(this.changeValue);
    console.log("table配置", this.config, this.attributeConfig);

      await this.load();
    
   
  }

  public setChangeValue(ChangeValues?) {
    console.log('changeValue', ChangeValues);
    // const ChangeValues = [{ name: "", value: "", valueTo: "" }];
    if (ChangeValues && ChangeValues.length > 0) {
      ChangeValues.forEach(p => {
        switch (p.valueTo) {
          case 'tempValue':
            this.tempValue[p.name] = p.value;
            break;
          case 'initValue':
            this.initValue[p.name] = p.value;
            break;
          case 'staticComponentValue':
            this.staticComponentValue[p.name] = p.value;
            break;
  
        }
      });
    }
  
  }

  drop(event: CdkDragDrop<string[]>): void {
   // moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
  }

  async createModal(): Promise<void> {
    console.log('createModal');
    const isAdd = await this.addObject();
    if(!isAdd){
      return;
    }else {
      await this.load();
      this.dataList.forEach(d=>{
        if( d['rowId'] ===isAdd) {
          this.setSelectRow(d);
        }
      });
     
    }
    if(this.typeConfig){
      if(this.typeConfig.componentType==='table_from'){
         // 有消息过来加载数据
      }
      this.addRow();
    } else { 
      this.addForm()
    }
  }
  editModal(): void {
    if(!this.SelectRow){
      console.log("选中编辑");
      return;
    }
    if(this.typeConfig){
      if(this.typeConfig.componentType==='table_from'){
         // 有消息过来加载数据
      }
      this.editRow();
    } else { 
      this.editForm()
    }
  }

  addForm(){
    console.log('新增行addForm', this.arrData,this.dataList, this.config);
    this.componentService.modalService.create({
      nzWidth: '85%',
      nzMaskClosable:false,
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: '对象属性',
      //  nzContent: '',
      nzContent: CnAttributeFormComponent,
      nzComponentParams: {
        config: this.attributeConfig,
        changeValue:this.changeValue,
        loadConfigValue:{PID:  this.SelectRow['rowId']}
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK', );
        this.load();
   

      }
    });
  }
  editForm(){
    console.log('编辑行addForm', this.arrData,this.dataList, this.config);
    this.componentService.modalService.create({
      nzWidth: '85%',
      nzMaskClosable:false,
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: '对象属性',
      //  nzContent: '',
      nzContent: CnAttributeFormComponent,
      nzComponentParams: {
        config: this.attributeConfig,
        changeValue:this.changeValue,
        loadConfigValue:{PID:  this.SelectRow['rowId']}
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK', );
        this.load();
     

      }
    });
  }
  addRow(){
    // 点击新增，表单数据新增
    // 点击移除，表单数据变化
    // 新增，首先数据库新增一条记录，返回回来，执行成功后将数据发送给表单
   console.log('新增行', this.arrData['keyId'],this.dataList, this.config);
//  this.arrData['keyId'] 【数组id标识】

  }
  editRow(){
    // 点击新增，表单数据新增
    // 点击移除，表单数据变化
    // 新增，首先数据库新增一条记录，返回回来，执行成功后将数据发送给表单
console.log('新增行', this.arrData['keyId'],this.dataList, this.config);
//  this.arrData['keyId'] 【数组id标识】

  }

  deleteRow(){
    if(!this.SelectRow){
      console.log("选中编辑");
      return;
    }
    this.componentService.modalService.confirm({
      nzTitle: '删除确认框?',
      nzContent: '<b style="color: red;">你确定要删除吗？</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () =>{
        this.deleteObject();
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg,comp?) {
    let c = { PID: this.config.keyId };
    if(comp){
      c = {...c,...comp};
    }
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: c, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue,
      userValue:this.userValue
    });
  }

  loadingConfig = {
    "url": "resource/B_P_D_CONFIG_JSON_P/operate",  // operation 操作 query
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
      {
        "name": "PageId",
        "type": "tempValue",
        "valueName": "ID",
        "dataType": "string",
        "value": ""
      },
      {
        "name": "CMTId",
        "type": "tempValue",
        "valueName": "CMTId",
        "dataType": "string",
        "value": ""
      },
      {
        "name": "ParentType",
        "type": "tempValue",
        "valueName": "ParentType",
        "dataType": "int",
        "value": this.attributeType?this.attributeType:2
      },
    ],
    "filter": [

    ]
  }
  /**
   * load 自加载
   */
  public async load(component?) {

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
      this.arrData =d;
      this.tempValue['ARRYID'] = this.arrData['keyId'];
      this.convertData(d);
      if(this.SelectRow){
        this.setSelectRow(this.SelectRow);
      }

    }



  }

  // @COMID nvarchar(50), -- 引用组件库标识
	// @PAGEID  nvarchar(50), -- 所在页面标识
	// @TYPE  nvarchar(50), -- ARRY_OBJECT  PROPERTY_OBJECT  PROPERTY_ARRY 数组下的对象、属性下对象、属性下数组
	// @PARENTID  nvarchar(50),  -- 所属父节点标识【数组标识、对象标识、属性标识】
	// @CURRENTCOMID  nvarchar(50),--生成组件标识
	// @LAYOUTCOMPONENTID nvarchar(50) -- 引用标识
  addObjectConfig = {
    "url": "resource/B_P_DOWN_NODE/operate",  // operation 操作 query
    "ajaxType": "post",
    "params": [
      {
        "name": "ARRYID",
        "type": "tempValue",
        "valueName": "ARRYID",
        "dataType": "string",
        "value":""
      },
    ],
    "filter": [

    ]
  }
  public async addObject() {

    const url = this.addObjectConfig.url;
    const method = this.addObjectConfig.ajaxType;
    const params = {
      ...this.buildParameters(this.addObjectConfig.params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
    console.log("执行新增后", response.data,response.data._procedure_resultset_1[0].W);
    return response.data._procedure_resultset_1[0].W;
  }

  deleteObjectConfig = {
    "url": "resource/B_P_DELETE_NODE/operate",  // operation 操作 query
    "ajaxType": "post",
    "params": [
      {
        "name": "ID",
        "type": "componentValue",
        "valueName": "ID",
        "dataType": "string",
        "value":""
      },
    ],
    "filter": [

    ]
  }
  public async deleteObject() {

    const url = this.deleteObjectConfig.url;
    const method = this.deleteObjectConfig.ajaxType;
    const params = {
      ...this.buildParameters(this.deleteObjectConfig.params,{ID:this.SelectRow['rowId']})
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
    console.log("执行删除后", response.data);
    this.SelectRow=null;
    await this.load();

   if( this.dataList.length>0) {
    this.setSelectRow(this.dataList[0]);
   }else{
    this.SelectRow=null;
    this.execOperation.emit(null);
   }


    
  }
  

  loadData;
  convertData(d?) {
    this.loadData =d;
    this.dataList =[];
      d.data.forEach(item => {
      const datalistitem = {};
      datalistitem['rowId'] = item['keyId'];
      datalistitem['rowSelected'] = false;
      item.data.forEach(itemfeild => {
        datalistitem[itemfeild['feild']] = itemfeild['value']?itemfeild['value']:'';
      });
      this.dataList.push(datalistitem);
    });

    this.dataList=this.dataList.filter(item=> item.rowId!=='');
    if(this.dataList.length<=0){
      this.SelectRow =null;
    }

    // console.log('最终数据集', this.dataList, this.config.columns);

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
    this.SelectRow = rowData;
    this.execOperation.emit(rowData);
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


   public changeData(r?){
        // 表单编辑后的数据
   

        const idx = this.dataList.findIndex(w => w.rowId ===  r['rowId']);
        if (idx !== -1) {
          const row =  r;
          r['rowSelected'] =  this.dataList[idx]['rowSelected'] ?  this.dataList[idx]['rowSelected'] : true;
          this.dataList[idx] = r;
        }
   
    }
}
