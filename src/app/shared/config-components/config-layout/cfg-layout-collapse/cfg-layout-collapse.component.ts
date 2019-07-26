import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'cfg-layout-collapse,[cfg-layout-collapse]',
  templateUrl: './cfg-layout-collapse.component.html',
  styleUrls: ['./cfg-layout-collapse.component.css']
})
export class CfgLayoutCollapseComponent implements OnInit {
  @Input() public config;
  @Input() public designStatus;  // 设计状态
  @Output() public updateValue = new EventEmitter();
  public isCollapsed = false;
  public panels = [
  ];
  constructor() { }

  public ngOnInit() {
    this.panels = this.config['collapseContent'] ;

    // console.log('Collapsed****:' , this.config);
  }


  /**
   * deleteCollapse 删除折叠面板
   */
  public deleteCollapse() {
    // console.log('删除当前布局标签页！');
    const back = {
      operation: 'deleteCollapse',
      data: {
        id: this.config.id
      }
    }
    this.updateValue.emit(back);
  }

  /**
   * addCollapsePanel 给折叠面板添加面板
   */
  public addCollapsePanel() {
    const fieldIdentity = CommonUtils.uuID(6);
    const fieldIdentitytab = CommonUtils.uuID(6);
    const title = '布局' + fieldIdentity;
    const titletab = '面板' + fieldIdentitytab;
    const tab = {
      id: fieldIdentity,
      type: 'collapsePanel',
      title: titletab,
      active: true,
      disabled: false,
      container: "layout",
      layout: {
        id: fieldIdentity,
        type: 'layout',
        title: title,
        rows: [],
        customlayout: [],
        container: 'rows'
      }

    }
    this.panels.push(tab);
  }

}
