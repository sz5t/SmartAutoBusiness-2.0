import { Component, OnInit, ViewChild } from '@angular/core';
import { CfgLayoutComponent } from '@shared/config-components/config-layout/cfg-layout/cfg-layout.component';

@Component({
  selector: 'cfg-layout-demo,[cfg-layout-demo]',
  templateUrl: './cfg-layout-demo.component.html',
  styles: [`
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .left-layout {
    height: 100vh;
  }


  .right-layout {
    margin-left: 200px;
  }

  nz-header {
    background: #fff;
    padding: 0;
  }

  nz-content {
    margin: 24px 16px 0;
    overflow: initial;
  }

  .inner-content {
    padding: 24px;
    background: #fff;
    text-align: center;
  }

  nz-footer {
    text-align: center;
  }
  `]
})
export class CfgLayoutDemoComponent implements OnInit {

  public c_config0 = null;
  public designStatus = 'sj';
  public c_config = {
    "id": "CKC23J", "type": "layout", "title": "布局CKC23J", "container": "rows", "rows": [{ "cols": [{ "id": "vpsfqV", "col": "cc", "type": "col", "titlestate": 1, "title": "列vpsfqV", "span": 24, "container": "rows", "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 }, "rows": [{ "cols": [{ "id": "mUYU5F", "col": "cc", "type": "col", "titlestate": 1, "title": "列mUYU5F", "span": 24, "container": "", "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 } }], "container": "cols", "id": "HAoEIq", "type": "row" }] }, { "id": "IZqJZx", "col": "cc", "type": "col", "titlestate": 1, "title": "列IZqJZx", "span": 24, "container": "collapse", "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 }, "collapse": { "id": "", "type": "collapse", "title": "折叠面板布局", "container": "collapseContent", "collapseContent": [{ "id": "335upw", "type": "collapsePanel", "title": "面板oiauOx", "active": true, "disabled": false, "container": "layout", "layout": { "id": "335upw", "type": "layout", "title": "布局335upw", "rows": [{ "cols": [{ "id": "RJ2oiC", "col": "cc", "type": "col", "titlestate": 1, "title": "列RJ2oiC", "span": 24, "container": "", "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 } }], "id": "eZQxxK", "type": "row", "container": "cols" }], "customlayout": [], "container": "rows" } }] } }], "id": "RD4rNO", "type": "row", "container": "cols" }], "customlayout": []
  };
  public is_drag = true;
  public gridStyle = {
    width: '100%'
  };

  public isCollapsed = false;

  @ViewChild('child1') child1: CfgLayoutComponent;
  constructor() { }

  ngOnInit() {
  }

  /**
   * showLayout
   */
  public showLayout() {

    console.log('showLayout', this.c_config, JSON.stringify(this.c_config));
    this.child1.config = this.c_config;

  }

  /**
   * valueChangeLayout
   */
  public valueChangeLayout(v?) {
    if (v) {
      if (v['operation'] === 'json') {

        const _config = v['data']['config'];
        console.log('拖拽最新的布局配置', _config);
        this.c_config = _config;
      }
    }
  }

  // 拖动行

  public f_ondragstart(e?, d?) {
    // this.d_row = d;
    e.dataTransfer.setData('test', d);
    console.log('拖动行', e, d);
    const ss = e.dataTransfer.getData('test');
    console.log('拖动行临时值', ss);
  }


}
