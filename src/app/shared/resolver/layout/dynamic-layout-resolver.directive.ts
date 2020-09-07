import { CN_LAYOUT_DIRECTIVE_RESOLVER_METHOD } from '../../../core/relations/bsn-methods/layout-directive-resolver-methods';
import { CnComponentBase } from '../../components/cn-component.base';
import { CnCustomLayoutComponent } from '../../components/layout/cn-custom-layout.component';
import { CnTabsComponent } from '../../components/layout/cn-tabs.component';
import { CommonUtils } from '../../../core/utils/common-utils';
import { LayoutRow } from './layout.row';
import { LayoutBase, LayoutSize } from './layout.base';
import { LayoutColumn } from './layout.column';
import { LayoutTabs, LayoutTab } from './layout.tabs';
import { Directive, OnInit, Input, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Inject } from '@angular/core';
import { CnLayoutComponent } from '@shared/components/layout/cn-layout.component';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { Subject, Subscription } from 'rxjs';
import { RelationResolver } from '../relation/relation.resolver';
import { CnPageHeaderComponent } from '@shared/components/layout/cn-page-header.component';
import { LayoutPageHeader } from './layout.page-header';
import { CnDynamicPageHeaderComponent } from '@shared/components/layout/cn-dynamic-page-header.component';
import { CnDynamicLayoutComponent } from '@shared/components/layout/cn-dynamic-layout.component';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: ' [CnDynamicLayoutResolverDirective]'
})
export class CnDynamicLayoutResolverDirective extends CnComponentBase implements OnInit, OnDestroy {
    /**
     * layoutJson:{}
     * componentsJson:{}
     */

    @Input() config: any;
    @Input() public tempData;
    @Input() public initData;
    @Input() public dataServe;
  

    private _layoutObj: ComponentRef<any>;
    private _rowsObj: ComponentRef<any>;
    private _tabObj: ComponentRef<any>;
    private _customObj: ComponentRef<any>;
    private _pageHeaderObj: ComponentRef<CnPageHeaderComponent>;

    private component: ComponentRef<any>;
    public COMPONENT_METHODS = CN_LAYOUT_DIRECTIVE_RESOLVER_METHOD;
    public COMPONENT_PROPERTY = {};

    private _sender_source$: Subject<any>;
    private _receiver_source$: Subject<any>;
    private _trigger_source$: Subject<any>;

