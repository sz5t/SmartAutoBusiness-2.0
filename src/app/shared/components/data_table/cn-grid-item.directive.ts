import { CnGridTagComponent } from './cn-grid-items/cn-grid-tag/cn-grid-tag.component';
import { CnProgressComponent } from './../cn-progress/cn-progress.component';
import { Directive, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CnGridSelectComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-select/cn-grid-select.component';
import { CnGridInputComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-input/cn-grid-input.component';
import { CnAttributeObjectComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-object/cn-attribute-object.component';
import { CnAttributeArrayComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-array/cn-attribute-array.component';
import { CnAttributeTableComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-table/cn-attribute-table.component';
import { CnAttributePropertyGridComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-property-grid/cn-attribute-property-grid.component';
import { CnGridSwitchComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-switch/cn-grid-switch.component';
import { CnGridRadioComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-radio/cn-grid-radio.component';
import { CnGridCheckboxComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-checkbox/cn-grid-checkbox.component';
import { CnGridGridSelectComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-grid-select/cn-grid-grid-select.component';
import { CnGridDatePickerComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-date-picker/cn-grid-date-picker.component';
import { CnGridWeekPickerComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-week-picker/cn-grid-week-picker.component';
import { CnGridCodeEditComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-code-edit/cn-grid-code-edit.component';
import { CnGridTextareaComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-textarea/cn-grid-textarea.component';
import { CnGridCustomSelectComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-custom-select/cn-grid-custom-select.component';
import { CnGridRangePickerComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-range-picker/cn-grid-range-picker.component';
import { CnGridYearPickerComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-year-picker/cn-grid-year-picker.component';
import { CnGridMonthPickerComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-month-picker/cn-grid-month-picker.component';
import { CnGridTreeSelectComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-tree-select/cn-grid-tree-select.component';
import { CnGridSelectMultipleComponent } from './cn-grid-items/cn-grid-select-multiple/cn-grid-select-multiple.component';

const components: { [type: string]: Type<any> } = {
  input: CnGridInputComponent,
  select: CnGridSelectComponent,
  AttributeObject: CnAttributeObjectComponent,
  AttributeArray: CnAttributeArrayComponent,
  AttributeTable: CnAttributeTableComponent,
  AttributePropertyGrid: CnAttributePropertyGridComponent,
  progress: CnProgressComponent,
  tag: CnGridTagComponent,
  switch:CnGridSwitchComponent,
  radio: CnGridRadioComponent,
  checkbox:  CnGridCheckboxComponent,
  gridSelect:  CnGridGridSelectComponent,
  selectMultiple:CnGridSelectMultipleComponent,
  datePicker:  CnGridDatePickerComponent,
  monthPicker:  CnGridMonthPickerComponent,
  weekPicke:  CnGridWeekPickerComponent,
  yearPicker:  CnGridYearPickerComponent,
  rangePicker: CnGridRangePickerComponent,
  customSelect:  CnGridCustomSelectComponent,
  codeEdit:  CnGridCodeEditComponent,
  textarea:  CnGridTextareaComponent,
  treeSelect: CnGridTreeSelectComponent,
  // label: ,
  // selectMultiple:,
  // datePicker:,
  // yearPicker:,
  // weekPicke:,
  // rangePicker:,
  // monthPicker:,
  // switch:,
  // radio:,
  // checkbox:,
  // treeSelect:,
  // transfer: ,
  // gridSelect:,
  // textarea: ,
  // customSelect: ,
};
@Directive({
  selector: '[CnGridItemDirective]'
})
export class CnGridItemDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public config;
  @Input() public formCascade;
  @Input() public state;
  @Input() public valueConfig;
  @Input() public rowData;
  @Input() public initData;
  @Input() public tempData;

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
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `不支持此类型的组件 (${
        this.config.type
        }).可支持的类型为: ${supportedTypes}`
      );
    }
    this.container.clear();
    const comp = this.resolver.resolveComponentFactory<any>(
      components[this.config.type]
    );

    this.component = this.container.createComponent(comp);
    this.component.instance.config = this.config;
    this.component.instance.valueConfig = this.valueConfig;
    this.component.instance.state = this.state;

    this.component.instance.rowData = this.rowData;
    this.component.instance.initData = this.initData;
    this.component.instance.tempData = this.tempData;

    // 级联数据接受 liu
    if (this.component.instance.updateValue) {
      this.component.instance.updateValue.subscribe(event => {
        this.setValue(event);
      });
    }
   //  console.log('创建表格内部组件。。。',  this.config);
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
          //  console.log('触发级联', this.formCascade, this.componentConfig);

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
        //    console.log('****formState******',this.config.field, this.formState);
        // console.log('****formState******',this.config.field, this.value,this.formState, this.config, JSON.stringify(this.formGroup.value));
        if (!components[this.config.type]) {
          const supportedTypes = Object.keys(components).join(', ');
          throw new Error(
            `不支持此类型的组件 (${
            this.config.type
            }).可支持的类型为: ${supportedTypes}`
          );
        }
        this.container.clear();
        const comp = this.resolver.resolveComponentFactory<any>(
          components[this.config.type]
        );

        this.component = this.container.createComponent(comp);
        this.component.instance.config = this.config;
        this.component.instance.valueConfig = this.valueConfig;
        this.component.instance.state = this.state;
        this.component.instance.rowData = this.rowData;
        this.component.instance.initData = this.initData;
        this.component.instance.tempData = this.tempData;
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
