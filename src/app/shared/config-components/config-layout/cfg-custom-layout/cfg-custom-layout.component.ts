import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'cfg-custom-layout',
  templateUrl: './cfg-custom-layout.component.html',
  styleUrls: ['./cfg-custom-layout.component.css']
})
export class CfgCustomLayoutComponent implements OnInit, AfterViewInit {

  @Input() public config;
  @Input() public designStatus;  // 设计状态
  @Output() public updateValue = new EventEmitter();

  @ViewChild('s1') public s1: ElementRef<any>;

  @ViewChild('west') public west: ElementRef<any>;
  @ViewChild('center') public center: ElementRef<any>;
  @ViewChild('east') public east: ElementRef<any>;

  // 测试收缩展开
  public isCollapsed = { west: false, east: false };
  public title = { west: 'west测试标题', east: 'east测试标题', center: '主体内容' };
  public contenttitle = { west: 'west测试标题', east: 'east测试标题', center: '主体内容' };

  public customlayout;
  public size_isVisible = false;
  public checkOptionsOne = {
    layoutState: [
      { label: '左侧布局', value: 'west', checked: true },
      { label: '中间布局', value: 'center', checked: true },
      { label: '右侧布局', value: 'east', checked: false }
    ]
  };

  public customlayout_form;

  constructor() { }

  public ngOnInit() {


    if (!this.config) {
      this.initcustomlayout();
      this.config.customlayout = this.customlayout;
    } else {

      if (this.config.customlayout && this.config.customlayout.length > 0) {
        this.customlayout = this.config.customlayout;
      } else {
        this.initcustomlayout();
        this.config.customlayout = this.customlayout;
      }
    }

    this.customlayout.forEach(lay => {
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
   * initCustomLayout
   */
  public initCustomLayout() {
    this.customlayout.forEach(lay => {

      if (this[lay.layoutType] && this[lay.layoutType].nativeElement) {
        const divswest = this[lay.layoutType].nativeElement;
        if (lay.hidden) {
          divswest.style['display'] = 'none';
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
   const  objlist =  this.customlayout.filter(d => d.layoutType === dom);
   let  sapn = 1;
   if (objlist && objlist.length > 0 ) {
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
    const  objlist =  this.customlayout.filter(d => d.layoutType === dom);
    let  sapn = 1;
    if (objlist && objlist.length > 0 ) {
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
        type: 'customlayout',
        title: title,
        customlayout: this.customlayout
      }

   */

  public initcustomlayout() {
    const fieldIdentity = CommonUtils.uuID(8);
    const title = '布局' + fieldIdentity;
    this.customlayout = [
      {
        id: CommonUtils.uuID(8),
        type: 'customlayout',
        title: '左侧布局',
        layoutType: 'west',
        hidden: false,
        span: '1',
        container: 'layout',
        layout: {
          id: CommonUtils.uuID(8),
          type: 'layout',
          title: '布局',
          rows: [],
          customlayout: [],
          container: 'rows'
        }
      },
      {
        id: CommonUtils.uuID(8),
        type: 'customlayout',
        title: '中间布局',
        layoutType: 'center',
        hidden: false,
        span: '2',
        container: 'layout',
        layout: {
          id: CommonUtils.uuID(8),
          type: 'layout',
          title: '布局',
          rows: [],
          customlayout: [],
          container: 'rows'
        }
      },
      {
        id: CommonUtils.uuID(8),
        type: 'customlayout',
        title: '右侧布局',
        layoutType: 'east',
        hidden: true,
        container: 'layout',
        span: '1',
        layout: {
          id: CommonUtils.uuID(8),
          type: 'layout',
          title: '布局',
          rows: [],
          customlayout: [],
          container: 'rows'
        }
      }

    ];

  }

  /**
 * open 收缩布局设置
 */
  public open() {

    this.customlayout_form = JSON.parse(JSON.stringify(this.customlayout)) ;
    this.size_isVisible = true;

  }

  /**
   * size_handleCancel
   */
  public size_handleCancel() {
    this.size_isVisible = false;
  }
  /**
   * size_handleOk
   */
  public size_handleOk() {
    this.size_isVisible = false;

    // 更改布局状态
    this.customlayout = JSON.parse(JSON.stringify(this.customlayout_form));
    this.config.customlayout = this.customlayout;
    this.initCustomLayout();
  }



  /**
   * 更新布局区域
   */
  public updateSingleChecked(): void {
    this.checkOptionsOne.layoutState.forEach(op => {
      this.customlayout_form.forEach(lay => {
        if (lay.layoutType === op.value) {
          lay.hidden = !op.checked;
        }
      });
    });

  }


}
