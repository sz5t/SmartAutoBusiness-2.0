import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cn-attribute-table-form,[cn-attribute-table-form]',
  templateUrl: './cn-attribute-table-form.component.html',
  styleUrls: ['./cn-attribute-table-form.component.less']
})
export class CnAttributeTableFormComponent implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  constructor() { }

  ngOnInit() {
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

}
