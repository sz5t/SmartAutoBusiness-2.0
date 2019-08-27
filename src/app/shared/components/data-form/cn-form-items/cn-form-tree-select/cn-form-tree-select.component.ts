import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-form-tree-select',
  templateUrl: './cn-form-tree-select.component.html',
  styleUrls: ['./cn-form-tree-select.component.less']
})
export class CnFormTreeSelectComponent implements OnInit {

  constructor() { }
  expandKeys = ['100', '1001'];
  value: string;
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  valueChange($event: string): void {
    console.log($event);
  }

  ngOnInit(): void {
    // mock async
    setTimeout(() => {
      this.value = '1001';
    }, 1000);
  }


  /**
   * load
   */
  public load() {



    
  }

      // 树加载
    // 定义树结构
    // id  name parentid  =》 指定字段
    // 树类型（异步树、静态树）
    // 异步树-》Expand 节点展开-》数据加载，可扩充条件，加载不同数据，异构树
   // 下拉树，值展示 根据component 取出对象值

}
