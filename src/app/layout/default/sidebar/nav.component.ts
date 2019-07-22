import { Component, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef, Inject, ElementRef, Input, Output, HostListener, OnInit, OnDestroy } from '@angular/core';
import { SettingsService, MenuService, Menu } from '@delon/theme';
import { Router, NavigationEnd } from '@angular/router';
import { LocationStrategy, DOCUMENT } from '@angular/common';
import { EventEmitter } from 'events';
import { filter } from 'rxjs/operators';

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
  route$;
  change$;

  floatingEl;
  SHOWCLS = 'ad-nav__floating-show';
  FLOATINGCLS = 'ad-nav__floating';
  constructor(
    private _menuService: MenuService,
    private _settings: SettingsService,
    private _router: Router,
    private _locationStrategy: LocationStrategy,
    private _render: Renderer2,
    private _cd: ChangeDetectorRef,
    @Inject(DOCUMENT)
    private _doc,
    private _el: ElementRef
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
      this._cd.detectChanges();
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
