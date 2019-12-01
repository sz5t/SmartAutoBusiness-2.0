import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CfgAttributeFormComponent } from '@shared/config-components/config-attribute/cfg-attribute-item/cfg-attribute-form/cfg-attribute-form.component';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'cfg-attribute-table,[cfg-attribute-table]',
  templateUrl: './cfg-attribute-table.component.html',
  styleUrls: ['./cfg-attribute-table.component.less']
})
export class CfgAttributeTableComponent  extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  @Input() public initData;
  @Input() public changeValue;
  @Input() public attributeType;
  @Input() public typeConfig;
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
    console.log("table配置", this.config, this.attributeConfig,this.initData);
if(!this.config){
  this.config={};
   this.config['columns']=[];
}
   
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
     moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
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
      nzContent: CfgAttributeFormComponent,
      nzComponentParams: {
        config: this.attributeConfig,
        changeValue:this.changeValue,
        initData:{PID:  this.SelectRow['rowId']}
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
      nzContent: CfgAttributeFormComponent,
      nzComponentParams: {
        config: this.attributeConfig,
        changeValue:this.changeValue,
        initData:{PID:  this.SelectRow['rowId']}
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

   if(this.initData)  {
    c['PID'] = this.initData['PID']
   }

    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: c, //  组件值？返回值？级联值，需要三值参数
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
    "url": "sd/B_P_DOWN_NODE/procedure",  // operation 操作 query
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
    "url": "sd/B_P_DELETE_NODE/procedure",  // operation 操作 query
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


    public onRefresh(){
      this.load();
    }
}
