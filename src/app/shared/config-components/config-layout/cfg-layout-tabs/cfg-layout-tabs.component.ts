import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'cfg-layout-tabs,[cfg-layout-tabs]',
  templateUrl: './cfg-layout-tabs.component.html',
  styleUrls: ['./cfg-layout-tabs.component.css']
})
export class CfgLayoutTabsComponent implements OnInit {
  @Input() public config;
  @Output() public updateValue = new EventEmitter();
  public bodystyle = { 'background-color': 'lightgreen' };
  public tabs = [];
  constructor() { }

  public ngOnInit() {
    this.tabs = this.config['tabConent'] ;
  }


  public closeTab(tab: string): void {
    let deleteIndex;
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i]['id'] === tab) {
        deleteIndex = i;
      }
    }
    this.tabs.splice(deleteIndex, 1);
  }

  public newTab(): void {
    const fieldIdentity = CommonUtils.uuID(6);
    const fieldIdentitytab = CommonUtils.uuID(6);
    const title = '布局' + fieldIdentity;
    const titletab = '标签' + fieldIdentitytab;
    const tab = {
      id: fieldIdentity,
      type: 'tab',
      title: titletab,
      layout: {
        id: fieldIdentity,
        type: 'layout',
        title: title,
        rows: []
      }

    }
    this.tabs.push(tab);
  }

  /**
   * delTabs 删除当前布局标签页
   */
  public delTabs() {
    console.log('删除当前布局标签页！');
    const back = {
      operation: 'deleteTabs',
      data: {
        id: this.config.id
      }
    }
    this.updateValue.emit(back);
  }

}
