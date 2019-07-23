import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'cfg-layout,[cfg-layout]',
  templateUrl: './cfg-layout.component.html',
  styleUrls: ['./cfg-layout.component.css']
})
export class CfgLayoutComponent implements OnInit {
  @Input() public config;
  @Output() public updateValue = new EventEmitter();

  public layoutType = true;

  public configType = true;
  public rows = [
  ];
  public customlayout = [
  ];
  constructor() { }

  public ngOnInit() {
    // const ss = cfgConfig();
    // console.log('===>>>', ss,  ss.localResourceUrl);
    console.log('布局ngOnInit');
    const fieldIdentity = CommonUtils.uuID(6);
    const title = '布局' + fieldIdentity;
    if (!this.config) {
      this.config = {
        id: fieldIdentity,
        type: 'layout',
        title: title,
        layoutContain: 'rows',
        rows: this.rows,
        customlayout: this.customlayout
      }
    } else {
      if (this.config . layoutContain) {
        if (this.config . layoutContain === 'rows') {
          this. layoutType = true;
        } else {
          this. layoutType = false;
        }
      }
      this.configType = false;
      this.rows = this.config.rows;
      this.customlayout = this.config.customlayout
    }
    if (this.config.rows.length < 1) {
      this.addRow();
    }

  }

  /**
   * addRow
   */
  public addRow() {
    const fieldIdentity = this.uuID(6);
    const row = {
      cols: []
    };
    row['id'] = fieldIdentity;
    row['type'] = 'row';
    console.log('新增行信息', row);
    this.rows.push(row);
    console.log('当前所有行：', this.rows);
  }

  public valueChangeRow(col?) {

    console.log('行操作返回信息', col, this.rows);

    if (col) {
      if (col['operation'] === 'delete') {
        // 计算出位置
        let deleteIndex;
        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i]['id'] === col['data']['id']) {
            deleteIndex = i;
          }
        }
        console.log('行删除前', this.rows.length, deleteIndex);
        this.rows.splice(deleteIndex, 1);
        //  this.cols = this.cols.slice(deleteIndex + 1);
        console.log('删除结束后', this.rows);
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
    console.log('当前布局json：', this.config, JSON.stringify(this.config));
  }

  public uuID(w) {
    let s = '';
    const str =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < w; i++) {
      s += str.charAt(Math.round(Math.random() * (str.length - 1)));
    }
    return s;
  }


  /**
   * layoutTypeChange
   */
  public layoutTypeChange(v?) {
    if (v) {
      this.config . layoutContain = 'rows';
    } else {
      this.config . layoutContain = 'customlayout';
    }

  }


}
