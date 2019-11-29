import { Component, OnInit, Input, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CfgAttributeTableFormComponent } from '@shared/config-components/config-attribute/cfg-attribute-item/cfg-attribute-table-form/cfg-attribute-table-form.component';
@Component({
  selector: 'cfg-attribute-array,[cfg-attribute-array]',
  templateUrl: './cfg-attribute-array.component.html',
  styleUrls: ['./cfg-attribute-array.component.less']
})
export class CfgAttributeArrayComponent extends CnComponentBase   implements OnInit {
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
    this.setChangeValue(this.changeValue);
  }
  public setChangeValue(ChangeValues?) {
    // console.log('changeValue', ChangeValues);
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
    console.log('createModal弹出数组配置',this.initData,this. attributeConfig);
    this.componentService.modalService.create({
      nzWidth: '85%',
      nzMaskClosable:false,
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: '组件数组属性',
      nzContent: CfgAttributeTableFormComponent,
      nzComponentParams: {
        config: this. attributeConfig,
        changeValue:this.changeValue,
        initData:this.initData
      //  attributeType:1,
      //  loadConfigValue:this.loadConfigValue
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK',);
      

      }
    });
  }
}
