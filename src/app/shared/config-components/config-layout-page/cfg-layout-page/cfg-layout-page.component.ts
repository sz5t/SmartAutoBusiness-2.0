import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cfg-layout-page,[cfg-layout-page]',
  templateUrl: './cfg-layout-page.component.html',
  styleUrls: ['./cfg-layout-page.component.less']
})
export class CfgLayoutPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  index = 0;
  disable = false;
  onIndexChange(index: number): void {
    this.index = index;
  }

  public c_config;
  public designStatus = 'sj';
  public is_drag = true;
  public gridStyle = {
    width: '100%'
  };

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

    // 此处 做布局结构拆分保存，页面数据自身存储一条记录，页面配置一致。
    // 前端拆分出树形结构，复原平层结构后保存。
    //  insert into SMT_SETTING_PAGE 将json结构存储在页面的配置信息里
    // 分解json结构，树形结构拆分到【布局组件结构树】
    // 【编辑-》更新大字段json】-》【同步布局结构树】=》注意版本，更新有问题如何回滚
    // 生成版本过后，所有记录生成一个标准json，于明细记录分离，变更后均会生成新的记录，每次变更记录需要详细记录
    // 方便版本回退，若是直接拷贝生成json，就无法再次修改明细，需要有根据版本逆向生成明细记录的功能
    // 目前的表设计，逆向难度较大，向纯结构靠拢后，可实现
    this.ts_new = [];
    this.jxlayout(this.c_config,'NULL');
    console.log("简析当前结构树：", this.ts_new);

  }

  // 拖动行

  public f_ondragstart(e?, d?) {
    // this.d_row = d;
    e.dataTransfer.setData('test', d);
    console.log('拖动行', e, d);
    const ss = e.dataTransfer.getData('test');
    console.log('拖动行临时值', ss);
  }


  public ts_new = [];
  public ts = {
    "id": "7U8BWW", "type": "layout", "title": "布局7U8BWW", "container": "rows",
    "rows": [
      {
        "cols": [
          { "id": "1MjHon", "col": "cc", "type": "col", "titlestate": 1, "title": "主记录", "span": 24, "container": "", "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 } },
          { "id": "HjY7Kp", "col": "cc", "type": "col", "titlestate": 1, "title": "子记录", "span": 24, "container": "", "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 } }
        ], "id": "yrCdHD", "type": "row", "container": "cols"
      }
    ],
    "customlayout": []
  };




  /**
   * jxlayout
   */
  public jxlayout(layoutconfig?, parentid?) {
    console.log('xxx:',layoutconfig);
    if (layoutconfig instanceof Array) { // 数组
      layoutconfig.forEach(item => {
        if (item.hasOwnProperty('container')  ) {
          this.ts_new.push({ key: item['id'],type:item['type'],title:item['title'], parentId:parentid,container: item['container'] });
          if(item['container']!=='')
          this.jxlayout(item[item['container']],item['id']);
        }
      });
    }
    else {
      // 第一步判断是否存在container
      if (layoutconfig.hasOwnProperty('container') ) {
        // 下一层布局

        this.ts_new.push({ key: layoutconfig['id'],type:layoutconfig['type'],title:layoutconfig['title'], parentId:parentid, container: layoutconfig['container'] });
        if( layoutconfig['container']!=='' && layoutconfig[layoutconfig['container']])
        this.jxlayout(layoutconfig[layoutconfig['container']],layoutconfig['id']);
      }
    }




  }


}