    private _receiver_subscription$: Subscription;
    private _sender_subscription$: Subscription;
    private _trigger_receiver_subscription$: Subscription;
    constructor(
        private _resolver: ComponentFactoryResolver,
        private _container: ViewContainerRef,
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {
        super(componentService);
        this.cacheValue = this.componentService.cacheService;
        if (this.tempData) {
            this.tempValue = this.tempData;
        } else {
            this.tempValue = {};
        }
        if (this.initData) {
            this.initValue = this.initData;
        } else {
            this.initValue = {};
        }

    }

    /**
    * 解析级联消息
    */
    private resolveRelations() {
        if (this.config && this.config['cascade'] && this.config.cascade.messageSender) {
            if (!this._sender_source$) {
                // 解析组件发送消息配置,并注册消息发送对象
                this._sender_source$ = new RelationResolver(this).resolveSender(this.config);
                this._sender_subscription$ = this._sender_source$.subscribe();
            }

        }
        if (this.config && this.config.cascade && this.config.cascade.messageReceiver) {
            // 解析消息接受配置,并注册消息接收对象
            // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
            // this._receiver_subscription$ = this._receiver_source$.subscribe();
            new RelationResolver(this).resolveReceiver(this.config);
        }

        this.config && (this._trigger_source$ = new RelationResolver(this).resolve());

    }

    ngOnInit() {
        let configObj;
        this.resolveRelations();
        if (this.config) {
            configObj = this.resolver(this.config);
        }
        if (configObj) {
            switch (configObj.container) {
                case 'rows':
                    this.buildLayoutRows(configObj);
                    break;
                case 'tabContent':
                    this.buildTabsLayout(configObj);
                    break;
                case 'pageHeader':
                    this.buildPageHeader(configObj);
                    break;
                case 'customLayout':
                    this.buildCustomerLayout(configObj);
                    break;
                default:
                    this.buildLayout(configObj);
            }

        }
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    public receiveMessage(data) {
        if (this._tabObj) {
            let _initValue_new = {...this.initValue};
            let _tempValue_new = {...this.tempValue};
            this._tabObj.instance['initData'] = _initValue_new;
            this._tabObj.instance['tempData'] = _tempValue_new;
            this._tabObj.instance.reloadTabContent();
            // this._tabObj.instance.tabsObj = CommonUtils.deepCopy(this._tabObj.instance.tabsObj);
        }
    }

    public tabActiveChangeByMapping(data) {
        if (this._tabObj) {
            let _initValue_new = {...this.initValue};
            let _tempValue_new = {...this.tempValue};
            this._tabObj.instance['initData'] = _initValue_new;
            this._tabObj.instance['tempData'] = _tempValue_new;
            this._tabObj.instance.setActiveByMapping(data);
            // this._tabObj.instance.tabsObj = CommonUtils.deepCopy(this._tabObj.instance.tabsObj);
        }
    }

    ngOnDestroy(): void {
        // 释放级联对象
        this.unsubscribeRelation();
        // 释放及联接受对象
        if (this._receiver_subscription$) {
            this._receiver_subscription$.unsubscribe();
        }

        if (this._sender_subscription$) {
            this._sender_subscription$.unsubscribe();
        }

        // 释放触发器对象
        if (this._trigger_receiver_subscription$) {
            this._trigger_receiver_subscription$.unsubscribe();
        }

        if (this._trigger_source$) {
            this._trigger_source$.unsubscribe();
        }

        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

    private buildPageHeader(pageHeaderObj: any) {
        // console.log('buildLayout Receive message --', this.initValue, this.tempValue);
        const cmpt = this._resolver.resolveComponentFactory<any>(
            CnDynamicPageHeaderComponent
        );
        this._container.clear();
        this._pageHeaderObj = this._container.createComponent(cmpt);
        this._pageHeaderObj.instance.headerConfig = pageHeaderObj;
        if (this.tempValue) {
            this._pageHeaderObj.instance['tempData'] = this.tempData;
        }
        if (this.initValue) {
            this._pageHeaderObj.instance['initData'] = this.initData;
        }
        this._pageHeaderObj.instance['dataServe'] = this.dataServe;
    }

    private buildLayout(layoutObj: any) {
        // console.log('buildLayout Receive message --', this.initValue, this.tempValue);
        const cmpt = this._resolver.resolveComponentFactory<any>(
            CnDynamicLayoutComponent
        );
        this._container.clear();
        this._layoutObj = this._container.createComponent(cmpt);
        this._layoutObj.instance.layoutObj = layoutObj;
        if (this.tempValue) {
            this._layoutObj.instance['tempData'] = this.tempData;
        }
        if (this.initValue) {
            this._layoutObj.instance['initData'] = this.initData;
        }
        this._layoutObj.instance.dataServe = this.dataServe;
    }

    private buildLayoutRows(layoutObj: any) {
        // console.log('buildLayoutRows Receive message --', this.initData, this.tempData);
        const cmpt = this._resolver.resolveComponentFactory<any>(
            CnDynamicLayoutComponent
        );
        this._container.clear();
        this._rowsObj = this._container.createComponent(cmpt);
        this._rowsObj.instance.layoutObj = layoutObj;
        if (this.tempValue) {
            this._rowsObj.instance['tempData'] = this.tempData;
        }
        if (this.initValue) {
            this._rowsObj.instance['initData'] = this.initData;
        }
        this._rowsObj.instance.dataServe = this.dataServe;
    }

    private buildTabsLayout(tabsObj: any) {
        // console.log('tabsObj Receive message --', this.initData, this.tempData);
        const cmpt = this._resolver.resolveComponentFactory<any>(
            CnTabsComponent
        );
        this._container.clear();
        this._tabObj = this._container.createComponent(cmpt);
        this._tabObj.instance.tabsObj = tabsObj;
        if (this.tempValue) {
            this._tabObj.instance['tempData'] = this.tempData;
        }
        if (this.initValue) {
            this._tabObj.instance['initData'] = this.initData;
        }
        this._tabObj.instance.dataServe = this.dataServe;
    }

    private buildCustomerLayout(customLayoutObj: any) {
        // console.log('customLayoutObj Receive message --', this.initValue, this.tempValue);
        const cmpt = this._resolver.resolveComponentFactory<any>(
            CnCustomLayoutComponent
        );
        this._container.clear();
        this._customObj = this._container.createComponent(cmpt);
        this._customObj.instance.config = customLayoutObj;
        if (this.tempValue) {
            this._customObj.instance['tempData'] = this.tempData;
        }
        if (this.initValue) {
            this._customObj.instance['initData'] = this.initData;
        }
        this._customObj.instance.dataServe = this.dataServe;
    }

    public resolver(cfg) {
        switch (cfg.container) {
            case 'rows':
                return this.buildNormalObj(cfg);
            case 'customLayout':
                return this.buildCustomerObj(cfg);
            case 'tabContent':
                return this.buildTabsObj(cfg);
            case 'pageHeader':
                return this.buildPageHeaderObj(cfg.pageHeader);
            case 'layout':
                return this.resolver(cfg);
        }
    }

    private buildNormalObj(cfg): LayoutBase {
        const newLayout = new LayoutBase();
        newLayout.container = cfg.container;
        newLayout.rows = [];
        if (Array.isArray(cfg.rows) && cfg.rows.length > 0) {
            for (const row of cfg.rows) {
                const newRow = new LayoutRow(row.id, row.type, row.title);
                newRow.cols = [];
                if (Array.isArray(row.cols) && row.cols.length > 0) {
                    for (const c of row.cols) {
                        const newCol = new LayoutColumn();
                        newCol.id = c.id;
                        newCol.type = c.type;
                        newCol.title = c.title;
                        newCol.span = c.span;
                        newCol.noBorder = c.noBorder ? true : false;
                        newCol.bodyStyle = c.bodyStyle;
                        newCol.size = new LayoutSize(c.size);
                        newCol.container = c.container;
                        c.header && (newCol.header = this.setHeader(c.header));
                        this.setContainer(newCol, c);
                        newRow.add(newCol);
                    }
                }
                newLayout.add(newRow);
            }
        }
        return newLayout;
    }

    private setContainer(containerObj, containerCfg) {
        switch (containerObj.container) {
            case 'layout':
                containerObj.layout = containerCfg.layout;
                break;
            case 'tabs':
                containerObj.tabs = containerCfg.tabs;
                break;
            case 'pageHeader':
                containerObj.pageHeader = containerCfg.pageHeader;
                break;
            case 'component':
                containerObj.component = this.findComponentById(containerCfg.component.id);
                break;
            case 'rows':
                containerObj.rows = containerCfg.rows;
                break;
        }
    }

    private findComponentById(id) {
        return this.componentService.cacheService.getNone(id);
        // return this.config.componentsJson.find(id);
    }

    private setHeader(headerCfg) {
        const header: any = headerCfg;
        if (headerCfg.id) {
            header['toolbar'] = this.componentService.cacheService.getNone(headerCfg.id);
        }

        return header;
    }

    private buildCustomerObj(cfg): LayoutBase {
        const newLayout = new LayoutBase();
        newLayout.container = cfg.container;
        newLayout.customLayout = [];
        if (Array.isArray(cfg.customLayout) && cfg.customLayout.length > 0) {
            for (const c of cfg.customLayout) {
                const layout = new LayoutBase();
                layout.id = c.id;
                layout.type = c.type;
                layout.title = c.title;
                layout.span = c.span;
                layout.hidden = c.hidden;
                layout.container = c.container;
                layout.layoutType = c.layoutType;
                this.setContainer(layout, c);
                newLayout.add(layout);
            }
        }
        return newLayout;
    }

    private buildTabsObj(cfg): any {
        const newTabs = new LayoutTabs();
        newTabs.tabType = cfg.tabType;
        newTabs.container = cfg.container;
        newTabs.tabContent = cfg.tabContent;
        newTabs.tabActiveMapping = cfg.tabActiveMapping;
        // if (Array.isArray(cfg.container) && cfg.container.length > 0) {
        //     for (const tab of cfg.container) {
        //         const newTab = new LayoutTab();
        //         newTab.active = tab.active;
        //         newTab.id = tab.id;
        //         newTab.title = tab.title;
        //         newTab.type = tab.type;
        //         newTab.container = tab.container;
        //         if(tab.tabContent) {
        //             newTab.tabContent = tab.tabContent;
        //         }
        //         newTab.layout = this.resolver(tab.layout);
        //         newTabs.add(newTab);
        //     }
        // }
        return newTabs;
    }

    private buildPageHeaderObj(cfg): any {
        const newPageHeader = new LayoutPageHeader();
        newPageHeader.container = "pageHeader";
        newPageHeader.title = cfg.title;
        newPageHeader.type = cfg.type;
        newPageHeader.subTitle = cfg.subTitle;
        newPageHeader.tagColor = cfg.tagColor;
        newPageHeader.tagText = cfg.tagText;
        newPageHeader.descColumnsCount = cfg.descColumnsCount;
        newPageHeader.operations = cfg.operations;
        newPageHeader.contentItems = cfg.contentItems;
        newPageHeader.extraItems = cfg.extraItems;
        newPageHeader.ajaxConfig = cfg.ajaxConfig;
        newPageHeader.cascade = cfg.casacde;
        newPageHeader.headerMapping = cfg.headMapping;
        newPageHeader.contentMapping = cfg.contentMapping;
        newPageHeader.footMapping = cfg.footMapping;
        newPageHeader.extraMapping = cfg.extraMapping;
        newPageHeader.defaultLoading = cfg.defaultLoading;
        newPageHeader.layout = cfg.layout;
        return newPageHeader;
    }


}