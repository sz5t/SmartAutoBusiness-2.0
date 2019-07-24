import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cfg-layout-demo,[cfg-layout-demo]',
  templateUrl: './cfg-layout-demo.component.html',
  styles: ['']
})
export class CfgLayoutDemoComponent implements OnInit {

  public c_config;
  public s_config ={config: { "id": "8TrrHZ", "type": "layout", "title": "布局8TrrHZ", "container": "rows", "rows": [{ "cols": [{ "id": "FFIiHP", "col": "cc", "type": "col", "title": "列FFIiHP", "span": 24, "container": "", "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 } }], "id": "pAwl2L", "type": "row", "container": "cols" }], "customlayout": [] }} ;
  constructor() { }

  ngOnInit() {
  }

  /**
   * showLayout
   */
  public showLayout() {

    console.log('showLayout', this.c_config);

  }

  /**
   * valueChangeLayout
   */
  public valueChangeLayout(v?) {
    if (v) {
      if (v['operation'] === 'json') {

        const _config = v['data']['config'];
        console.log('拖拽最新的布局配置', _config);
        this.s_config.config = _config;
        this.s_config = JSON.parse( JSON.stringify(this.s_config) );
      }
    }
  }

}
