import { Component, OnInit, Inject, Input } from '@angular/core';
import { CnPageComponent } from '@shared/components/cn-page/cn-page.component';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { CnAttributeFormComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-form/cn-attribute-form.component';

@Component({
  selector: 'app-cn-attribute-array',
  templateUrl: './cn-attribute-array.component.html',
  styleUrls: ['./cn-attribute-array.component.less']
})
export class CnAttributeArrayComponent extends CnComponentBase  implements OnInit {
  @Input() public attributeConfig;

  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
  }



  createModal(): void {
    console.log('createModal');
    this.componentService.modalService.create({
      nzWidth: '85%',
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: '组件数组属性',
      //  nzContent: '',
      nzContent: CnAttributeFormComponent,
      nzComponentParams: {
        config: this. attributeConfig
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK',);
      

      }
    });
  }


  public arrayConfig={
    objectJson:{

    }
  }

}
