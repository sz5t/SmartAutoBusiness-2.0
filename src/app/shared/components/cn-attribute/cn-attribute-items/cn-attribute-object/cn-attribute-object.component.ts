import { Component, OnInit, Inject, Input } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnPageComponent } from '@shared/components/cn-page/cn-page.component';
import { CnAttributeFormComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-form/cn-attribute-form.component';

@Component({
  selector: 'app-cn-attribute-object',
  templateUrl: './cn-attribute-object.component.html',
  styleUrls: ['./cn-attribute-object.component.less']
})
export class CnAttributeObjectComponent extends CnComponentBase implements OnInit {
  @Input() public attributeConfig;
  @Input() public changeValue;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.tempValue ={}
  }

  ngOnInit() {
    this.setChangeValue(this.cacheValue);
  }
  public setChangeValue(ChangeValues?) {
    console.log('changeValue', ChangeValues);
    // const ChangeValues = [{ name: "", value: "", valueTo: "" }];
    if (ChangeValues && ChangeValues.length > 0) {
      ChangeValues.forEach(p => {
        switch (p.valueTo) {
          case 'tempValue':
            this.tempValue[p.name] = p.value;
            break;
          case 'initValue':
            this.initValue[p.name] = p.value;
            break;
          case 'staticComponentValue':
            this.staticComponentValue[p.name] = p.value;
            break;
  
        }
      });
    }
  
  }


  
  createModal(): void {
    console.log('createModal');
    this.componentService.modalService.create({
      nzWidth: '85%',
      nzMaskClosable:false,
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: '组件对象属性',
      //  nzContent: '',
      nzContent: CnAttributeFormComponent,
      nzComponentParams: {
        config: this.attributeConfig,
        changeValue:this.changeValue
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK');
      

      }
    });
  }


}
