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
  public editTitleState = false;
  constructor(private modalService: NzModalService) { }

  public ngOnInit() {
    console.log('CfgLayoutTabsComponent->tabContent', this.config);
    this.tabs = this.config['tabContent'];
    this.attribute_config = JSON.parse(JSON.stringify(this.config));
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
    const fieldIdentity = CommonUtils.uuID(36);
    const fieldIdentitytab = CommonUtils.uuID(36);
    const fieldIdentitytitle = CommonUtils.uuID(6);
    const title = '布局';
    const titletab = '标签' + fieldIdentitytitle;
    const tab = {
      id: fieldIdentitytab,
      type: 'tab',
      title: titletab,
      container: "layout",
      layout: {
        id: fieldIdentity,
        type: 'layout',
        title,
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

  attribute_config;
  attribute_isVisible =false;

  public openAttribute() {

    this.attribute_config = JSON.parse(JSON.stringify(this.config));
    this.attribute_isVisible = true;

  }

  public attribute_handleCancel() {
    this.attribute_isVisible = false;
  }
  /**
   * attribute_handleOk
   */
  public attribute_handleOk() {
    this.config['tabContent'].forEach(tab => {
      this.attribute_config['tabContent'].forEach(tabitem => {
        if(tab.id ===tabitem.id ){
          tab.title = tabitem.title;
        }
      })
      
    });
    this.config['title'] =  this.attribute_config['title'];
    
    this.attribute_isVisible = false;
  }

  public editTitle(e?) {
    this.editTitleState = true;
  }

  public onblurtitle(e?, type?) {
      this.editTitleState = false;
      event.stopPropagation();
  }
  public onKeyPress(e?, type?) {
    if (e.code === 'Enter') {
      this.editTitleState = false;
    }
}

}
