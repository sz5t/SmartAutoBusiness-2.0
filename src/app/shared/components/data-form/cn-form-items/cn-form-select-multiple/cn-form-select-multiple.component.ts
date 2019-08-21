import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';

@Component({
  selector: 'app-cn-form-select-multiple',
  templateUrl: './cn-form-select-multiple.component.html',
  styleUrls: ['./cn-form-select-multiple.component.less']
})
export class CnFormSelectMultipleComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  public selectedValue;
  public selectOptions = [];
  public selectItems = [];
  public cascadeOptions:any;
  public myControl;
  public value;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }


  listOfOption: Array<{ label: string; value: string }> = [];
  listOfSelectedValue = ['a10', 'c12'];

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

  /**
   * 值变化
   * @param v 
   */
  public  valueChange(v?) {
    console.log('多选值变化',v);
  }

/**
 * 级联分析
 * @param c 
 */
  public cascadeAnalysis(c?) {

    // 分类完善信息，此处完善的信息为 异步参数处理
    // cascadeValue

    console.log('级联具体小组件接受=》',c );
  }

}
