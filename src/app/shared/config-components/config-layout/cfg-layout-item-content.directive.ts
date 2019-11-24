import { Directive, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef, Input, OnInit } from '@angular/core';
import { CfgFormInputComponent } from '@shared/config-components/config-form-layout/cfg-form-component/cfg-form-input/cfg-form-input.component';
import { CfgFormSelectComponent } from '@shared/config-components/config-form-layout/cfg-form-component/cfg-form-select/cfg-form-select.component';
import { CfgDataTableComponent } from '@shared/config-components/config-layout/cfg-layout-component/cfg-data-table/cfg-data-table.component';
import { CfgTreeComponent } from '@shared/config-components/config-layout/cfg-layout-component/cfg-tree/cfg-tree.component';
import { CfgFormComponent } from '@shared/config-components/config-layout/cfg-layout-component/cfg-form/cfg-form.component';
import { CfgCalendarComponent } from '@shared/config-components/config-layout/cfg-layout-component/cfg-calendar/cfg-calendar.component';
import { CfgCarouselComponent } from '@shared/config-components/config-layout/cfg-layout-component/cfg-carousel/cfg-carousel.component';
import { CfgToolbarComponent } from '@shared/config-components/config-layout/cfg-layout-component/cfg-toolbar/cfg-toolbar.component';

const components: { [type: string]: Type<any> } = {
   input: CfgFormInputComponent,
   select: CfgFormSelectComponent,
   cnDataTable:CfgDataTableComponent,
   cnTree: CfgTreeComponent,
   cnForm:CfgFormComponent,
   calendar:CfgCalendarComponent,
   carousel:CfgCarouselComponent,
   cnToolbar:CfgToolbarComponent
};
@Directive({
  selector: '[CfgLayoutItemContent]'
})
export class CfgLayoutItemContentDirective  implements OnInit {
  @Input() public config;
  public component: ComponentRef<any>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {

  }
  public ngOnInit() {
    if (!components[this.config.container]) {
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

    console.log('创建布局内部组件。。。', this.config);
  }

}
