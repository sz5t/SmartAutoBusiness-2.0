import { Directive, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef, Input, OnInit } from '@angular/core';
import { CfgFormInputComponent } from '@shared/config-components/config-form-layout/cfg-form-component/cfg-form-input/cfg-form-input.component';
import { CfgFormSelectComponent } from '@shared/config-components/config-form-layout/cfg-form-component/cfg-form-select/cfg-form-select.component';

const components: { [type: string]: Type<any> } = {
   input: CfgFormInputComponent,
   select: CfgFormSelectComponent
};
@Directive({
  selector: '[CfgFormItemContent]'
})
export class CfgFormItemContentDirective  implements OnInit {
  @Input() public config;
  public component: ComponentRef<any>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {

  }
  public ngOnInit() {
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

    console.log('创建表单内部组件。。。', this.config);
  }

}
