import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';

@Component({
  selector: 'app-cn-form-checkbox-group',
  templateUrl: './cn-form-checkbox-group.component.html',
  styleUrls: ['./cn-form-checkbox-group.component.less']
})
export class CnFormCheckboxGroupComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Input() public initData; 
  @Input() tempData;
  @Output() public updateValue = new EventEmitter();
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
    if (this.initData) {
      this.initValue = this.initData;
    } else {
      this.initValue = {};
    }
    if (this.tempData) {
      this.tempValue = this.tempData;
    } else {
      this.tempValue = {};
    }
  }

  /**
   * 响应级联
   * @param c 
   */
  public cascadeAnalysis(c?) {


  }



}
