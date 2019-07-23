import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cfg-form-demo,[cfg-form-demo]',
  templateUrl: './cfg-form-demo.component.html',
  styles: ['']
})
export class CfgFormDemoComponent implements OnInit {

  public is_drag = true;
  public gridStyle = {
    width: '100%'
  };
  constructor() { }

  public ngOnInit() {
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
