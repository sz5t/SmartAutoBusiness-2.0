import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cn-grid-custom-select,[cn-grid-custom-select]',
  templateUrl: './cn-grid-custom-select.component.html',
  styleUrls: ['./cn-grid-custom-select.component.less']
})
export class CnGridCustomSelectComponent implements OnInit {

  constructor() { }

  tags=[
    {"label":'我是的数据暗示',value:'01'},
    {"label":'粉丝大师的骄傲',value:'02'},
    {"label":'SDK你打上次你说的基础节点是',value:'03'},
    {"label":'收到件案件',value:'04'},
    {"label":'as接的就是那爱上的脑残删除 的妃娘娘口',value:'05'},
    {"label":'数据送到哪饭饭南师大的时间段',value:'06'},
    {"label":'啥的就能加快技术带你吃鸡',value:'07'},
    {"label":'驾驶的那次即可拿数控机床',value:'08'},
    {"label":'爱神的箭奶茶色',value:'09'}
  ];
  ngOnInit() {
  }

  handleClosetag(tag?){

  }

  public cascadeAnalysis (c?){

  }
}
