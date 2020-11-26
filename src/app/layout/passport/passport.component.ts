import { Component } from '@angular/core';
import { CacheService } from '@delon/cache';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent {
  links = [
    {
      title: '帮助',
      href: '',
    },
    {
      title: '隐私',
      href: '',
    },
    {
      title: '条款',
      href: '',
    },
  ];

  systemInfo:any;

  style_body = {"background-image":"url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')"}
  constructor(
    private _cacheService: CacheService,
  ) { 

    this.systemInfo = environment['systemSettings']['systemInfo'];
   

  }
}
