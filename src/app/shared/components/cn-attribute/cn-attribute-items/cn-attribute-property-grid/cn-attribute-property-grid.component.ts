import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-attribute-property-grid',
  templateUrl: './cn-attribute-property-grid.component.html',
  styleUrls: ['./cn-attribute-property-grid.component.less']
})
export class CnAttributePropertyGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mapOfExpandData: { [key: string]: boolean } = {};
  mapOfExpandData1: { [key: string]: boolean } = {};
  listOfData = [
    {
      id: 1,
      name: '测试属性1',
      age: 32,
      expand: false,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
      id: 2,
      name: '测试属性2',
      age: 42,
      expand: false,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    },
    {
      id: 3,
      name: '测试属性3',
      age: 32,
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    }
  ];
  listOfData1 = [
    {
      id: 1,
      name: '测试属性11',
      age: 32,
      expand: false,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
      id: 2,
      name: '测试属性12',
      age: 42,
      expand: false,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    },
    {
      id: 3,
      name: '测试属性13',
      age: 32,
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    }
  ];

}
