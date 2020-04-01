import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';

@Component({
  selector: 'cfg-form-layout-col',
  templateUrl: './cfg-form-layout-col.component.html',
  styleUrls: ['./cfg-form-layout-col.component.css']
})
export class CfgFormLayoutColComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public formState;
  @Output() public updateValue = new EventEmitter();
  public bodystyle = { 'background-color': 'rgba(47, 164, 231, 0.15)' };
  public rows = [
  ];
  public tabs = {
    id: '',
    type: 'tabs',
    title: '标签页布局',
    tabConent: [

    ]
  };

  public collapse = {
    id: '',
    type: 'collapse',
    title: '折叠面板布局',
    collapseConent: [

    ]
  };
  public isDown = false;
  public is_drag = true;

  public value1 = 24;



  public size_isVisible = false;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  public ngOnInit() {
    // background: #afd5ea;
    if (this.config['rows']) {
      this.rows = this.config['rows'];
    }
  }
  /**
   * delCol 删除列
   */
  public delCol() {
    console.log('删除当前列！');
    const back = {
      operation: 'delete',
      data: {
        id: this.config.id
      }
    }
    this.updateValue.emit(back);
  }


  /**
   * dragCol 移动列
   */
  public dragCol() {

    // 移动列

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

  // 拖动行

  public f_ondragstart(e?, d?) {
    // this.d_row = d;
    e.dataTransfer.setData('test', this.config.id);
    console.log('拖动行', e, d);
    const ss = e.dataTransfer.getData('test');
    console.log('拖动行临时值', ss);
  }


  public f_ondrop(e?, d?) {
    e.preventDefault();
    console.log('拖动行ondrop', e, d);
    const ss = e.dataTransfer.getData('test');
    console.log('拖动行ondrop临时值', ss);
    // const c_config = this.c_data;
    // const index = c_config.findIndex(
    //     item => item.field === this.d_row['field']
    // );
    // const tindex = c_config.findIndex(
    //     item => item.field === d['field']
    // );
    // this.c_data = JSON.parse(JSON.stringify(this.droparr(c_config, index, tindex)));
  }

  // index是当前元素下标，tindex是拖动到的位置下标。
  public droparr(arr, index, tindex) {
    // 如果当前元素在拖动目标位置的下方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置的地方新增一个和当前元素值一样的元素，
    // 我们再把数组之前的那个拖动的元素删除掉，所以要len+1
    // if (index > tindex) {
    //     arr.splice(tindex, 0, arr[index]);
    //     arr.splice(index + 1, 1);
    // } else {
    //     // 如果当前元素在拖动目标位置的上方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置+1的地方新增一个和当前元素值一样的元素，
    //     // 这时，数组len不变，我们再把数组之前的那个拖动的元素删除掉，下标还是index
    //     arr.splice(tindex + 1, 0, arr[index]);
    //     arr.splice(index, 1);
    // }
    // return arr;
  }



  public f_ondragover(e?, d?) {
    // 进入，就设置可以拖放进来（设置不执行默认：【默认的是不可以拖动进来】）
    if (this.is_drag)
      e.preventDefault();
    // --05--设置具体效果copy
    e.dataTransfer.dropEffect = 'copy';
  }

  // ondrag 事件在元素或者选取的文本被拖动时触发。
  public f_drag(e?) {

  }

  public onblur(e?, d?) {
    this.is_drag = true;
  }
  public onfocus(e?, d?) {
    this.is_drag = false;
  }


  /**
   * open
   */
  public open() {

    this.size_isVisible = true;

  }

  /**
   * size_handleCancel
   */
  public size_handleCancel() {
    this.size_isVisible = false;
  }
  /**
   * size_handleOk
   */
  public size_handleOk() {
    this.size_isVisible = false;
  }

  /**
   * addRow 添加行
   */
  public addRow() {


    console.log('**列内添加行**', this.config);
    if (this.config.container === '' || this.config.container === 'rows') {
      // console.log('**列内添加行**');
      this.config.container = 'rows'
      const fieldIdentity = CommonUtils.uuID(36);
      const row = {
        cols: [],
        container: "cols"
      };
      row['id'] = fieldIdentity;
      row['type'] = 'row';
      row['title'] = '行';
      this.rows.push(row);
      this.config['rows'] = this.rows;
      this.config.container = 'rows';
    } else {
      // console.log('**列内添加行不允许,条件不满足**');
      this.componentService.modalService.confirm({
        nzTitle: '确认框?',
        nzContent: '<b style="color: red;">你确定要替换当前组件为布局行吗？</b>',
        nzOkText: '确定',
        nzOkType: 'danger',
        nzOnOk: () => {

          this.config.container = 'rows'
          const fieldIdentity = CommonUtils.uuID(36);
          const row = {
            cols: [],
            container: "cols"
          };
          row['id'] = fieldIdentity;
          row['type'] = 'row';
          row['title'] = '行';
          this.rows.push(row);
          this.config['rows'] = this.rows;
          this.config.container = 'rows';
          setTimeout(() => {

          });
        },
        nzCancelText: '取消',
        nzOnCancel: () => console.log('Cancel')
      });
    }


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

        if (this.rows.length <= 0) {
          this.config.container = 'component';
        }
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

}
