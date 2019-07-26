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

    public toolbarAction(btn, targetViewId) {
        // 按钮区分具体的,状态(STATE)、行为(BEHAVIOR)、动作(ACTION)、操作(OPERATION),跳转(LINK)
        // 状态: 新增(NEW)、编辑(EDIT)、只读(READ_ONLY)
        // 行为: 弹出框(DIALOG)、刷新(REFRESH)、显示、隐藏(SHOW)
        // 操作: 新增保存、更新保存、删除、行选中、行勾选...
        // 动作: 
        // 跳转: 判断跳转(LINK_TO)、直接跳转(LINK)
        setTimeout(_ => {
            this.toolbarsIsLoading[btn.name] = false;
        }, 150);

        if (!this.toolbarsIsLoading[btn.name]) {
            // 根据触发类型发送不同类型的具体消息内容
            const btn_source$ = from(btn.execute);
            btn_source$.pipe(map(exeCfg => this.sendBtnMessage(exeCfg, targetViewId))).subscribe().unsubscribe();

            // const triggerObj = {
            //     triggerType: btn.triggerType,
            //     trigger: btn.trigger
            // }
            // switch (btn.triggerType) {
            //     // 状态触发
            //     case BSN_TRIGGER_TYPE.STATE:
            //         const stateMsg = new BsnRelativesMessageModel(
            //             triggerObj,
            //             targetViewId
            //         );
            //         this._cpmtService.commonRelationTrigger.next(stateMsg);
            //         break;
            //     // 行为触发
            //     case BSN_TRIGGER_TYPE.BEHAVIOR:
            //         const behaviorMsg = new BsnRelativesMessageModel(
            //             triggerObj,
            //             targetViewId
            //         )
            //         this._cpmtService.commonRelationTrigger.next(behaviorMsg);
            //         break;
            //     // 动作触发
            //     case BSN_TRIGGER_TYPE.ACTION:
            //         const actionMsg = new BsnRelativesMessageModel(
            //             triggerObj,
            //             targetViewId,
            //             {}
            //         );
            //         this._cpmtService.commonRelationTrigger.next(actionMsg);
            //         break;
            //     // 操作触发
            //     case BSN_TRIGGER_TYPE.OPERATION:
            //         // 为ajaxConfig配置及联
            //         const ajaxCascade = {}
            //         const operationMsg = new BsnRelativesMessageModel(
            //             triggerObj,
            //             targetViewId,
            //             btn.ajaxConfig // 异步操作配置
            //         )
            //         this._cpmtService.commonRelationTrigger.next(operationMsg);
            //         break;
            //     // 链接跳转触发
            //     case BSN_TRIGGER_TYPE.LINK:
            //         const linkMsg = new BsnRelativesMessageModel(
            //             triggerObj,
            //             targetViewId,
            //             btn.link // 页面跳转配置
            //         )
            //         this._cpmtService.commonRelationTrigger.next(linkMsg);
            //         break;
            // }
            this.toolbarsIsLoading[btn.name] = true;
        }
    }

    private sendBtnMessage(cfg, targetViewId) {
        const triggerObj = {
            triggerType: cfg.triggerType,
            trigger: cfg.trigger
        }
        switch (cfg.triggerType) {
            // 状态触发
            case BSN_TRIGGER_TYPE.STATE:
                const stateMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId
                );
                this._cpmtService.commonRelationTrigger.next(stateMsg);
                break;
            // 行为触发
            case BSN_TRIGGER_TYPE.BEHAVIOR:
                const behaviorMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId
                )
                this._cpmtService.commonRelationTrigger.next(behaviorMsg);
                break;
            // 动作触发
            case BSN_TRIGGER_TYPE.ACTION:
                const actionMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId,
                    {}
                );
                this._cpmtService.commonRelationTrigger.next(actionMsg);
                break;
            // 操作触发
            case BSN_TRIGGER_TYPE.OPERATION:
                // 获取ajax操作配置
                // 获取条件状配置
                // 获取前置条件配置
                const options = {};
                options['ajaxConfig'] = this.findAjaxConfig(cfg.ajaxId);
                options['beforeOperation'] = this.findBeforeOperationConfig(cfg.stateId);
                options['condition'] = this.findConditionConfig(cfg.conditionId);
                const operationMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId,
                    options // 异步操作配置
                )
                this._cpmtService.commonRelationTrigger.next(operationMsg);
                break;
            // 链接跳转触发
            case BSN_TRIGGER_TYPE.LINK:
                const linkOptions = {};
                linkOptions['ajaxConfig'] = this.findAjaxConfig(cfg.ajaxId);
                linkOptions['beforeOperation'] = this.findBeforeOperationConfig(cfg.stateId);
                linkOptions['condition'] = this.findConditionConfig(cfg.conditionId);
                const linkMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId,
                    linkOptions // 页面跳转配置
                )
                this._cpmtService.commonRelationTrigger.next(linkMsg);
                break;
        }
    }


    private findAjaxConfig(ajaxId) {
        let ajaxConfig;
        if (this.config.ajaxConfig && Array(this.config.ajaxConfig) && this.config.ajaxConfig.length > 0) {
            const c = this.config.ajaxConfig.find(cfg => cfg.id === ajaxId);
            if (c) {
                ajaxConfig = c;
                if (ajaxConfig.result) {
                    for (const r of ajaxConfig.result) {
                        // 查找结果对应的消息配置
                        if (this.config.cascade.messageSender) {
                            const senderConfig = this.config.cascade.messageSender.find(sender => sender.id === r.senderId);
                            if (senderConfig) {
                                r['senderCfg'] = senderConfig;
                            }
                        }
                    }
                }
            }
        }
        return ajaxConfig;
    }



    private findBeforeOperationConfig(stateId) {
        let beforeConfig;
        if (this.config.beforeTrigger && Array(this.config.beforeTrigger) && this.config.beforeTrigger.length > 0) {
            const b = this.config.beforeTrigger.filter(cfg => cfg.id === stateId);
            if (b && b.length > 0) {
                beforeConfig = b[0];
            }

        }
        return beforeConfig;
    }

    public findConditionConfig(conditionId) {
        let conditionConfig;
        if (this.config.condition && Array(this.config.condition) && this.config.condition.length > 0) {
            const c = this.config.condition.filter(cfg => cfg.id === conditionId);
            if (c && c.length > 0) {
                conditionConfig = c[0];
            }
        }
        return conditionConfig;
    }

    public ngOnDestroy() {
        this.unsubscribeRelation();
    }
}
