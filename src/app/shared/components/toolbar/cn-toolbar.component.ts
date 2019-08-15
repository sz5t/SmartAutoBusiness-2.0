import { IToolbarTrigger } from './../../../core/relations/bsn-trigger/toolbar.trigger.interface';
import { CN_TOOLBAR_METHOD } from './../../../core/relations/bsn-methods';
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
import { from, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';

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


    private _sender_source$: Subject<any>;
    private _receiver_source$: Subject<any>;
    private _trigger_source$: Subject<any>;

    private _receiver_subscription$: Subscription;
    private _sender_subscription$: Subscription;
    private _trigger_receiver_subscription$: Subscription;

    public COMPONENT_METHODS = CN_TOOLBAR_METHOD;

    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {
        super(componentService);
    }

    public ngOnInit() {

        this.toolbarConfig = this.config.toolbar;

        if (this.config.cascade && this.config.cascade.messageReceiver) {
            // 解析消息接受配置,并注册消息接收对象
            this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
            this._receiver_subscription$ = this._receiver_source$.subscribe();
        }

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

            const btnResolver = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
            btnResolver.toolbarAction(btn, targetViewId);
            this.toolbarsIsLoading[btn.name] = true;
        }
    }

    public stateToText(option) {
        const actions = this.toolbarConfig.find(t => t.targetViewId === option.targetViewId);
        const dataOfState = { 'state': 'text', 'actions': actions.group }
        const btnResolver = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
        const btn = { execute: [{ trigger: 'EXECUTE_NONE', triggerType: 'STATE' }] }
        btnResolver.toolbarAction(btn, option.targetViewId);


    }

    public stateToEdit(option) {
        const actions = this.toolbarConfig.find(t => t.targetViewId === option.targetViewId);
        const dataOfState = { 'state': 'edit', 'actions': actions.group }
        const btnResolver = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
        const btn = { execute: [{ trigger: 'EXECUTE_NONE_EDIT', triggerType: 'STATE' }] }
        btnResolver.toolbarAction(btn, option.targetViewId);
    }

    public executeNone() {

    }

    public executeNoneEdit() {

    }

    public ngOnDestroy() {
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
    }
}
