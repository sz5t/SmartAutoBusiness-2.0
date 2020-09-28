import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-grid-span',
  templateUrl: './cn-grid-span.component.html',
  styleUrls: ['./cn-grid-span.component.less']
})
export class CnGridSpanComponent implements OnInit {
  @Input() public config;
  @Input() public valueConfig;
  @Input() public initData;
  @Input() public rowData;
  @Input() public tempData;
  text;
  
  public isShow = true;
  public showAll = false;
  public showLable;
  public showShortLable;
  public showTitle;

  constructor() { }

  ngOnInit() {
    if (this.valueConfig) {
      this.text = this.valueConfig.value[this.config.field];
      this.initText(this.text);
      // this._colorMappingResolve();
    }
  }

  public initText(v?){
    if (this.config.formatConfig) {
     
      const  formatConfig = this.config.formatConfig
        let regularData =v;
        if (formatConfig.type) {
          if (formatConfig.type === 'row') {
            if (this.rowData) {
              regularData = this.rowData[formatConfig['valueName']];
            }
          }
        }
        this.showTitle = regularData;
        this.showLable = regularData;
        const regularflag = formatConfig.responseConfig.substrlength ? formatConfig.responseConfig.substrlength : 50;
        if (regularData) {
          if (regularData.length <= regularflag) {
            this.isShow = true;
            return true;
          } else {
            this.isShow = false;
            this.showShortLable = regularData.substring(0, regularflag);
            return true;
          }
        }


     


    }
  }

  // 展开文本
  public openSapn() {
    this.showAll = !this.showAll;

  }

  // 收缩文本
  public closeSapn() {
    this.showAll = !this.showAll;

  }
  public cascadeAnalysis (c?){

  }

}
