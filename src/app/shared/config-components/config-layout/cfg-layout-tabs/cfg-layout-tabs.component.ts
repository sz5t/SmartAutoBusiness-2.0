import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'cfg-layout-tabs,[cfg-layout-tabs]',
  templateUrl: './cfg-layout-tabs.component.html',
  styleUrls: ['./cfg-layout-tabs.component.css']
})
export class CfgLayoutTabsComponent implements OnInit {
  @Input() public config;
  @Input() public designStatus;  // 设计状态
  @Output() public updateValue = new EventEmitter();
  public bodystyle = { 'background-color': 'lightgreen' };
  public tabs = [];
  constructor(private modalService: NzModalService) { }

  public ngOnInit() {
    console.log('CfgLayoutTabsComponent->tabContent', this.config);
    this.tabs = this.config['tabContent'];
  }


  public closeTab(tab: string): void {
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '确定要删除tab页签？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk:  ()=>{
        let deleteIndex;
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i]['id'] === tab) {
            deleteIndex = i;
          }
        }
        this.tabs.splice(deleteIndex, 1);
       }
    });

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
    this.tabs.push(tab);
  }

  /**
   * delTabs 删除当前布局标签页
   */
  public delTabs() {
    // console.log('删除当前布局标签页！');
    const back = {
      operation: 'deleteTabs',
      data: {
        id: this.config.id
      }
    }
    this.updateValue.emit(back);
  }

}
