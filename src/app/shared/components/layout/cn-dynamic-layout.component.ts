import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild } from '@angular/core';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { LayoutBase, LayoutSize } from '@shared/resolver/layout/layout.base';
import { LayoutColumn } from '@shared/resolver/layout/layout.column';
import { LayoutRow } from '@shared/resolver/layout/layout.row';
import { CnComponentBase } from '../cn-component.base';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-dynamic-layout-resolver',
    templateUrl: './cn-dynamic-layout.component.html',
    styles: [
        `
        .ant-card {
            margin-bottom: 2px;
        }
        // .ant-card-body {
        //     padding: 6px;
        // }
        [nz-col] {
            padding-right: 0px;
        }
        .ant-layout {
            background: none;
        }
        `
    ]
})
export class CnDynamicLayoutComponent extends CnComponentBase  implements OnInit {
    @Input() public layoutObj;
    @Input() public initData;
    @Input() public tempData;
    @Input() public dataServe;
    constructor(  @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider,) {
        super(componentService);
    }

    public ngOnInit() {
        console.log('layout init---', this.initData, this.tempData);
        if (this.layoutObj) {
            if(!this.layoutObj.pageHeader){
                this.resolver(this.layoutObj);
            } 
        }
        if(  this.dataServe)
        this.dataServe && this.dataServe.data.push({id:2});
        this.dataServe && this.dataServe.setComponentValue('002',{name:333});
        console.log('******', this.layoutObj,this.dataServe);
    }
    public resolver(cfg) {
        switch (cfg.container) {
            case 'rows':
                return this.buildNormalObj(cfg);
            // case 'customLayout':
            //     return this.buildCustomerObj(cfg);
            // case 'tabContent':
            //     return this.buildTabsObj(cfg);
            // case 'pageHeader':
            //     return this.buildPageHeaderObj(cfg.pageHeader);
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
                        newCol.icon = c.icon;
                        newCol.type = c.type;
                        newCol.title = c.title;
                        newCol.span = c.span;
                        newCol.noBorder = c.noBorder ? true : false;
                        newCol.bodyStyle = c.bodyStyle;
                        newCol.size = new LayoutSize(c.size);
                        newCol.container = c.container;
                        newCol.header = c.header;
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
                containerObj.component = containerCfg.component;
                break;
            case 'rows':
                containerObj.rows = containerCfg.rows;
                break;
        }
    }
    private setHeader(headerCfg) {
        const header: any = headerCfg;
        if (headerCfg.id) {
            header['toolbar'] = this.getMenuComponentConfigById(headerCfg.id);
            // liu 20.11.12
           // header['toolbar'] = this.componentService.cacheService.getNone(headerCfg.id);
        }

        return header;
    }
}
