import { CnFormSearchSelectComponent } from './cn-form-search-items/cn-form-search-select/cn-form-search-select.component';
import { Directive, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CnFormInputComponent } from '@shared/components/data-form/cn-form-items/cn-form-input/cn-form-input.component';
import { FormGroup } from '@angular/forms';
import { CnFormSelectComponent } from '@shared/components/data-form/cn-form-items/cn-form-select/cn-form-select.component';
import { CnFormLabelComponent } from '@shared/components/data-form/cn-form-items/cn-form-label/cn-form-label.component';
import { CnFormSelectMultipleComponent } from '@shared/components/data-form/cn-form-items/cn-form-select-multiple/cn-form-select-multiple.component';
import { CnFormRangePickerComponent } from '@shared/components/data-form/cn-form-items/cn-form-range-picker/cn-form-range-picker.component';
import { CnFormWeekPickerComponent } from '@shared/components/data-form/cn-form-items/cn-form-week-picker/cn-form-week-picker.component';
import { CnFormYearPickerComponent } from '@shared/components/data-form/cn-form-items/cn-form-year-picker/cn-form-year-picker.component';
import { CnFormDatePickerComponent } from '@shared/components/data-form/cn-form-items/cn-form-date-picker/cn-form-date-picker.component';
import { CnFormMonthPickerComponent } from '@shared/components/data-form/cn-form-items/cn-form-month-picker/cn-form-month-picker.component';
import { CnFormSwitchComponent } from '@shared/components/data-form/cn-form-items/cn-form-switch/cn-form-switch.component';
import { CnFormRadioComponent } from '@shared/components/data-form/cn-form-items/cn-form-radio/cn-form-radio.component';
import { CnFormCheckboxComponent } from '@shared/components/data-form/cn-form-items/cn-form-checkbox/cn-form-checkbox.component';
import { CnFormTreeSelectComponent } from '@shared/components/data-form/cn-form-items/cn-form-tree-select/cn-form-tree-select.component';
import { CnFormTransferComponent } from '@shared/components/data-form/cn-form-items/cn-form-transfer/cn-form-transfer.component';
import { CnFormTextareaComponent } from '@shared/components/data-form/cn-form-items/cn-form-textarea/cn-form-textarea.component';
import { CnFormGridSelectComponent } from '@shared/components/data-form/cn-form-items/cn-form-grid-select/cn-form-grid-select.component';
import { CnFormCustomSelectComponent } from '@shared/components/data-form/cn-form-items/cn-form-custom-select/cn-form-custom-select.component';
import { CnFormCodeEditComponent } from '@shared/components/data-form/cn-form-items/cn-form-code-edit/cn-form-code-edit.component';
import { CnFormStaticGridComponent } from './cn-form-items/cn-form-static-grid/cn-form-static-grid.component';
import { CnFormButtonComponent } from './cn-form-items/cn-form-button/cn-form-button.component';

