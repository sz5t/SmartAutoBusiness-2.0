import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VERSION as VERSION_ALAIN, TitleService } from '@delon/theme';
import { VERSION as VERSION_ZORRO, NzModalService, NzIconService } from 'ng-zorro-antd';
import { ApartmentOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private iconService: NzIconService
  ) {
    renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
    this.iconService.addIcon(ApartmentOutline);
    // this.iconService.twoToneColor = { primaryColor: '#1890ff' };
  }

  ngOnInit() {
    this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
      this.titleSrv.setTitle();
      this.modalSrv.closeAll();
    });
  }
}
