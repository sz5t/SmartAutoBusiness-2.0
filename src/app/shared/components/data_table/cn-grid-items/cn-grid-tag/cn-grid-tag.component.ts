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
          return false;
        }
      })
    }
  }

  public cascadeAnalysis (c?){

  }
}
