import { Directive, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CnGridSelectComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-select/cn-grid-select.component';
import { CnGridInputComponent } from '@shared/components/data_table/cn-grid-items/cn-grid-input/cn-grid-input.component';
import { CnAttributeObjectComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-object/cn-attribute-object.component';
import { CnAttributeArrayComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-array/cn-attribute-array.component';
import { CnAttributeTableComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-table/cn-attribute-table.component';
import { CnAttributePropertyGridComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-property-grid/cn-attribute-property-grid.component';
import { CnAttributeTableFormComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-table-form/cn-attribute-table-form.component';

const components: { [type: string]: Type<any> } = {
  input: CnGridInputComponent,
  select: CnGridSelectComponent,
  AttributeObject:CnAttributeObjectComponent,
  AttributeArray:  CnAttributeArrayComponent,
  AttributeTable:CnAttributeTableComponent,
  AttributePropertyGrid:CnAttributePropertyGridComponent,
  AttributeTableForm:CnAttributeTableFormComponent
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
  selector: '[CnAttributeItemDirective]'
})
export class CnAttributeItemDirective implements OnInit, OnChanges,OnDestroy {
  @Input() public config;
  @Input() public attributeConfig;
  @Input() public formCascade;
  @Input() public state;
  @Input() public valueConfig;
  @Input() public typeConfig;
  @Input() public changeValue;
  @Input() public attributeType;


  @Output() public updateValue = new EventEmitter();
  @Output() public execOperation = new EventEmitter();
  public component: ComponentRef<any>;
  public componentConfig;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {

  }

  
  public ngOnInit() {
   //  console.log('**********', this.valueConfig)
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
    this.component.instance.attributeConfig = this.attributeConfig;
    this.component.instance.typeConfig = this.typeConfig;
    this.component.instance.changeValue = this.changeValue;
    this.component.instance.attributeType = this.attributeType;
    
    
    // 级联数据接受 liu
    if (this.component.instance.updateValue) {
      this.component.instance.updateValue.subscribe(event => {
        this.setValue(event);
      });
    }
    if (this.component.instance.execOperation) {
      this.component.instance.execOperation.subscribe(event => {
        this.setOperation(event);
      });
    }

    
    // console.log('创建表单内部组件。。。', _config);
  }

  // 组件将值写回、级联数据-》回写 
  public setValue(data?) {
    this.updateValue.emit(data);
  }
  public setOperation(data?) {
    this.execOperation.emit(data);
  }

  ngOnChanges(changes: SimpleChanges) {
   // console.log('****ngOnChanges******', changes, this.valueConfig)
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
        this.component.instance.attributeConfig = this.attributeConfig;
        this.component.instance.typeConfig = this.typeConfig;
        this.component.instance.attributeType = this.attributeType;
        // 级联数据接受 liu
        if (this.component.instance.updateValue) {
          this.component.instance.updateValue.subscribe(event => {
            this.setValue(event);
          });
        }
        if (this.component.instance.execOperation) {
          this.component.instance.execOperation.subscribe(event => {
            this.setOperation(event);
          });
        }
       // if(this.config.field ==='inputname4')
       // this.formGroup.setValue(this.value);
      }
    }
    if (changes.hasOwnProperty('valueConfig')) {
      if (!changes['valueConfig'].firstChange) { // 处理后续变化，初始变化不处理
        if (this.valueConfig) {
          //  console.log('触发级联', this.formCascade, this.componentConfig);

        }
  
        this.component.instance.valueConfig = this.valueConfig;
        this.component.instance.remoteOperation();
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
