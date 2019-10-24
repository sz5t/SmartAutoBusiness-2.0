import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';
@Component({
  selector: 'cfg-layout-row,[cfg-layout-row]',
  templateUrl: './cfg-layout-row.component.html',
  styleUrls: ['./cfg-layout-row.component.css']
})
export class CfgLayoutRowComponent implements OnInit {
  @Input() public config;
  @Input() public designStatus;  // 设计状态
  @Output() public updateValue = new EventEmitter();

  public bodystyle = { 'background-color': '#efefef' };
  public editTitleState = false;
  constructor() { }

  public ngOnInit() {
    // console.log('列信息', this.config);
    // #efefef
    if (this.config.cols) {
      if (this.config.cols.length < 1) {
        this.addCol();
      }
    } else {
      this.addCol();
    }
    this.attribute_config = JSON.parse(JSON.stringify(this.config));

  }
  /**
   * addCol
   */
  public addCol() {
    const fieldIdentity = CommonUtils.uuID(36);
    const title = '列';
    const col = {
      id: fieldIdentity,
      col: 'cc',
      type: 'col',
      titlestate:1,
      title: title,
      span: 24,
      container:'',
      size: {
        nzXs: 24,
        nzSm: 24,
        nzMd: 24,
        nzLg: 24,
        ngXl: 24,
        nzXXl: 24
      }
    }
    // console.log('新增列信息', col);
    this.config.cols.push(col);
  }

  /**
   * deleteRow
   */
  public deleteRow() {
    // console.log('删除当前行！');
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

    // console.log('列操作返回信息', col, this.config.cols);

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
        // console.log('删除结束后', this.config.cols);
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
