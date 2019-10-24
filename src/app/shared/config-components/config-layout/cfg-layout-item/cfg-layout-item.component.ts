import { Component, OnInit, Input } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'cfg-layout-item,[cfg-layout-item]',
  templateUrl: './cfg-layout-item.component.html',
  styleUrls: ['./cfg-layout-item.component.css']
})
export class CfgLayoutItemComponent implements OnInit {
  @Input() public config;
  public is_drag = true;
  public is_dragj = true;
  public component = '';
  constructor() { }

  public ngOnInit() {
    console.log('-->布局列-》', this.config);
    if(this.config){
      if(this.config.container)
      this.component = this.config.container;
    }else {
      this.config ={};
    }
  }

  public f_ondrop(e?, d?) {
    e.preventDefault();
    console.log('拖动行ondrop', e, d);
    const ss = e.dataTransfer.getData('test');
    console.log('拖动行ondrop临时值', ss);
    this.component = ss;
    this.config.container = 'component';
    const fieldIdentity =CommonUtils.uuID(36);
    const componentTitle=ss+'组件';
    this.config['component'] = {id:fieldIdentity,title: componentTitle,type:ss, container: ss };
    console.log('拖拽后组件状态----》', this.component);
  }
  public f_ondragover(e?, d?) {
    // 进入，就设置可以拖放进来（设置不执行默认：【默认的是不可以拖动进来】）
    if (this.is_drag)
      e.preventDefault();
    // --05--设置具体效果copy
    e.dataTransfer.dropEffect = 'copy';
    // if (this.is_dragj) {
    //   this.is_dragj = false;
    //   window.setTimeout(() => { this.setState(); }, 500);
    // }


  }

  public f_ondragleave(e) {
    console.log('离开当前领地++++');
  }
  public f_ondragenter(e, d?) {
    console.log('***进入当前领地****');
  }

  public setState() {
    this.is_dragj = true;
    // console.log('进入当前领地++++');
  }





}
