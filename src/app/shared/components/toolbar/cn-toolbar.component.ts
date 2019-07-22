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

    toolbar = [
        {
            "targetViewId": "",
            "group": [
                {
                    "name": "M_refresh",
                    "text": "刷新",
                    "triggerType": "BEHAVIOR",
                    "trigger": "REFRESH",
                    "icon": "reload",
                    "color": "text-primary"
                },
                {
                    "name": "M_addRow",
                    "text": "新增",
                    "triggerType": "STATE",
                    "trigger": "NEW",
                    "icon": "plus",
                    "color": "text-primary"
                },
                {
                    "name": "M_updateRow",
                    "text": "修改",
                    "triggerType": "STATE",
                    "trigger": "EDIT",
                    "icon": "edit",
                    "color": "text-success"
                },
                {
                    "name": "M_deleteRow",
                    "text": "删除",
                    "icon": "delete",
                    "color": "text-red-light",
                    "triggerType": "OPERATION",
                    "trigger": "EXECUTE_CHECKED",
                    "ajaxConfig": [
                        {
                            "url": "common/DeleteResourcesMalfunction",
                            "ajaxType": "post",
                            "title": "提示",
                            "message": "确定要删除该故障记录吗？删除后对应明细信息也全选删除！",
                            "params": [
                                {
                                    "name": "Id",
                                    "valueName": "Id",
                                    "type": "checkedRow"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "M_saveRow",
                    "text": "保存",
                    "icon": "save",
                    "color": "text-primary",
                    "ajaxConfig": [
                        {
                            "action": "EXECUTE_SAVE_ROW",
                            "url": "common/WmsResourcesmalfunction",
                            "ajaxType": "post",
                            "params": [
                                {
                                    "name": "datatype",
                                    "type": "value",
                                    "value": 1
                                },
                                {
                                    "name": "malfunctiondate",
                                    "type": "componentValue",
                                    "valueName": "malfunctiondate"
                                },
                                {
                                    "name": "register",
                                    "type": "cacheValue",
                                    "valueName": "accountId"
                                },
                                {
                                    "name": "registerdate",
                                    "type": "componentValue",
                                    "valueName": "registerdate",
                                    "value": "_currentDate"
                                },
                                {
                                    "name": "recordstatus",
                                    "type": "value",
                                    "valueName": "",
                                    "value": 1
                                },
                                {
                                    "name": "securitylevel",
                                    "type": "componentValue",
                                    "valueName": "securitylevel"
                                },
                                {
                                    "name": "sortcode",
                                    "type": "componentValue",
                                    "valueName": "sortcode"
                                },
                                {
                                    "name": "deleteflag",
                                    "type": "componentValue",
                                    "valueName": "deleteflag"
                                },
                                {
                                    "name": "remark",
                                    "type": "componentValue",
                                    "valueName": "remark"
                                }
                            ]
                        },
                        {
                            "action": "EXECUTE_EDIT_ROW",
                            "url": "common/WmsResourcesmalfunction",
                            "ajaxType": "put",
                            "params": [
                                {
                                    "name": "Id",
                                    "type": "componentValue",
                                    "valueName": "Id",
                                    "value": ""
                                },
                                {
                                    "name": "malfunctiondate",
                                    "type": "componentValue",
                                    "valueName": "malfunctiondate"
                                },
                                {
                                    "name": "register",
                                    "type": "cacheValue",
                                    "valueName": "accountId"
                                },
                                {
                                    "name": "registerdate",
                                    "type": "componentValue",
                                    "valueName": "registerdate"
                                },
                                {
                                    "name": "recordstatus",
                                    "type": "value",
                                    "valueName": "",
                                    "value": 1
                                },
                                {
                                    "name": "securitylevel",
                                    "type": "componentValue",
                                    "valueName": "securitylevel"
                                },
                                {
                                    "name": "sortcode",
                                    "type": "componentValue",
                                    "valueName": "sortcode"
                                },
                                {
                                    "name": "deleteflag",
                                    "type": "componentValue",
                                    "valueName": "deleteflag"
                                },
                                {
                                    "name": "remark",
                                    "type": "componentValue",
                                    "valueName": "remark"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "M_cancelrow",
                    "text": "取消",
                    "action": "CANCEL",
                    "icon": "rollback",
                    "color": "text-grey-darker"
                }
            ]
        },
        {
            "targetViewId": "",
            "group": [
                {
                    "name": "M_addSearchRow",
                    "text": "查询",
                    "action": "SEARCH",
                    "actionType": "addSearchRow",
                    "actionName": "addSearchRow",
                    "icon": "search",
                    "color": "text-primary"
                },
                {
                    "name": "M_cancelSearchRow",
                    "text": "取消查询",
                    "icon": "rollback",
                    "action": "SEARCH",
                    "actionType": "cancelSearchRow",
                    "actionName": "cancelSearchRow",
                    "color": "text-grey-darker"
                }
            ]
        },
        {
            "targetViewId": "",
            "group": [
                {
                    "name": "M_ResourcesMalfunction",
                    "text": "故障确认",
                    "icon": "setting",
                    "color": "text-primary",
                    "ajaxConfig": [
                        {
                            "action": "EXECUTE_CHECKED_ID",
                            "url": "common/UpdateResourcesMalfunction",
                            "ajaxType": "post",
                            "title": "提示",
                            "message": "确定要进行【故障】登记吗？对应的计量器具状态变更为暂时不可用状态。",
                            "outputParams": [
                                {
                                    "name": "Message",
                                    "dataType": "message"
                                }
                            ],
                            "params": [
                                {
                                    "name": "Ids",
                                    "valueName": "Id",
                                    "type": "checkedId"
                                },
                                {
                                    "name": "Message",
                                    "type": "value",
                                    "value": "output",
                                    "valueName": ""
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

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
            const triggerObj = {
                triggerType: btn.triggerType,
                trigger: btn.trigger
            }
            switch (btn.triggerType) {
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
                    const operationMsg = new BsnRelativesMessageModel(
                        triggerObj,
                        targetViewId,
                        btn.ajaxConfig // 异步操作配置
                    )
                    this._cpmtService.commonRelationTrigger.next(operationMsg);
                    break;
                // 链接跳转触发
                case BSN_TRIGGER_TYPE.LINK:
                    const linkMsg = new BsnRelativesMessageModel(
                        triggerObj,
                        targetViewId,
                        btn.link // 页面跳转配置
                    )
                    this._cpmtService.commonRelationTrigger.next(linkMsg);
                    break;
            }
            this.toolbarsIsLoading[btn.name] = true;
        }
    }

    public ngOnDestroy() {
        this.unsubscribeRelation();
    }
}
