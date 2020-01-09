import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';
@Component({
  selector: 'cfg-form-layout',
  templateUrl: './cfg-form-layout.component.html',
  styleUrls: ['./cfg-form-layout.component.css']
})
export class CfgFormLayoutComponent implements OnInit {

  @Input() public config;
  @Input() public formState;
  @Output() public updateValue = new EventEmitter();
  public configType = true;
  public form_State = true;
  public form_State_s = '编辑';
  public rows = [
  ];
  public hiddenRows = [
  ];
  constructor() { }

  public ngOnInit() {
    const fieldIdentity = CommonUtils.uuID(6);
    const _title = '表单布局' + fieldIdentity;
    const _hiddenTitle = '表单隐藏域' + fieldIdentity;
    if (!this.config) {
      this.config = {
        id: fieldIdentity,
        type: 'layout',
        title: _title,
        hiddenTitle: _hiddenTitle,
        rows: this.rows,
        hiddenRows: this.hiddenRows
      }
    } else {
      this.configType = false;
      this.rows = this.config.rows;
      this.hiddenRows = this.config.hiddenRows;
    }

    this.addRow();
    this.addHiddenRow();
  }

  /**
   * addRow
   */
  public addRow(_title?) {
    const fieldIdentity = this.uuID(6);
    const row = {
      cols: []
    };
    row['id'] = fieldIdentity;
    row['type'] = 'row';
    row['title'] = _title ? _title : '行';
    console.log('新增行信息', row);
    this.rows.push(row);
    console.log('当前所有行：', this.rows);
  }
  public addHiddenRow(_title?) {
    const fieldIdentity = this.uuID(6);
    const row = {
      cols: []
    };
    row['id'] = fieldIdentity;
    row['type'] = 'row';
    row['title'] = _title ? _title : '行';
    console.log('新增行信息', row);
    this.hiddenRows.push(row);
    console.log('当前所有行：', this.hiddenRows);
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

  public valueChangeHiddenRow(col?) {

    console.log('行操作返回信息', col, this.hiddenRows);

    if (col) {
      if (col['operation'] === 'delete') {
        // 计算出位置
        let deleteIndex;
        for (let i = 0; i < this.hiddenRows.length; i++) {
          if (this.hiddenRows[i]['id'] === col['data']['id']) {
            deleteIndex = i;
          }
        }
        console.log('行删除前', this.hiddenRows.length, deleteIndex);
        this.hiddenRows.splice(deleteIndex, 1);
        //  this.cols = this.cols.slice(deleteIndex + 1);
        console.log('删除结束后', this.hiddenRows);
      }
      if (col['operation'] === 'update') {
        // 计算出位置
        let updateIndex;
        for (let i = 0; i < this.hiddenRows.length; i++) {
          if (this.hiddenRows[i]['id'] === col['data']['id']) {
            updateIndex = i;
          }
        }
        this.hiddenRows[updateIndex] = col['data']['config'];
      }
    }

  }

  public SaveJson() {
    this._Controller=[];
    this.FormComponents(this.config);
    console.log('当前布局json：', this.config,'当前表单组件：', this._Controller);
  }

  /**
   * 解析出当前表单明细小组件
   */

  _Controller = [];
  public FormComponents(v,type?) {

    if (v.hasOwnProperty('type')) {
      if (v['type'] === 'layout') {
        v['rows'].forEach(_row => {
          this.FormComponents(_row);
        });
        v['hiddenRows'].forEach(_row => {
          this.FormComponents(_row,'hiddenController');
        });

      } else if (v['type'] === 'row') {
        v['cols'].forEach(_col => {
          this.FormComponents(_col,type);
        });
      } else if (v['type'] === 'col') {
        if (v['container'] === '' || v['container'] === 'component') {
          const _c =  v['controls'];
          if(type){
            _c ['hiddenController'] = true;
          } else {
            _c ['hiddenController'] = false;
          }
        //   this._Controller.push(_c);
        if(_c.text.hasOwnProperty('id')){
          this._Controller.push( {"id":_c.text.id,"controlId":_c.id,"controlType":"text","componentCode":_c.text.type});
        }
        if(_c.editor.hasOwnProperty('id')){
          this._Controller.push( {"id":_c.editor.id,"controlId":_c.id,"controlType":"editor","componentCode":_c.editor.type});
        }
         
         

        } else {
          v['rows'].forEach(_row => {
            this.FormComponents(_row,type);
          });

        }
      }
    }

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
   * form_StateChange
   */
  public form_StateChange(v?) {

  }
}
