import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
  selector: 'cfg-tree',
  templateUrl: './cfg-tree.component.html',
  styleUrls: ['./cfg-tree.component.less']
})
export class CfgTreeComponent implements OnInit ,OnChanges{
  @Input() public dataList;
  constructor() { }
  searchValue = '';

  nodes = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
  ngOnInit() {
    if(this.dataList){
      this.nodes = this.listToAsyncTreeData(this.dataList,'NULL');
    }
    console.log('shu:',this.dataList, this.nodes);
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log('****ngOnChanges******', changes, this.formGroup)
     // ngOnChanges只有在输入值改变的时候才会触发，
     // 如果输入值(@Input)是一个对象，改变对象内的属性的话是不会触发ngOnChanges的。
     // 部分级联需要此处中转，主要是参数等，取值赋值，隐藏显示等功能需要form表单处理。
     if (changes.hasOwnProperty('dataList')) {
      if(this.dataList){
        const d = JSON.parse(JSON.stringify(this.dataList));
        this.nodes = this.listToAsyncTreeData(d,'NULL');
      }
     }
     console.log('shuChanges:',this.dataList, this.nodes);
  }

  public listToAsyncTreeData(data, parentid) {
    const result = [];
    let temp;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId === parentid) {
        temp = this.listToAsyncTreeData(data, data[i].id);
        if (temp.length > 0) {
          data[i]['children'] = temp;
          data[i]['isLeaf'] = false;
        } else {
          data[i]['isLeaf'] = true;
        }
        data[i].level = '';
        data[i]['expanded'] = true;
        data[i]['key'] = data[i]['id'];
        result.push(data[i]);
      }
    }
    return result;
  }

}
