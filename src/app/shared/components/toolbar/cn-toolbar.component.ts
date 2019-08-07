import { ButtonOperationResolver } from './../../resolver/buttonOperation/buttonOperation.resolver';
import { BSN_TRIGGER_TYPE } from './../../../core/relations/bsn-status';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { BSN_COMPONENT_SERVICES } from './../../../core/relations/bsn-relatives';
import { CnComponentBase } from './../cn-component.base';
import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Type,
    Inject,
    ViewEncapsulation
} from '@angular/core';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'cn-toolbar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './cn-toolbar.component.html',
    styles: [
        `
            .table-operations {
                padding-bottom: 3px;
            }

            .table-operations .ant-btn-group {
                margin-right: 4px;
                margin-bottom: 2px;
            }
        `
    ]
})
export class CnToolbarComponent extends CnComponentBase implements OnInit, OnDestroy {
    @Input()
    public config;
    @Input()
    public size;
    @Input()
    public permissions = [];
    @Input()
    public viewId;
    public toolbarConfig = [];
    public model;
    public _cascadeState;
    public toolbars;
    public toolbarsIsLoading = [];
    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        private _cpmtService: ComponentServiceProvider
    ) {
        super(_cpmtService);
    }

    public ngOnInit() {

        this.toolbarConfig = this.config.toolbar;
        // this.toolbarConfig.map(group => {
        //     group.group.map(btn => {
        //         btn['state'] = 'text'
        //     });
        // });
        // if (Array.isArray(this.config)) {
        //     this.toolbars = this.config;
        // } else if (this.config) {
        //     if (this.config.hasOwnProperty('toolbar')) {
        //         this.toolbars = this.config.toolbar;
        //     }
        // }
        // this.getPermissions();
    }

    public getPermissions() {
        const permissionMap = new Map();
        this.permissions.forEach(item => {
            permissionMap.set(item.code, item);
        });
        if (this.toolbars && Array.isArray(this.toolbars)) {
            this.toolbars.forEach(item => {
                if (item.group) {
                    const groups = [];
                    item.group.forEach(g => {
                        const Loading = {};
                        Loading[g.name] = false;
                        this.toolbarsIsLoading.push(Loading);
                        if (permissionMap.has(g.name)) {
                            groups.push({ ...g });
                        } else if (g.cancelPermission) {
                            groups.push({ ...g });
                        }
                    });

                    this.toolbarConfig.push({ group: groups });
                } else if (item.dropdown) {
                    const dropdown = [];
                    item.dropdown.forEach(b => {
                        let is_dropdown = true;
                        if (permissionMap.has(b.name)) {
                            is_dropdown = false;
                        } else if (b.cancelPermission) {
                            is_dropdown = false;
                        }
                        if (is_dropdown) {
                            return true;
                        }
                        const down: any = {};
                        const { name, text, icon } = b;
                        down.name = name;
                        down.text = text;
                        down.icon = icon;
                        down.buttons = [];
                        b.buttons.forEach(btn => {
                            //  const Loading = {};
                            //  Loading[btn.name] = false;
                            //  this.toolbarsisLoading.push(Loading);
                            if (permissionMap.has(btn.name)) {
                                down.buttons.push({ ...btn });
                            } else if (btn.cancelPermission) {
                                down.buttons.push({ ...btn });
                            }
                        });
                        dropdown.push(down);
                    });
                    this.toolbarConfig.push({ dropdown });
                }
            });
        }
    }

    public action(btn, targetViewId) {
        setTimeout(_ => {
            this.toolbarsIsLoading[btn.name] = false;
        }, 150);

        if (!this.toolbarsIsLoading[btn.name]) {
            // 根据触发类型发送不同类型的具体消息内容
            // const btn_source$ = from(btn.execute);
            // btn_source$.pipe(map(exeCfg => this.sendBtnMessage(exeCfg, targetViewId))).subscribe().unsubscribe();
            const actions = this.toolbarConfig.find(t => t.targetViewId === targetViewId);
            const dataOfState = { 'state': btn.state, 'actions': actions.group }
            if (btn.toggle && btn.toggle.type) {
                switch (btn.toggle.type) {
                    case 'state':
                        const stateValue = dataOfState[btn.toggle.type];
                        if (btn.toggle.values) {
                            const valueObj = btn.toggle.values.find(val => val.name === stateValue);
                            valueObj && (btn[btn.toggle.toggleProperty] = valueObj.value);
                        }

                        break;
                    case '...':
                        break;
                }
            }
            const state = '';

            const btnResolver = new ButtonOperationResolver(this._cpmtService, this.config, dataOfState);
            btnResolver.toolbarAction(btn, targetViewId);

            this.toolbarsIsLoading[btn.name] = true;
        }
    }



    public ngOnDestroy() {
        this.unsubscribeRelation();
    }
}