const components: { [type: string]: Type<any> } = {
  input: CnFormInputComponent,
  select: CnFormSelectComponent,
  label: CnFormLabelComponent,
  selectMultiple: CnFormSelectMultipleComponent,
  datePicker: CnFormDatePickerComponent,
  yearPicker: CnFormYearPickerComponent,
  weekPicke: CnFormWeekPickerComponent,
  rangePicker: CnFormRangePickerComponent,
  monthPicker: CnFormMonthPickerComponent,
  switch: CnFormSwitchComponent,
  radio: CnFormRadioComponent,
  checkbox: CnFormCheckboxComponent,
  treeSelect: CnFormTreeSelectComponent,
  transfer: CnFormTransferComponent,
  gridSelect: CnFormGridSelectComponent,
  textarea: CnFormTextareaComponent,
  customSelect: CnFormCustomSelectComponent,
  codeEdit: CnFormCodeEditComponent,
  staticGrid: CnFormStaticGridComponent,
  button: CnFormButtonComponent,
  searchSelect: CnFormSearchSelectComponent
};
@Directive({
  selector: '[CnFormItemDirective]'
})
export class CnFormItemDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Input() public formCascade;
  @Input() public formState;
  // @Input() public value;

  @Output() public updateValue = new EventEmitter();
  public component: ComponentRef<any>;
  public componentConfig;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {

  }
  public ngOnInit() {
    // console.log('**********', this.config, this.formCascade)
    let _config
    if (this.config.state === 'text') {
      _config = JSON.parse(JSON.stringify(this.config.text));
    }
    if (this.config.state === 'edit') {
      _config = JSON.parse(JSON.stringify(this.config.editor));
    }
    _config['config'] = JSON.parse(JSON.stringify(this.config));
    this.componentConfig = _config;
    if (!components[_config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `不支持此类型的组件 (${
        _config.type
        }).可支持的类型为: ${supportedTypes}`
      );
    }
    this.container.clear();
    const comp = this.resolver.resolveComponentFactory<any>(
      components[_config.type]
    );

    this.component = this.container.createComponent(comp);
    this.component.instance.formGroup = this.formGroup;
    this.component.instance.config = _config;
    // 级联数据接受 liu
    if (this.component.instance.updateValue) {
      this.component.instance.updateValue.subscribe(event => {
        this.setValue(event);
      });
    }


    console.log('创建表单内部组件。。。-----------------------------', this.formGroup);
  }

  // 组件将值写回、级联数据-》回写 
  public setValue(data?) {
    this.updateValue.emit(data);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('****ngOnChanges******', changes, this.formGroup)
    // ngOnChanges只有在输入值改变的时候才会触发，
    // 如果输入值(@Input)是一个对象，改变对象内的属性的话是不会触发ngOnChanges的。
    // 部分级联需要此处中转，主要是参数等，取值赋值，隐藏显示等功能需要form表单处理。
    if (changes.hasOwnProperty('formCascade')) {
      if (!changes['formCascade'].firstChange) { // 处理后续变化，初始变化不处理
        if (this.formCascade) {
          console.log('触发级联', this.formCascade, this.componentConfig);

        }
        //  console.log('****formCascade******', this.formCascade, this.config.field);
        // console.log('ngOnChanges中inputVal变更前值为：' + changes['formCascade'].previousValue);
        //  console.log('ngOnChanges中inputVal变更后值为：' + changes['formCascade'].currentValue);
        //  console.log('ngOnChanges中inputVal是否是一次改变：' + changes['formCascade'].firstChange);
        // 将当前级联参数传递到相应的应答组件内部
        this.component.instance.cascadeAnalysis(this.formCascade);
      }
    }
    if (changes.hasOwnProperty('formState')) {
      if (!changes['formState'].firstChange) {
        console.log('****formState******', this.config.field, this.formState);
        // console.log('****formState******',this.config.field, this.value,this.formState, this.config, JSON.stringify(this.formGroup.value));
        let _config
        if (this.config.state === 'text') {
          _config = JSON.parse(JSON.stringify(this.config.text));
        }
        if (this.config.state === 'edit') {
          _config = JSON.parse(JSON.stringify(this.config.editor));
        }
        _config['config'] = JSON.parse(JSON.stringify(this.config));
        this.componentConfig = _config;
        if (!components[_config.type]) {
          const supportedTypes = Object.keys(components).join(', ');
          throw new Error(
            `不支持此类型的组件 (${
            _config.type
            }).可支持的类型为: ${supportedTypes}`
          );
        }
        this.container.clear();
        const comp = this.resolver.resolveComponentFactory<any>(
          components[_config.type]
        );

        this.component = this.container.createComponent(comp);
        this.component.instance.formGroup = this.formGroup;
        this.component.instance.config = _config;
        // 级联数据接受 liu
        if (this.component.instance.updateValue) {
          this.component.instance.updateValue.subscribe(event => {
            this.setValue(event);
          });
        }
        // if(this.config.field ==='inputname4')
        // this.formGroup.setValue(this.value);
      }
    }

  }
  // Angular定义SimpleChanges类构造函数三个参数分别为上一个值，当前值和是否第一次变化(firstChange: boolean)，这些changes都可以调用。

  public ngOnDestroy() {
    if (this.component) {
      this.component.destroy();
    }
  }

}
