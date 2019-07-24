import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';
@Component({
  selector: 'cfg-form-layout-row',
  templateUrl: './cfg-form-layout-row.component.html',
 // styleUrls: ['./cfg-form-layout-row.component.css'],
  styles: [
    `

    .ant-card-head {
      min-height: 28px;
    }
    .ant-card-head-title {
      padding: 2px 0;
    }
    .ant-card-extra {
      padding: 2px 0;
    }

  `
  ]
})
export class CfgFormLayoutRowComponent implements OnInit {

  @Input() public config;
  @Output() public updateValue = new EventEmitter();

  public bodystyle = { 'background-color': '#efefef' };
  constructor() { }

  public ngOnInit() {
    console.log('列信息', this.config);
    // #efefef
    this.addCol();
  }
  /**
   * addCol
   */
  public addCol() {
    const fieldIdentity = CommonUtils.uuID(6);
    const title = '列' + fieldIdentity;
    const col = {
      id: fieldIdentity,
      col: 'cc',
      type: 'col',
      title: title,
      span: 24,
      layoutContain: '',
      size: {
        nzXs: 24,
        nzSm: 24,
        nzMd: 24,
        nzLg: 24,
        ngXl: 24,
        nzXXl: 24
      }
    }
    console.log('新增列信息', col);
    this.config.cols.push(col);
  }

  /**
   * deleteRow
   */
  public deleteRow() {
    console.log('删除当前行！');
    const back = {
      operation: 'delete',
      data: {
        id: this.config.id
      }
    }
    this.updateValue.emit(back);

  }

  /**
   * valueChangeCol 行内列的操作
   */
  public valueChangeCol(col?) {

    console.log('列操作返回信息', col, this.config.cols);

    if (col) {
      if (col['operation'] === 'delete') {
        // 计算出位置
        let deleteIndex;
        for (let i = 0; i < this.config.cols.length; i++) {
          if (this.config.cols[i]['id'] === col['data']['id']) {
            deleteIndex = i;
          }
        }
        this.config.cols.splice(deleteIndex, 1);
        //  this.config.cols = this.config.cols.slice(deleteIndex + 1);
        console.log('删除结束后', this.config.cols);
      }
    }
    const back = {
      operation: 'update',
      data: {
        id: this.config.id,
        config: this.config
      }
    }
    this.updateValue.emit(back);

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

}
