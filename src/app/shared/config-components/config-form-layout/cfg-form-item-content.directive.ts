import { Directive, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CfgFormInputComponent } from '@shared/config-components/config-form-layout/cfg-form-component/cfg-form-input/cfg-form-input.component';
import { CfgFormSelectComponent } from '@shared/config-components/config-form-layout/cfg-form-component/cfg-form-select/cfg-form-select.component';

const components: { [type: string]: Type<any> } = {
  input: CfgFormInputComponent,
  select: CfgFormSelectComponent
};
@Directive({
  selector: '[CfgFormItemContent]'
})
export class CfgFormItemContentDirective implements OnInit,OnChanges {
  @Input() public config;
  @Input() public formState;
  public component: ComponentRef<any>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {

  }
  public ngOnInit() {

    let component_type = '';
    if (this.formState) {
      component_type = this.config['editor']['type'];
    } else {
      component_type = this.config['text']['type'];
    }
    if (!components[component_type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `不支持此类型的组件 (${
        component_type
        }).可支持的类型为: ${supportedTypes}`
      );
    }
    this.container.clear();
    const comp = this.resolver.resolveComponentFactory<any>(
      components[component_type]
    );
    this.component = this.container.createComponent(comp);
    this.component.instance.config = this.config;
    this.component.instance.formState = this.formState;

    console.log('创建表单内部组件。。。', this.config);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty('formState')) {
      if (!changes['formState'].firstChange) {
       // console.log('****formState******', this.config.field, this.formState);
        // console.log('****formState******',this.config.field, this.value,this.formState, this.config, JSON.stringify(this.formGroup.value));
        let component_type = '';
        if (this.formState) {
          component_type = this.config['editor']['type'];
        } else {
          component_type = this.config['text']['type'];
        }
        this.container.clear();
        if(!component_type){
          return;
        }
        if (!components[component_type]) {
          const supportedTypes = Object.keys(components).join(', ');
          throw new Error(
            `不支持此类型的组件 (${
            component_type
            }).可支持的类型为: ${supportedTypes}`
          );
        }
   
        const comp = this.resolver.resolveComponentFactory<any>(
          components[component_type]
        );
        this.component = this.container.createComponent(comp);
        this.component.instance.config = this.config;
        this.component.instance.formState = this.formState;


      }
    }

  }

}
