import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cn-custom-icon-state',
  templateUrl: './cn-custom-icon-state.component.html',
  styleUrls: ['./cn-custom-icon-state.component.less']
})
export class CnCustomIconStateComponent implements OnInit,OnChanges {
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
  public currentTooltipTitle='';
  public currentLabel='';
  public currentStateValue;

  constructor() { }

  ngOnInit() {

    this._dataList = this.config['options'];


    if(this.currentValue || this.currentValue===0){
      this.currentStateValue= this.currentValue;
    }else{
      if(this.config['enableDefaultValue']){
        this.currentStateValue=this.config.defaultValue;
      }
    }

    
    this.getShowObject(this.currentStateValue);
  
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('****ngOnChanges******', changes, this.formGroup)
    // ngOnChanges只有在输入值改变的时候才会触发，
    // 如果输入值(@Input)是一个对象，改变对象内的属性的话是不会触发ngOnChanges的。
    // 部分级联需要此处中转，主要是参数等，取值赋值，隐藏显示等功能需要form表单处理。
    if (changes.hasOwnProperty('currentValue')) {
      if (!changes['currentValue'].firstChange) { // 处理后续变化，初始变化不处理
            
         console.log('监听值变化',this.currentValue);
         this.currentStateValue = this.currentValue;
         this.getShowObject(this.currentStateValue);
      }
    }
 

  }


  _config={
    "enableLabel":true, // 是否显示文本 默认不显示
    "enableTooltip":"", // 是否显示提示 默认不显示
    "enableIcon":true,
    "enableDefaultValue":"", // 是否启用默认值 默认不显示
    "enableSwitch":true,  // 是否启用切换状态
    "showTheme":"icon", // tag icon
    "enableColor":"", // 是否启用颜色
    "enableSelected":false,  // 是否启用选中
    "enable":true, // 是否启用前置拦截，满足当前状态，显示图标状态
    "initObject":{ // 默认展示
      label:'',color:'magenta',value:'001',icon:'eye'
    },
    "options":[  // 静态数据
      {label:'',color:'magenta',value:'001',icon:'eye',tooltipTitle:"[状态]可见"},
      {label:'',color:'lime',value:'002',icon:'eye-invisible',tooltipTitle:"[状态]不可见"},
      {label:'',color:'geekblue',value:'003',icon:'question',tooltipTitle:"[状态]"}
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
    {label:'',color:'magenta',value:'001',icon:'eye',tooltipTitle:"[状态]可见"},
    {label:'',color:'lime',value:'002',icon:'eye-invisible',tooltipTitle:"[状态]不可见"},
    {label:'',color:'geekblue',value:'003',icon:'question-circle',tooltipTitle:"[状态]"}
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
      this.currentStateValue=obj['value'];
      this.currentColor=obj["color"];
      this.currentIcon=obj['icon'];
      this.currentTooltipTitle =obj['tooltipTitle'];
      this.currentLabel =obj['label'];
     // return this._dataList[index];
    } else{
      this.currentStateValue='';
      this.currentColor='';
      this.currentIcon='';
      this.currentTooltipTitle ='';
      this.currentLabel='';
    // return null;
    }
  }

  public currentSwitchClick(v?,$event?):void{
    if(this.config.enableSwitch) {
      const new_value= this.switchState(this.currentStateValue);
      console.log('xin zhi',new_value);
      this.iconStateValueChange(new_value);
      this.getShowObject(new_value);
    }

    $event.stopPropagation();
    $event.preventDefault();
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


  public iconStateValueChange(data?){
    this.updateValue.emit(data);
  }

  public valueChange(v?){
    console.log('icon_valuechange',v);
  }


}
