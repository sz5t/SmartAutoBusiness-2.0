import { CommonUtils } from './../../../core/utils/common-utils';
import { CnComponentBase } from './../cn-component.base';
import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild, OnChanges } from '@angular/core';
import { NzTabChangeEvent } from 'ng-zorro-antd';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-tabs-resolver',
    templateUrl: './cn-tabs.component.html',
    styles: [
        `
        .ant-tabs-bar {
            margin-bottom: 2px;
        }
        `
    ]
})
export class CnTabsComponent extends CnComponentBase implements OnInit {
    @Input() public tabsObj;
    public _currentIndex = 0;
    @Input() initData;
    @Input() tempData;
    @Input() public dataServe;
    public selectedIndex = 0;
    public tabsConfig: any[] = [];
    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider) {
        super(componentService);
        // 初始化组件内置对象, 必须要做的事情,否则无法将内置参数值进行传递
        if (this.initData) {
            this.initValue = this.initData;
        } else {
            this.initValue = {};
        }
        if (this.tempData) {
            this.tempValue = this.tempData;
        } else {
            this.tempValue = {};
        }
    }

    public ngOnInit() {
        this.tabsConfig = this.tabsObj._tabContent;
    }

    public tabChange(tab: NzTabChangeEvent) {
        setTimeout(() => {
            const currentTab = this.tabsConfig[tab.index];
            currentTab['active'] = true;
            this.selectedIndex = tab.index;
        });
    }

    public reloadTabContent() {
        this.tabsConfig[this.selectedIndex] = CommonUtils.deepCopy(this.tabsConfig[this.selectedIndex]);
    }

    public selectedIndexEvent($event) {
        console.log($event);
    }

    public setActiveByMapping(mappingData) {
        let setIndex = 0;
        if (Array.isArray(this.tabsObj.tabActiveMapping) && this.tabsObj.tabActiveMapping.length > 0) {
            this.tabsObj.tabActiveMapping.map(m => {
                if (mappingData[m['field']] && mappingData[m['field']] === m['matchValue']) {
                    setIndex = this.tabsConfig.findIndex(t => t.id === m.targetId);
                    this.tabsConfig[setIndex ? setIndex : 0]['active'] = true
                    this.tabsConfig.filter(t => t.id !== m.targetId).map(t => t.active = false);
                } else {

                }
            })
        }
        this.tabsConfig = CommonUtils.deepCopy(this.tabsConfig);
        this.selectedIndex = setIndex;
    }

    public tabActive(tab) {
        // setTimeout(() => {
        //     tab['active'] = true;
        // });

    }

    public tabDisactive(tab) {
        setTimeout(() => {
            tab['active'] = false;
        });

    }
}
