import { Component, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef, Inject, ElementRef, Input, Output, HostListener, OnInit, OnDestroy } from '@angular/core';
import { SettingsService, MenuService, Menu } from '@delon/theme';
import { Router, NavigationEnd } from '@angular/router';
import { LocationStrategy, DOCUMENT } from '@angular/common';
import { EventEmitter } from 'events';
import { filter } from 'rxjs/operators';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { pageConfigCache } from '@env/page-config-cache';

@Component({
  selector: 'layout-nav',
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, OnDestroy {
  @Input()
  layoutCollapsed;
  @Input()
  public autoCloseUnderPad;
  @Output()
  public select;
  // @HostListener('onClick')
  // public onClick;
  public list: Menu[];
  public rootEl;
  public bodyEl;

  public menuList=[];
  route$;
  change$;

  floatingEl;
  SHOWCLS = 'ad-nav__floating-show';
  FLOATINGCLS = 'ad-nav__floating';
  public menus = [
    [{
      "text": "建模",
      "i18n": "menu.data.modeling",
      "group": true,
      "hideInBreadcrumb": true,
      "level": 1,
      "icon": "book",
      "children": [{
        "text": "数据建模",
        "i18n": "menu.data.datamodeling",
        "icon": "database",
        "level": 2,
        "link": "/template/datamodeling"
      },
      {
        "text": "SQL建模",
        "i18n": "menu.data.sqlmodeling",
        "icon": "database",
        "level": 2,
        "link": "/template/sqlmodeling"
      },
      {
        "text": "业务建模",
        "i18n": "menu.data.businessmodeling",
        "icon": "database",
        "level": 2,
        "link": "/template/businessmodeling"
      }
      ]
    },
    {
      "text": "页面管理",
      "i18n": "menu.page.pagemanage",
      "group": true,
      "hideInBreadcrumb": true,
      "level": 1,
      "icon": "book",
      "children": [{
        "text": "页面设计",
        "i18n": "menu.page.design",
        "icon": "file",
        "level": 2,
        "link": "/template/pageDesign"
      }]
    },
    {
      "text": "组件库",
      "i18n": "menu.cfg.base",
      "group": true,
      "hideInBreadcrumb": true,
      "level": 1,
      "icon": "book",
      "children": [{
        "text": "组件管理",
        "i18n": "menu.cfg.base.componentManager",
        "icon": "setting",
        "level": 2,
        "link": "/template/componentManager"
      },
      {
        "text": "属性管理",
        "i18n": "menu.cfg.base.innerPropertyManager",
        "icon": "database",
        "level": 2,
        "link": "/template/innerPropertyManager"
      },
      {
        "text": "功能管理",
        "i18n": "menu.cfg.base.innerMethodManager",
        "icon": "database",
        "level": 2,
        "link": "/template/innerMethodManager"
      },
      {
        "text": "配置管理",
        "i18n": "menu.cfg.base.configPropertyManager",
        "icon": "database",
        "level": 2,
        "link": "/template/configPropertyManager"
      }
      ]
    },
    {
      "text": "DEMO",
      "i18n": "menu.demo",
      "group": true,
      "hideInBreadcrumb": true,
      "level": 1,
      "icon": "book",
      "children": [{
        "text": "布局 Demo",
        "i18n": "menu.layout",
        "icon": "build",
        "level": 2,
        "children": [{
          "text": "布局 拖拽",
          "link": "/template/cfglayoutdemo",
          "i18n": "menu.layout.drop",
          "level": 3
        },
        {
          "text": "表单布局 拖拽",
          "link": "/template/cfgformdemo",
          "i18n": "menu.layout.formdrop",
          "level": 3
        },
        {
          "text": "布局 解析",
          "link": "/template/demo",
          "i18n": "menu.layout.analysis",
          "level": 3
        }
        ]
      },
      {
        "text": "组件 Demo",
        "i18n": "menu.components",
        "icon": "appstore",
        "level": 2,
        "children": [{
          "text": "表格",
          "link": "/template/dataTableDemo",
          "i18n": "menu.component.table",
          "level": 3
        },
        {
          "text": "树",
          "link": "/template/treeDemo",
          "i18n": "menu.component.tree",
          "level": 3
        },
        {
          "text": "树表",
          "link": "/template/treeTableDemo",
          "i18n": "menu.component.treeTable",
          "level": 3
        },
        {
          "text": "表单",
          "link": "/dashboard/analysis",
          "i18n": "menu.component.form",
          "level": 3
        },
        {
          "text": "步骤",
          "link": "/template/stepsDemo",
          "i18n": "menu.component.steps",
          "level": 3
        },
        {
          "text": "步骤圈",
          "link": "/template/datastepDemo",
          "i18n": "menu.component.datasteps",
          "level": 3
        },
        {
          "text": "步骤",
          "link": "/template/calendarDemo",
          "i18n": "menu.component.calendar",
          "level": 3
        },
        {
          "text": "页面测试",
          "link": "/template/dynamic/cyuTJW5vjcYMdT7JC6ylGEX8KTFVIqzL",
          "i18n": "menu.demo.pageTest",
          "level": 3
        }
        ]
      }
      ]
    },
    {
      "level": 1,
      "text": "主导航",
      "i18n": "menu.main",
      "group": true,
      "hideInBreadcrumb": true,
      "icon": "home",
      "children": [{
        "level": 2,
        "text": "仪表盘",
        "i18n": "menu.dashboard",
        "icon": "dashboard",
        "children": [{
          "level": 3,
          "text": "仪表盘V1",
          "link": "/dashboard/v1",
          "i18n": "menu.dashboard.v1"
        },
        {
          "level": 3,
          "text": "分析页",
          "link": "/dashboard/analysis",
          "i18n": "menu.dashboard.analysis"
        },
        {
          "level": 3,
          "text": "监控页",
          "link": "/dashboard/monitor",
          "i18n": "menu.dashboard.monitor"
        },
        {
          "level": 3,
          "text": "工作台",
          "link": "/dashboard/workplace",
          "i18n": "menu.dashboard.workplace"
        }
        ]
      },
      {
        "level": 2,
        "text": "小部件",
        "i18n": "menu.widgets",
        "link": "/widgets",
        "icon": "tool",
        "badge": 2
      }
      ]
    },
    {
      "level": 1,
      "text": "Alain",
      "i18n": "menu.alain",
      "group": true,
      "hideInBreadcrumb": true,
      "icon": "star",
      "children": [{
        "level": 2,
        "text": "样式",
        "i18n": "menu.style",
        "icon": "block",
        "children": [{
          "level": 3,
          "text": "Typography",
          "link": "/style/typography",
          "i18n": "menu.style.typography"
        },
        {
          "level": 3,
          "text": "Grid Masonry",
          "link": "/style/gridmasonry",
          "i18n": "menu.style.gridmasonry"
        },
        {
          "level": 3,
          "text": "Colors",
          "link": "/style/colors",
          "i18n": "menu.style.colors"
        }
        ]
      },
      {
        "level": 2,
        "text": "Delon",
        "i18n": "menu.delon",
        "icon": "loading",
        "children": [{
          "level": 3,
          "text": "Dynamic Form",
          "link": "/delon/form",
          "i18n": "menu.delon.form"
        },
        {
          "level": 3,
          "text": "Simple Table",
          "link": "/delon/st",
          "i18n": "menu.delon.table"
        },
        {
          "level": 3,
          "text": "Util",
          "link": "/delon/util",
          "i18n": "menu.delon.util",
          "acl": "role-a"
        },
        {
          "level": 3,
          "text": "Print",
          "link": "/delon/print",
          "i18n": "menu.delon.print",
          "acl": "role-b"
        },
        {
          "level": 3,
          "text": "QR",
          "link": "/delon/qr",
          "i18n": "menu.delon.qr"
        },
        {
          "level": 3,
          "text": "ACL",
          "link": "/delon/acl",
          "i18n": "menu.delon.acl"
        },
        {
          "level": 3,
          "text": "Route Guard",
          "link": "/delon/guard",
          "i18n": "menu.delon.guard"
        },
        {
          "level": 3,
          "text": "Cache",
          "link": "/delon/cache",
          "i18n": "menu.delon.cache"
        },
        {
          "level": 3,
          "text": "Down File",
          "link": "/delon/downfile",
          "i18n": "menu.delon.downfile"
        },
        {
          "level": 3,
          "text": "Xlsx",
          "link": "/delon/xlsx",
          "i18n": "menu.delon.xlsx"
        },
        {
          "level": 3,
          "text": "Zip",
          "link": "/delon/zip",
          "i18n": "menu.delon.zip"
        }
        ]
      }
      ]
    },
    {
      "level": 1,
      "text": "Pro",
      "i18n": "menu.pro",
      "group": true,
      "hideInBreadcrumb": true,
      "icon": "gold",
      "children": [{
        "level": 2,
        "text": "Form Page",
        "i18n": "menu.form",
        "link": "/pro/form",
        "icon": "loading",
        "children": [{
          "level": 3,
          "text": "Basic Form",
          "link": "/pro/form/basic-form",
          "i18n": "menu.form.basicform"
        },
        {
          "level": 3,
          "text": "Step Form",
          "link": "/pro/form/step-form",
          "i18n": "menu.form.stepform"
        },
        {
          "level": 3,
          "text": "Advanced Form",
          "link": "/pro/form/advanced-form",
          "i18n": "menu.form.advancedform"
        }
        ]
      },
      {
        "level": 2,
        "text": "List",
        "i18n": "menu.list",
        "icon": "loading",
        "children": [{
          "level": 3,
          "text": "Table List",
          "link": "/pro/list/table-list",
          "i18n": "menu.list.searchtable"
        },
        {
          "level": 3,
          "text": "Basic List",
          "link": "/pro/list/basic-list",
          "i18n": "menu.list.basiclist"
        },
        {
          "level": 3,
          "text": "Card List",
          "link": "/pro/list/card-list",
          "i18n": "menu.list.cardlist"
        },
        {
          "level": 3,
          "text": "Search List",
          "i18n": "menu.list.searchlist",
          "children": [{
            "level": 4,
            "link": "/pro/list/articles",
            "i18n": "menu.list.searchlist.articles"
          },
          {
            "level": 4,
            "link": "/pro/list/projects",
            "i18n": "menu.list.searchlist.projects"
          },
          {
            "level": 4,
            "link": "/pro/list/applications",
            "i18n": "menu.list.searchlist.applications"
          }
          ]
        }
        ]
      },
      {
        "level": 2,
        "text": "Profile",
        "i18n": "menu.profile",
        "icon": "loading",
        "children": [{
          "level": 3,
          "text": "Basic",
          "link": "/pro/profile/basic",
          "i18n": "menu.profile.basic"
        },
        {
          "level": 3,
          "text": "Advanced",
          "link": "/pro/profile/advanced",
          "i18n": "menu.profile.advanced"
        }
        ]
      },
      {
        "level": 2,
        "text": "Result",
        "i18n": "menu.result",
        "icon": "unordered-list",
        "children": [{
          "level": 3,
          "text": "Success",
          "link": "/pro/result/success",
          "i18n": "menu.result.success"
        },
        {
          "level": 3,
          "text": "Fail",
          "link": "/pro/result/fail",
          "i18n": "menu.result.fail"
        }
        ]
      },
      {
        "level": 2,
        "text": "Exception",
        "i18n": "menu.exception",
        "link": "/",
        "icon": "unordered-list",
        "children": [{
          "level": 3,
          "text": "403",
          "link": "/exception/403",
          "i18n": "menu.exception.not-permission",
          "reuse": false
        },
        {
          "level": 3,
          "text": "404",
          "link": "/exception/404",
          "i18n": "menu.exception.not-find",
          "reuse": false
        },
        {
          "level": 3,
          "text": "500",
          "link": "/exception/500",
          "i18n": "menu.exception.server-error",
          "reuse": false
        }
        ]
      },
      {
        "level": 2,
        "text": "Account",
        "i18n": "menu.account",
        "icon": "unordered-list",
        "children": [{
          "level": 3,
          "text": "center",
          "link": "/pro/account/center",
          "i18n": "menu.account.center"
        },
        {
          "level": 3,
          "text": "settings",
          "link": "/pro/account/settings",
          "i18n": "menu.account.settings"
        }
        ]
      }
      ]
    },
    {
      "level": 1,
      "text": "More",
      "i18n": "menu.more",
      "group": true,
      "hideInBreadcrumb": true,
      "icon": "menu",
      "children": [{
        "level": 2,
        "text": "Report",
        "i18n": "menu.report",
        "icon": "unordered-list",
        "children": [{
          "level": 3,
          "text": "Relation",
          "link": "/data-v/relation",
          "i18n": "menu.report.relation",
          "reuse": false
        }]
      },
      {
        "level": 2,
        "text": "Extras",
        "i18n": "menu.extras",
        "link": "/extras",
        "icon": "unordered-list",
        "children": [{
          "level": 3,
          "text": "Help Center",
          "link": "/extras/helpcenter",
          "i18n": "menu.extras.helpcenter"
        },
        {
          "level": 3,
          "text": "Settings",
          "link": "/extras/settings",
          "i18n": "menu.extras.settings"
        },
        {
          "level": 3,
          "text": "Poi",
          "link": "/extras/poi",
          "i18n": "menu.extras.poi"
        }
        ]
      }
      ]
    }
    ]
  ]
  constructor(
    private _menuService: MenuService,
    private _settings: SettingsService,
    private _router: Router,
    private _locationStrategy: LocationStrategy,
    private _render: Renderer2,
    private _cd: ChangeDetectorRef,
    @Inject(DOCUMENT)
    private _doc,
    private _el: ElementRef,
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
  ) {
    this.list = [];
    this.autoCloseUnderPad = true;
    this.select = new EventEmitter();
    this.rootEl = this._el.nativeElement;
  }

  ngOnInit() {

    // this.bodyEl = this._doc.querySelector('body');
    this._menuService.openedByUrl(this._router.url);
    // this.genFloatingContainer();
    this.change$ = this._menuService.change.subscribe(res => {
      this.list = res;
      // this._cd.detectChanges();
    });
    this.installUnderPad();
  }

  // floatingAreaClickHandle(e) {
  //   e.stopPropagation();
  //   const linkNode = e.target;
  //   if (linkNode.nodeName !== 'A') {
  //     return false;
  //   }
  //   let url = linkNode.getAttribute('href');
  //   if (url && url.startWith('#')) {
  //     url = url.slice(1);
  //   }
  //   if (linkNode.dataset.type === 'external') {
  //     return true;
  //   }

  //   const baseHref = this._locationStrategy.getBaseHref();
  //   if (baseHref) {
  //     url = url.slice(baseHref.length);
  //   }
  //   this._router.navigateByUrl(url);
  //   this.onSelect(this._menuService.getPathByUrl(url).pop());
  //   this.hideAll();
  //   e.preventDefault();
  //   return false;
  // }

  // clearFloatingContainer() {
  //   if (!this.floatingEl) {
  //     return;
  //   }
  //   this.floatingEl.removeEventListener('click', this.floatingAreaClickHandle.bind(this));
  //   if (this.floatingEl.hasOwnProperty('remove')) {
  //     this.floatingEl.remove();
  //   } else if (this.floatingEl.parentNode) {
  //     this.floatingEl.parentNode.removeChild(this.floatingEl);
  //   }
  // }

  // genFloatingContainer() {
  //   this.clearFloatingContainer();
  //   this.floatingEl = this._render.createElement('div');
  //   this.floatingEl.classList.add(this.FLOATINGCLS + '-container');
  //   this.floatingEl.addEventListener('click', this.floatingAreaClickHandle.bind(this), false);
  //   this.bodyEl.appendChild(this.floatingEl);
  // }

  // genSubNode(linkNode, item) {
  //   const id = `_sidebar-nav-${item.__id}`;
  //   const node = linkNode.nextElementSibling.cloneNode(true);
  //   node.id = id;
  //   node.classList.add(this.FLOATINGCLS);
  //   node.addEventListener('mouselevel', () => {
  //     node.classList.remove(this.SHOWCLS);
  //   }, false);
  //   this.floatingEl.appendChild(node);
  //   return node;
  // }

  // hideAll() {
  //   const allNode = this.floatingEl.querySelectorAll(this.FLOATINGCLS);
  //   for (let i = 0; i < allNode.length; i++) {
  //     allNode[i].classList.remove(this.SHOWCLS);
  //   }
  // }

  // calPos(linkNode, node) {
  //   const rect = linkNode.getBoundingClientRect();
  //   const scrollTop = Math.max(this._doc.documentElement.scrollTop, this.bodyEl.scrollTop);
  //   const docHeight = Math.max(this._doc.documentElement.clientHeight, this.bodyEl.clientHeight);
  //   let offsetHeight = 0;
  //   if (docHeight < rect.top + node.clientHeight) {
  //     offsetHeight = rect.top + node.clientHeight - docHeight;
  //   }
  //   node.style.top = `${rect.top + scrollTop - offsetHeight}px`;
  //   node.style.left = `${rect.right + 5}px`;
  // }

  // showSubMenu(e, item) {
  //   if (this._settings.layout.collapsed !== true) {
  //     return;
  //   }
  //   e.preventDefault();
  //   const linkNode = e.target;
  //   this.genFloatingContainer();
  //   const subNode = this.genSubNode(linkNode, item);
  //   this.hideAll();
  //   subNode.classList.add('ad-nav__floating-show');
  //   this.calPos(linkNode, subNode);
  // }

  // onSelect(item) {
  //   this.select.emit(item);
  // }

  // toggleOpen(item) {
  //   // this._menuService.visit((i, p) => {
  //   //   if (i !== item) {
  //   //     i._open = false;
  //   //   }
  //   // })

  //   // let pItem = item.__parent;
  //   // while (pItem) {
  //   //   pItem._open = true;
  //   //   pItem = pItem.__parent;
  //   // }
  //   // item._open = !item._open;
  //   // this._cd.markForCheck();
  // }

  onClick(menu) {
    console.log('====menu=====', menu);
    let activeMenu = {
      id: menu.id,
      jsonId: menu.jsonId,
      text:menu.text
    }
    this.componentService.cacheService.set('activeMenu', activeMenu);

    // liu 20.11.12 只缓存5个页面数据
    let index = this.menuList.findIndex(item=>item.id=== menu.id);
    if(index<0){
      this.menuList=[activeMenu, ...this.menuList];
    }
    if(this.menuList.length>5){
      this.menuList  = this.menuList.slice(0,5);
    }
    for (const key in pageConfigCache) {
      let index = this.menuList.findIndex(item=>item.id=== key);
      if(index<0){
        pageConfigCache[key]={pageConfig:{},permissionConfig:{}};
      }
    }
    //console.log('缓存信息',this.menuList);
    pageConfigCache[menu.id]={pageConfig:{},permissionConfig:{}};
    this._router.navigateByUrl(menu.link);
    // this.hideAll();
  }

  ngOnDestroy() {
    this.change$.unsubscribe();
    if (this.route$)
      this.route$.unsubscribe();
    // this.clearFloatingContainer();
  }

  installUnderPad() {
    if (!this.autoCloseUnderPad) {
      return;
    }
    this.route$ = ((this._router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(s => this.underPad())
    ));
    this.underPad();
  }

  underPad() {
    if (window.innerWidth < 992 && !this._settings.layout.collapsed) {
      console.log('underPad');
      setTimeout(() => this._settings.setLayout('collapsed', true));
    }
  }






}
