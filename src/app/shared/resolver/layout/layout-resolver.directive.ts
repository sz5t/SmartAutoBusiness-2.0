import { CnCustomLayoutComponent } from './../../components/layout/cn-custom-layout.component';
import { CnTabsComponent } from './../../components/layout/cn-tabs.component';
import { CommonUtils } from '../../../core/utils/common-utils';
import { LayoutRow } from './layout.row';
import { LayoutBase, LayoutSize } from './layout.base';
import { LayoutColumn } from './layout.column';
import { LayoutTabs, LayoutTab } from './layout.tabs';
import { Directive, OnInit, Input, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { CnLayoutComponent } from '@shared/components/layout/cn-layout.component';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: ' [cnLayoutResolverDirective]'
})
export class CnLayoutResolverDirective implements OnInit, OnDestroy {
    @Input() config;
    private component: ComponentRef<any>;
    constructor(
        private _resolver: ComponentFactoryResolver,
        private _container: ViewContainerRef
    ) {

    }

    ngOnInit() {
        let configObj;
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
                case 'customLayout':
                    this.buildCustomerLayout(configObj);
                    break;
                default:
                    this.buildLayout(configObj);
            }

        }
    }

    ngOnDestroy(): void {

    }

    private buildLayout(layoutObj: any) {

        const layout = this._resolver.resolveComponentFactory<any>(
            CnLayoutComponent
        );
        this._container.clear();
        this.component = this._container.createComponent(layout);
        this.component.instance.layoutObj = layoutObj;
    }

    private buildLayoutRows(layoutObj: any) {
        const layout = this._resolver.resolveComponentFactory<any>(
            CnLayoutComponent
        ); 
        this._container.clear();
        this.component = this._container.createComponent(layout);
        this.component.instance.layoutObj = layoutObj;
    }

    private buildTabsLayout(tabsObj: any) {
        const tabset = this._resolver.resolveComponentFactory<any>(
            CnTabsComponent
        );
        this._container.clear();
        this.component = this._container.createComponent(tabset);
        this.component.instance.tabsObj = tabsObj;
    }

    private buildCustomerLayout(customLayoutObj: any) {
        const customLayout = this._resolver.resolveComponentFactory<any>(
            CnCustomLayoutComponent
        );
        this._container.clear();
        this.component = this._container.createComponent(customLayout);
        this.component.instance.config = customLayoutObj;
    }




    public resolver(cfg) {
        switch (cfg.container) {
            case 'rows':
                return this.buildNormalObj(cfg);
            case 'customLayout':
                return this.buildCustomerObj(cfg);
            case 'tabContent':
                return this.buildTabsObj(cfg);
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
                        newCol.size = new LayoutSize(c.size);
                        newCol.container = c.container;
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
            case 'component':
                containerObj.component = containerCfg.component;
                break;
            case 'rows':
                containerObj.rows = containerCfg.rows;
                break;
        }
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
        newTabs.container = cfg.container;
        newTabs.tabContent = cfg.tabContent;
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


}