import { Component, OnInit, Input, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CfgAttributeFormComponent } from '@shared/config-components/config-attribute/cfg-attribute-item/cfg-attribute-form/cfg-attribute-form.component';

@Component({
  selector: 'app-cfg-attribute-object',
  templateUrl: './cfg-attribute-object.component.html',
  styleUrls: ['./cfg-attribute-object.component.less']
})
export class CfgAttributeObjectComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  @Input() public initData;
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
      nzContent: CfgAttributeFormComponent,
      nzComponentParams: {
        config: this.attributeConfig,
        changeValue:this.changeValue,
        initData:this.initData,
        attributeType:1
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK');
      

      }
    });
  }

}
