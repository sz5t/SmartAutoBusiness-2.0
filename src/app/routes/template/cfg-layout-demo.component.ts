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
  public c_config = {"id":"CKC23J","type":"layout","title":"布局CKC23J","container":"rows","rows":[{"cols":[{"id":"m24kZr","col":"cc","type":"col","title":"列m24kZr","span":24,"container":"","size":{"nzXs":24,"nzSm":6,"nzMd":6,"nzLg":6,"ngXl":6,"nzXXl":6},"titlestate":1},{"id":"LOjIkM","col":"cc","type":"col","title":"列LOjIkM","span":24,"container":"tabs","size":{"nzXs":24,"nzSm":18,"nzMd":18,"nzLg":18,"ngXl":18,"nzXXl":18},"rows":[],"tabs":{"id":"","type":"tabs","title":"标签页布局","container":"tabContent","tabContent":[{"id":"wBhhoh","type":"tab","title":"标签mG1bR6","container":"layout","layout":{"id":"wBhhoh","type":"layout","title":"布局wBhhoh","rows":[{"cols":[{"id":"72yVCS","col":"cc","type":"col","title":"列72yVCS","span":24,"container":"","size":{"nzXs":24,"nzSm":24,"nzMd":24,"nzLg":24,"ngXl":24,"nzXXl":24}},{"id":"DfhZGK","col":"cc","type":"col","title":"列DfhZGK","span":24,"container":"","size":{"nzXs":24,"nzSm":24,"nzMd":24,"nzLg":24,"ngXl":24,"nzXXl":24}}],"id":"jBo62D","type":"row","container":"cols"}],"customlayout":[],"container":"rows"}},{"id":"z9IM1n","type":"tab","title":"标签TkRoUN","container":"layout","layout":{"id":"z9IM1n","type":"layout","title":"布局z9IM1n","rows":[{"cols":[{"id":"YETRmK","col":"cc","type":"col","title":"列YETRmK","span":24,"container":"","size":{"nzXs":24,"nzSm":24,"nzMd":24,"nzLg":24,"ngXl":24,"nzXXl":24}}],"id":"gr5PXf","type":"row","container":"cols"}],"customlayout":[],"container":"rows"}}]}}],"id":"i2DHxY","type":"row","container":"cols"}],"customlayout":[]};
  public is_drag = true;
  public gridStyle = {
    width: '100%'
  };

  public isCollapsed = false;

  @ViewChild('child1', { static: true }) child1: CfgLayoutComponent;
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
