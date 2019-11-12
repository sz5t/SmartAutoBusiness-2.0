import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { CnAttributeFormComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-form/cn-attribute-form.component';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';

@Component({
  selector: 'cn-attribute-table-form,[cn-attribute-table-form]',
  templateUrl: './cn-attribute-table-form.component.html',
  styleUrls: ['./cn-attribute-table-form.component.less']
})
export class CnAttributeTableFormComponent  extends CnComponentBase  implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  @Input() public changeValue;

  @ViewChild('AttributeForm',{ static: false})  public AttributeForm: CnAttributeFormComponent;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.tempValue ={}
  }

  ngOnInit() {
    this.setChangeValue(this.cacheValue);
    console.log("table__form", this.attributeConfig);
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

  col = 8;
  id = -1;

  onResize({ col }: { col: number }): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.col = col;
    });
  }

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];


  /**
   * changeData
   */
  public changeData(d?) {

    this. AttributeForm.changData(d);

  }


}
