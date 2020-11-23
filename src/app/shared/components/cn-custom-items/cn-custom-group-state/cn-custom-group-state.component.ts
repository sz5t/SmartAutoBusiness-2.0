import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cn-custom-group-state',
  templateUrl: './cn-custom-group-state.component.html',
  styleUrls: ['./cn-custom-group-state.component.less']
})
export class CnCustomGroupStateComponent implements OnInit {
  @Input() public config; //配置参数
  @Input() initData;
  @Input() tempData;
  @Input() changeValue: any;
  @Input() public permissions = [];
  @Input() public dataList = [];
  @Input() dataServe;
  @Input() public currentValue: any; // 当前值 object 节点信息
  @Output() public updateValue = new EventEmitter();

  stateList=[];
  tempValue={};
  initValue={};
  stateConfig=[];
  constructor() { }

  ngOnInit() {
  this._initInnerValue();

    // 根据配置信息，将状态组数据过滤，生成满足状态的集合
    // 将满足状态的内容回写

   this.stateConfig = this.getConfig();

   console.log('>>>>>>>>',this.currentValue);

  }
  private _initInnerValue() {
    if (this.tempData) {
        this.tempValue = this.tempData;
    } else {
        this.tempValue = {};
    }
    if (this.initData) {
        this.initValue = this.initData;
    } else {
        this.initValue = {};
    }
}

textConfig={
  id: '001',
  field: "ID", // 对应字段
  position: "left", // 位置 left  right  默认left
  iconConfig: {
      pre:{
          "type": "condition", //default 
          "caseValue": {
              "type": "tempValue",
              "valueName": "NODE_TYPE",
              "regular": "^1$",
              "value": ""
          }
      },
      type: '', // 环状状态
      defaultValue: '', // 默认状态
      "options": [  // 静态数据
          { label: '', color: 'magenta', value: '001', icon: 'eye' },
          { label: '', color: 'lime', value: '002', icon: 'eye-invisible' },
          { label: '', color: 'geekblue', value: '003', icon: 'question' }
      ]

  }
}

  public getConfig(){
     // 定义数组，查看当前状态是否条件验证
     // 条件验证组件，校验通过添加至集合
     let config_arry=[];
     this.config.forEach(element => {
        if(this.passConfig(element['iconConfig']['pre'])) {
          config_arry.push(element);
        } else {
          config_arry.push(element);
        }
     });
     return config_arry;

  }


  // 判断当前是否通过
  public passConfig(item?){
    let regularflag =true;
    if(item.type==='condition'){
      const reg1 = new RegExp(item.caseValue.regular);
      let regularData;
      if (item.caseValue.type) {
        if (item.caseValue.type === 'tempValue') {
          regularData = this.tempValue[item.caseValue['valueName']];
        }
        if (item.caseValue.type === 'initValue') {
          regularData = this.initValue[item.caseValue['valueName']];
        }
        if (item.caseValue.type === 'currentValue') {
          regularData = this.currentValue[item.caseValue['valueName']];
        }
        if (item.caseValue.type === 'componentValue') {
          regularData = this.currentValue[item.caseValue['valueName']];
        }
      } else {
        regularData = "";
      }
      regularflag = reg1.test(regularData);
    }
    return regularflag;
  }



  public iconStateValueChange(data?){
    this.updateValue.emit(data);
    // this.currentValue['origin']['title']='ddd';
    // this.currentValue['_title']='ddd';
    console.log('iconstateGroup==>',this.currentValue)
  }


}
