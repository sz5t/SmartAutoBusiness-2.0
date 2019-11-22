import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { CnAttributeFormComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-form/cn-attribute-form.component';
import { CnAttributeTableComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-table/cn-attribute-table.component';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CfgAttributeFormComponent } from '@shared/config-components/config-attribute/cfg-attribute-item/cfg-attribute-form/cfg-attribute-form.component';
import { CfgAttributeTableComponent } from '@shared/config-components/config-attribute/cfg-attribute-item/cfg-attribute-table/cfg-attribute-table.component';

@Component({
  selector: 'cfg-attribute-table-form,[cfg-attribute-table-form]',
  templateUrl: './cfg-attribute-table-form.component.html',
  styleUrls: ['./cfg-attribute-table-form.component.less']
})
export class CfgAttributeTableFormComponent  extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  @Input() public changeValue
  @Input() public initData;
  @ViewChild('AttributeForm',{ static: false})  public AttributeForm: CfgAttributeFormComponent;
  @ViewChild('AttributeTable',{ static: false})  public AttributeTable: CfgAttributeTableComponent;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.tempValue ={}
  }

  ngOnInit() {
    this.setChangeValue(this.changeValue);
    console.log("table__form",this.config,this.initData, this.attributeConfig);
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

  changeData_formTotable(d?){
    this. AttributeTable.changeData(d);
  }

  changeData(d){
    // 表格选中行
    console.log('选中行',d);
    this. AttributeForm.changeData(d);
  }

}
