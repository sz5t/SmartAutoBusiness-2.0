import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cn-custom-icon-state',
  templateUrl: './cn-custom-icon-state.component.html',
  styleUrls: ['./cn-custom-icon-state.component.less']
})
export class CnCustomIconStateComponent implements OnInit {
  @Input() public config; //配置参数
  @Input() initData;
  @Input() tempData;
  @Input() changeValue: any;
  @Input() public permissions = [];
  @Input() public dataList = [];
  @Input() dataServe;
  @Input() public currentValue: any; // 当前值
  @Output() public updateValue = new EventEmitter();
  public switchValue=true;
  public checked=true;
  public value='';
  public currentColor='';
  public currentIcon='';

  constructor() { }

  ngOnInit() {
    this.currentValue='001';
    this.getShowObject(this.currentValue);

  }


  _config={
    "isLabel":"", // 是否显示文本 默认不显示
    "isTooltip":"", // 是否显示提示 默认不显示
    "isDefaultValue":"", // 是否启用默认值 默认不显示
    "initObject":{
      label:'',color:'magenta',value:'001',icon:'eye'
    },
    "options":[  // 静态数据
      {label:'',color:'magenta',value:'001',icon:'eye'},
      {label:'',color:'lime',value:'002',icon:'eye-invisible'},
      {label:'',color:'geekblue',value:'003',icon:'question'}
    ],

    "loadingConfig": {                   // 远程加载数据
      "id": "loadformselect1"       
    },
    "columns": [                   // 配置图标状态映射
      {
        "title": "值",             // 映射id
        "type": "value",
        "field": "ID"
      },
      {
        "title": "图标",            // 映射父id
        "type": "icon",
        "field": "PID"
      },
      {
        "title": "颜色",     // 显示内容
        "type": "color",
        "field": "OFFICENAME"
      },
      {
        "title": "文本",     // 显示内容
        "type": "label",
        "field": "OFFICENAME"
      }
    ]
  }
  _dataList=[
    {label:'',color:'magenta',value:'001',icon:'eye'},
    {label:'',color:'lime',value:'002',icon:'eye-invisible'},
    {label:'',color:'geekblue',value:'003',icon:'question'}
  ];



  public buttonSwitchClick(v?){
    v = !v;
    this.switchValue = ! this.switchValue;
    console.log(v);
  }

  getShowObject(v?):any{
    const index= this._dataList.findIndex(item=>item.value===v);
    if(index>-1){
      const obj = this._dataList[index];
      this.currentValue=obj['value'];
      this.currentColor=obj["color"];
      this.currentIcon=obj['icon'];
     // return this._dataList[index];
    } else{
      this.currentValue='';
      this.currentColor='';
      this.currentIcon='';
    // return null;
    }
  }

  public currentSwitchClick():void{
    const new_value= this.switchState(this.currentValue);
    this.getShowObject(new_value);
   
  }


  // 状态【环】状，click=》指向下一个状态，切换
  // 考虑无值状态
  
  switchState(v?):any{

    let index = this._dataList.findIndex(item=>item.value===v);
    // 1.当前值索引  判断索引+1 是否溢出，溢出指向第一个数据，否则指向+1的值
    // 索引为空，第一个记录

    if(index<0){
      // 未有匹配的值 指定在第一个状态上
      index =0;
    } else{
      if(index>=this._dataList.length-1){
        index =0;
      }else{
        index=index+1;
      }
    }

    if(index>-1){
      return this._dataList[index]['value'];
    } else{
      return null;
    }


  }

  // 生成配置结构
  public createConfig(){

    const _config={
      name:"",
      feild:"",  // 指定字段
      editor:{
        type:"switch", // switch\ button\ icon 
        options:[  // 静态数据【优先级】
          {}
        ],
        ajaxConfig:{ // 优先级>静态数据
          id:''   // 数据异步请求
        }

      }

    };

  }


}
