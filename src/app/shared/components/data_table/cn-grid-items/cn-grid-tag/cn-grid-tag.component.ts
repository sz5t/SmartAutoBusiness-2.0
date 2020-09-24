import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cn-grid-tag',
  templateUrl: './cn-grid-tag.component.html'
})
export class CnGridTagComponent implements OnInit {
  @Input() public config;
  @Input() public valueConfig;
  @Input() public initData;
  @Input() public rowData;
  @Input() public tempData;
  public text: string;
  public color: string;
  constructor() { }
  ngOnInit() {
    if (this.valueConfig) {
      this.text = this.valueConfig.value[this.config.field];
      this._colorMappingResolve();
    }
  }

  private _colorMappingResolve() {
    if (this.config.dataMapping) {
      this.config.dataMapping.forEach(d => {
        const val = this.valueConfig.value[d['field']];
        if (val && (d.value === val)) {
          this.color = d.color;
          if(d.valueText){
            this.text = d.valueText;
          }
          return false;
        }
      })
    }
  }


  getColor() {

    let _viewId;
    // 循环 映射条件
    try {
      this.config.mapping.forEach(item => {
        let regularflag = true;
        if (item.caseValue && item.type === "condition") {
          const reg1 = new RegExp(item.caseValue.regular);
          let regularData;
          if (item.caseValue.type) {
            if (item.caseValue.type === 'tempValue') {
              regularData = this.tempData[item.caseValue['valueName']];
            }
            if (item.caseValue.type === 'initValue') {
              regularData = this.initData[item.caseValue['valueName']];
            }
            if (item.caseValue.type === 'rowValue') {
              regularData = this.rowData[item.caseValue['valueName']];
            }

          } else {
            regularData = "";
          }
          regularflag = reg1.test(regularData);
          // 满足正则表达 
          if (regularflag) {
            // 返回 满足条件视图
            _viewId = item.color;
            throw new Error()
          }
        } else {
          _viewId = item.color;
          throw new Error()
          // 无条件，直接返回 视图
        }
      });
    } catch (e) {
      // console.log(e)
    }

    return _viewId;
  }

  public cascadeAnalysis (c?){

  }
}
