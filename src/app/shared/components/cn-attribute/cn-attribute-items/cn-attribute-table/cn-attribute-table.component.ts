import { Component, OnInit, Input, Inject } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnAttributeFormComponent } from '@shared/components/cn-attribute/cn-attribute-items/cn-attribute-form/cn-attribute-form.component';
@Component({
  selector: 'app-cn-attribute-table',
  templateUrl: './cn-attribute-table.component.html',
  styleUrls: ['./cn-attribute-table.component.less']
})
export class CnAttributeTableComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
  }
  listOfData=[];
  listOfData1 = [
    {
      id: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    }
  ];

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
  }

  createModal(): void {
    console.log('createModal');
    this.componentService.modalService.create({
      nzWidth: '85%',
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: '对象属性',
      //  nzContent: '',
      nzContent: CnAttributeFormComponent,
      nzComponentParams: {
       config: this.attributeConfig
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK',);
      

      }
    });
  }


}
