import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'cfg-layout,[cfg-layout]',
  templateUrl: './cfg-layout.component.html',
  styleUrls: ['./cfg-layout.component.css']
})
export class CfgLayoutComponent implements OnInit {
  @Input() public config;      // 配置信息
  @Input() public designStatus;  // 设计状态
  @Output() public updateValue = new EventEmitter();
  @Output() public updateLayoutValue = new EventEmitter();
  @Input() public configStatus;      // 配置信息
  @Input() public configJsonStatus;      // 配置信息

  public layoutType = true;

  public configType = true;
  public editTitleState = false;
  public rows = [
  ];
  public customlayout = [
  ];
  constructor() { }

  public ngOnInit() {

    // 控制设计步骤下的设计操作
    if (this.designStatus) {

    } else {

    }
    // console.log('===>>>', ss,  ss.localResourceUrl);
    console.log('布局ngOnInit',this.config);

      const fieldIdentity = CommonUtils.uuID(36);
      const title = '布局';
      if (!this.config) {
        this.config = {
          id: fieldIdentity,
          type: 'layout',
          title,
          container: 'rows',
          rows: this.rows,
          customlayout: this.customlayout
        }
      } else {
        if (this.config.container) {
          if (this.config.container === 'rows') {
            this.layoutType = true;
          } else {
            this.layoutType = false;
          }
        }
        this.configType = false;
        this.rows = this.config.rows;
        this.customlayout = this.config.customlayout
      }
      if (this.config.rows.length < 1) {
        this.addRow();
      }
    


    if (this.configStatus) {
      this.configType = true;
    }

  }

  /**
   * addRow
   */
  public addRow() {
    const fieldIdentity = CommonUtils.uuID(36);
    const row = {
      cols: []
    };
    const title = '行';
    row['id'] = fieldIdentity;
    row['type'] = 'row';
    row['title'] = title;
    row['container'] = 'cols';
    // console.log('新增行信息', row);
    this.rows.push(row);
    // console.log('当前所有行：', this.rows);
  }

  public valueChangeRow(col?) {

    // console.log('行操作返回信息', col, this.rows);

    if (col) {
      if (col['operation'] === 'delete') {
        // 计算出位置
        let deleteIndex;
        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i]['id'] === col['data']['id']) {
            deleteIndex = i;
          }
        }
        // console.log('行删除前', this.rows.length, deleteIndex);
        this.rows.splice(deleteIndex, 1);
        //  this.cols = this.cols.slice(deleteIndex + 1);
        // console.log('删除结束后', this.rows);
      }
      if (col['operation'] === 'update') {
        // 计算出位置
        let updateIndex;
        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i]['id'] === col['data']['id']) {
            updateIndex = i;
          }
        }
        this.rows[updateIndex] = col['data']['config'];
      }
    }

  }

  public SaveJson() {
    console.log('当前布局json字符串：', JSON.stringify(this.config));
    const back = {
      operation: 'json',
      data: {
        config: this.config
      }
    }
    this.updateLayoutValue.emit(back);
  }


  /**
   * layoutTypeChange
   */
  public layoutTypeChange(v?) {
    if (v) {
      this.config.container = 'rows';
    } else {
      this.config.container = 'customlayout';
    }

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
