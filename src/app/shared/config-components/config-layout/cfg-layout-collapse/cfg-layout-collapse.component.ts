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
  public editTitleState = false;
  public panels = [
  ];
  constructor() { }

  public ngOnInit() {
    this.panels = this.config['collapseContent'] ;
    this.attribute_config = JSON.parse(JSON.stringify(this.config));
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
    const fieldIdentity = CommonUtils.uuID(36);
    const fieldIdentitytab = CommonUtils.uuID(36);
    const fieldIdentitytabtitle = CommonUtils.uuID(6);
    const title = '布局';
    const titletab = '面板' + fieldIdentitytabtitle;
    const tab = {
      id: fieldIdentitytab,
      type: 'collapsePanel',
      title: titletab,
      active: true,
      disabled: false,
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
    this.panels.push(tab);
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
    this.config['collapseContent'].forEach(tab => {
      this.attribute_config['collapseContent'].forEach(tabitem => {
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
