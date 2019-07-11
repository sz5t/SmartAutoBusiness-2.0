import { CommonUtils } from './../../../core/utils/common-utils';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cn-custom-layout',
  templateUrl: './cn-custom-layout.component.html',
  styleUrls: ['./cn-custom-layout.component.css']
})
export class CnCustomLayoutComponent implements OnInit, AfterViewInit {

  @Input() public config;
  @Output() public updateValue = new EventEmitter();

  @ViewChild('s1') public s1: ElementRef<any>;

  @ViewChild('west') public west: ElementRef<any>;
  @ViewChild('center') public center: ElementRef<any>;
  @ViewChild('east') public east: ElementRef<any>;

  // 测试收缩展开
  public isCollapsed = { west: false, east: false };
  public title = { west: 'west测试标题', east: 'east测试标题', center: '主体内容' };
  public contenttitle = { west: 'west测试标题', east: 'east测试标题', center: '主体内容' };

  public customLayout;
  public size_isVisible = false;
  public checkOptionsOne = {
    layoutState: [
      { label: '左侧布局', value: 'west', checked: true },
      { label: '中间布局', value: 'center', checked: true },
      { label: '右侧布局', value: 'east', checked: false }

    ]
  };

  public customLayout_form;

  constructor() { }

  public ngOnInit() {
    if (!this.config) {
      this.initcustomLayout();
      this.config.customLayout = this.customLayout;
    } else {

      if (this.config.customLayout && this.config.customLayout.length > 0) {

        this.customLayout = this.config.customLayout;
      } else {
        this.initcustomLayout();
        this.config.customLayout = this.customLayout;
      }
    }

    this.customLayout.forEach(lay => {
      this.checkOptionsOne.layoutState.forEach(op => {
        if (lay.layoutType === op.value) {
          op.checked = !lay.hidden;
        }
      });
    });
    // this.checkOptionsOne
    // console.log('Custom->ngOnInit', this.config);
  }

  public ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');
    this.initCustomLayout();
  }

  /**
   * initcustomLayout
   */
  public initCustomLayout() {
    this.customLayout.forEach(lay => {

      if (this[lay.layoutType] && this[lay.layoutType].nativeElement) {
        const divswest = this[lay.layoutType].nativeElement;
        if (lay.hidden) {
          divswest.style.display = 'none';
        }
        divswest.style['flex-grow'] = lay.span;
      }

    });

  }

  /**
   * ss 收缩
   */
  public ss(dom?) {
    const divs1 = this[dom].nativeElement;
    // divs1.style.display = 'none';
    // if (divs1.style['flex-basis'] === '50px') {
    //   divs1.removeAttribute('style');
    //   divs1.style['flex-grow'] = '1';
    // } else {
    //   divs1.removeAttribute('style');
    //   divs1.style['flex-basis'] = '50px';
    // }
    const objlist = this.customLayout.filter(d => d.layoutType === dom);
    let sapn = 1;
    if (objlist && objlist.length > 0) {
      sapn = objlist[0].span;
    }

    if (this.isCollapsed[dom]) { // 收缩 -》展开
      divs1.removeAttribute('style');
      divs1.style['flex-grow'] = sapn;
    } else {
      divs1.removeAttribute('style');
      divs1.style['flex-basis'] = '50px';
    }
    this.isCollapsed[dom] = !this.isCollapsed[dom];
    this.title[dom] = '';
  }
  /**
 * zk
 */
  public zk(dom?) {
    const divs1 = this[dom].nativeElement;
    // divs1.style.display = 'none';
    // if (divs1.style['flex-basis'] === '50px') {
    //   divs1.removeAttribute('style');
    //   divs1.style['flex-grow'] = '1';
    // } else {
    //   divs1.removeAttribute('style');
    //   divs1.style['flex-basis'] = '50px';
    // }
    const objlist = this.customLayout.filter(d => d.layoutType === dom);
    let sapn = 1;
    if (objlist && objlist.length > 0) {
      sapn = objlist[0].span;
    }
    if (this.isCollapsed[dom]) { // 收缩 -》展开
      divs1.removeAttribute('style');
      divs1.style['flex-grow'] = sapn;
    } else {
      divs1.removeAttribute('style');
      divs1.style['flex-basis'] = '50px';
    }
    this.isCollapsed[dom] = !this.isCollapsed[dom];
    this.title[dom] = this.contenttitle[dom];
  }


  /*
     this.config = {
        id: fieldIdentity,
        type: 'customLayout',
        title: title,
        customLayout: this.customLayout
      }

   */

  public initcustomLayout() {
    const fieldIdentity = CommonUtils.uuID(8);
    const title = '布局' + fieldIdentity;
    this.customLayout = [
      {
        id: CommonUtils.uuID(8),
        type: 'customLayout',
        title: '左侧布局',
        layoutType: 'west',
        hidden: false,
        span: '1',
        layout: {
          id: CommonUtils.uuID(8),
          type: 'layout',
          title: '布局',
          rows: []
        }
      },
      {
        id: CommonUtils.uuID(8),
        type: 'customLayout',
        title: '中间布局',
        layoutType: 'center',
        hidden: false,
        span: '2',
        layout: {
          id: CommonUtils.uuID(8),
          type: 'layout',
          title: '布局',
          rows: []
        }
      },
      {
        id: CommonUtils.uuID(8),
        type: 'customLayout',
        title: '右侧布局',
        layoutType: 'east',
        hidden: true,
        span: '1',
        layout: {
          id: CommonUtils.uuID(8),
          type: 'layout',
          title: '布局',
          rows: []
        }
      }

    ];

  }
  /**
   * 更新布局区域
   */
  public updateSingleChecked(): void {
    this.checkOptionsOne.layoutState.forEach(op => {
      this.customLayout_form.forEach(lay => {
        if (lay.layoutType === op.value) {
          lay.hidden = !op.checked;
        }
      });
    });

  }


}
