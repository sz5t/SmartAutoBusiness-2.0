import { BusinessObjectBase } from './../../shared/business/business-object.base';
import { BSN_COMPONENT_SERVICES } from './../../core/relations/bsn-relatives';
import { CnComponentBase } from './../../shared/components/cn-component.base';
import { ApiService } from './../../core/services/api/api-service';
import { BeforeOperationResolver } from './../../shared/resolver/beforeOperation/before-operation.resolver';
import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild } from '@angular/core';
import { NzModalComponent, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { reduce } from 'rxjs/internal/operators/reduce';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-layout-resolver',
    templateUrl: './layout-demo.component.html',
    styles: [
        `
            :host ::ng-deep .ant-card-head {
                min-height: 36px;
            }

            .trigger {
                font-size: 20px;
                padding: 0 5px;
                cursor: pointer;
                transition: color 0.3;
                right:0px;
                position:relative;
                z-index:8;
                padding-top:8px;
            }
            .trigger:hover {
                color: #1890ff;
            }

            .collapsedArea {
                position:relative;

            }
        `
    ]
})
export class LayoutDemoComponent extends CnComponentBase implements OnInit {
    public config = {
        "id": "4K0naM",
        "type": "layout",
        "title": "布局4K0naM",
        "container": "customLayout",
        "rows": [
            {
                "cols": [{
                    "id": "r5zDHB",
                    "col": "cc",
                    "type": "col",
                    "title": "列r5zDHB1-1",
                    "span": 24,
                    "container": "layout",
                    "size": {
                        "nzXs": 24,
                        "nzSm": 24,
                        "nzMd": 24,
                        "nzLg": 24,
                        "ngXl": 24,
                        "nzXXl": 24
                    }, "layout": {
                        "id": "r5zDHB1-2",
                        "col": "cc",
                        "type": "layout",
                        "title": "列r5zDHB",
                        "container": "rows",
                        "rows": [
                            {
                                "cols": [
                                    {
                                        "id": "r5zDHB1-2-1",
                                        "col": "cc",
                                        "type": "col",
                                        "title": "111",
                                        "span": 12,
                                        "container": "layout",
                                        "size": {
                                            "nzXs": 12,
                                            "nzSm": 12,
                                            "nzMd": 12,
                                            "nzLg": 12,
                                            "ngXl": 12,
                                            "nzXXl": 12
                                        },
                                        "layout": {}
                                    }, {
                                        "id": "r5zDHB1-2-2",
                                        "col": "cc",
                                        "type": "col",
                                        "title": "222",
                                        "span": 12,
                                        "container": "layout",
                                        "size": {
                                            "nzXs": 12,
                                            "nzSm": 12,
                                            "nzMd": 12,
                                            "nzLg": 12,
                                            "ngXl": 12,
                                            "nzXXl": 12
                                        },
                                        "layout": {}
                                    }
                                ]
                            }
                        ]
                    }
                }, {
                    "id": "r5zDHB2-1",
                    "col": "cc",
                    "type": "col",
                    "title": "列r6zDHB2-1",
                    "span": 24,
                    "container": "layout",
                    "size": {
                        "nzXs": 24,
                        "nzSm": 24,
                        "nzMd": 24,
                        "nzLg": 24,
                        "ngXl": 24,
                        "nzXXl": 24
                    },
                    "layout": {}
                }],
                "id": "3vlDRq",
                "type": "row"
            },
            {
                "cols": [
                    {
                        "id": "yBBeRX",
                        "col": "cc",
                        "type": "col",
                        "title": "列yBBeRX",
                        "span": 12,
                        "container": "tabs",
                        "size": {
                            "nzXs": 12,
                            "nzSm": 12,
                            "nzMd": 12,
                            "nzLg": 12,
                            "ngXl": 12,
                            "nzXXl": 12
                        },
                        "tabs": {
                            "id": "",
                            "type": "tabs",
                            "title": "标签页布局",
                            "container": "tabContent",
                            "tabContent": [
                                {
                                    "id": "icU1pr",
                                    "type": "tab",
                                    "title": "标签u7kPRm",
                                    "container": "layout",
                                    "layout": {
                                        "id": "icU1pr",
                                        "type": "layout",
                                        "title": "布局icU1pr",
                                        "container": "rows",
                                        "rows": [{
                                            "cols": [{
                                                "id": "nRhLot",
                                                "col": "cc",
                                                "type": "col",
                                                "title": "列nRhLot",
                                                "span": 24,
                                                "container": "",
                                                "size": {
                                                    "nzXs": 24,
                                                    "nzSm": 24,
                                                    "nzMd": 24,
                                                    "nzLg": 24,
                                                    "ngXl": 24,
                                                    "nzXXl": 24
                                                }
                                            }],
                                            "id": "gvF35B",
                                            "type": "row"
                                        }]
                                    }
                                }, {
                                    "id": "wixilN",
                                    "type": "tab",
                                    "title": "标签llC6Ub",
                                    "container": "layout",
                                    "layout": {
                                        "id": "wixilN",
                                        "type": "layout",
                                        "title": "布局wixilN",
                                        "container": "rows",
                                        "rows": [{
                                            "cols": [{
                                                "id": "nNNVng",
                                                "col": "cc",
                                                "type": "col",
                                                "title": "列nNNVng",
                                                "span": 24,
                                                "container": "layout",
                                                "size": {
                                                    "nzXs": 24,
                                                    "nzSm": 24,
                                                    "nzMd": 24,
                                                    "nzLg": 24,
                                                    "ngXl": 24,
                                                    "nzXXl": 24
                                                },
                                                "layout": {}
                                            }],
                                            "id": "zByIiZ",
                                            "type": "row"
                                        }]
                                    }
                                }]
                        }
                    },
                    {
                        "id": "r5zDHB",
                        "col": "cc",
                        "type": "col",
                        "title": "列r5zDHB1-1",
                        "span": 12,
                        "container": "layout",
                        "size": {
                            "nzXs": 12,
                            "nzSm": 12,
                            "nzMd": 12,
                            "nzLg": 12,
                            "ngXl": 12,
                            "nzXXl": 12
                        }, "layout": {
                            "id": "r5zDHB1-2",
                            "col": "cc",
                            "type": "layout",
                            "title": "列r5zDHB",
                            "container": "rows",
                            "rows": [
                                {
                                    "cols": [
                                        {
                                            "id": "r5zDHB1-2-2",
                                            "col": "cc",
                                            "type": "col",
                                            "title": "222",
                                            "span": 24,
                                            "container": "layout",
                                            "size": {
                                                "nzXs": 24,
                                                "nzSm": 24,
                                                "nzMd": 24,
                                                "nzLg": 24,
                                                "ngXl": 24,
                                                "nzXXl": 24
                                            },
                                            "layout": {}
                                        },
                                        {
                                            "id": "r5zDHB1-2-1",
                                            "col": "cc",
                                            "type": "col",
                                            "title": "111",
                                            "span": 24,
                                            "container": "layout",
                                            "size": {
                                                "nzXs": 24,
                                                "nzSm": 24,
                                                "nzMd": 24,
                                                "nzLg": 24,
                                                "ngXl": 24,
                                                "nzXXl": 24
                                            },
                                            "layout": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                "id": "3vlDRq",
                "type": "row"
            }
        ],
        "customLayout": [{
            "id": "zh7DKEr3",
            "type": "customLayout",
            "title": "左侧布局",
            "layoutType": "west",
            "hidden": false,
            "span": "1",
            "container": "layout",
            "layout": {
                "id": "rT4miZtE",
                "type": "layout",
                "title": "布局",
                "container": "rows",
                "rows": [{
                    "cols": [{
                        "id": "0rUTSi",
                        "col": "cc",
                        "type": "col",
                        "title": "列0rUTSi",
                        "span": 24,
                        "container": "layout",
                        "size": {
                            "nzXs": 24,
                            "nzSm": 24,
                            "nzMd": 24,
                            "nzLg": 24,
                            "ngXl": 24,
                            "nzXXl": 24
                        },
                        "layout": {}
                    }],
                    "id": "mfyPGP",
                    "type": "row"
                }]
            }
        }, {
            "id": "OVl4EgIq",
            "type": "customLayout",
            "title": "中间布局",
            "layoutType": "center",
            "hidden": false,
            "span": "2",
            "container": "layout",
            "layout": {
                "id": "NjZSnNJP",
                "type": "layout",
                "title": "布局",
                "container": "rows",
                "rows": [{
                    "cols": [{
                        "id": "yBBeRX",
                        "col": "cc",
                        "type": "col",
                        "title": "列yBBeRX",
                        "span": 24,
                        "container": "tabs",
                        "size": {
                            "nzXs": 24,
                            "nzSm": 24,
                            "nzMd": 24,
                            "nzLg": 24,
                            "ngXl": 24,
                            "nzXXl": 24
                        },
                        "tabs": {
                            "id": "",
                            "type": "tabs",
                            "title": "标签页布局",
                            "container": "tabContent",
                            "tabContent": [{
                                "id": "icU1pr",
                                "type": "tab",
                                "title": "标签u7kPRm",
                                "container": "layout",
                                "layout": {
                                    "id": "icU1pr",
                                    "type": "layout",
                                    "title": "布局icU1pr",
                                    "container": "rows",
                                    "rows": [{
                                        "cols": [{
                                            "id": "nRhLot",
                                            "col": "cc",
                                            "type": "col",
                                            "title": "列nRhLot",
                                            "span": 24,
                                            "container": "layout",
                                            "size": {
                                                "nzXs": 24,
                                                "nzSm": 24,
                                                "nzMd": 24,
                                                "nzLg": 24,
                                                "ngXl": 24,
                                                "nzXXl": 24
                                            },
                                            "layout": {}
                                        }],
                                        "id": "gvF35B",
                                        "type": "row"
                                    }]
                                }
                            }, {
                                "id": "wixilN",
                                "type": "tab",
                                "title": "标签llC6Ub",
                                "container": "layout",
                                "layout": {
                                    "id": "wixilN",
                                    "type": "layout",
                                    "title": "布局wixilN",
                                    "container": "rows",
                                    "rows": [{
                                        "cols": [{
                                            "id": "nNNVng",
                                            "col": "cc",
                                            "type": "col",
                                            "title": "列nNNVng",
                                            "span": 24,
                                            "container": "layout",
                                            "size": {
                                                "nzXs": 24,
                                                "nzSm": 24,
                                                "nzMd": 24,
                                                "nzLg": 24,
                                                "ngXl": 24,
                                                "nzXXl": 24
                                            },
                                            "layout": {}
                                        }],
                                        "id": "zByIiZ",
                                        "type": "row"
                                    }]
                                }
                            }]
                        }
                    }],
                    "id": "dPMuaH",
                    "type": "row"
                }]
            }
        }, {
            "id": "KHdMtYyn",
            "type": "customLayout",
            "title": "右侧布局",
            "layoutType": "east",
            "hidden": true,
            "span": "1",
            "container": "layout",
            "layout": {
                "id": "e9LRuIMO",
                "type": "layout",
                "title": "布局",
                "container": "rows",
                "rows": [{
                    "cols": [{
                        "id": "odfGLU",
                        "col": "cc",
                        "type": "col",
                        "title": "列odfGLU",
                        "span": 24,
                        "container": "layout",
                        "size": {
                            "nzXs": 24,
                            "nzSm": 24,
                            "nzMd": 24,
                            "nzLg": 24,
                            "ngXl": 24,
                            "nzXXl": 24
                        },
                        "layout": {}
                    }],
                    "id": "r8N8t8",
                    "type": "row"
                }]
            }
        }]
    };

    public beforeOperation = [
        {
            "name": "D_addRow",
            "status": [
                {
                    "conditions": [
                        [
                            {
                                "name": "_recordstatus",
                                "value": 1,
                                "checkType": "value"
                            },
                            {
                                "name": "_recods",
                                "value": 1,
                                "checkType": "value"
                            }
                        ],
                        [
                            {
                                "name": "_recordstatus",
                                "value": 2,
                                "checkType": "value"
                            },
                            {
                                "name": "_recods",
                                "value": 3,
                                "checkType": "value"
                            }
                        ]
                    ],
                    "action": {
                        "type": "warning",
                        "message": "在当前状态下，无法新增",
                        "execute": "prevent"
                    }
                },
                {
                    "conditions": [
                        [
                            {
                                "name": "_resourcesreceiveid1",
                                "value": "undefinded",
                                "checkType": "value"
                            }
                        ]
                    ],
                    "action": {
                        "type": "info",
                        "message": "主表未选中数据，无法新增！",
                        "execute": "prevent"
                    }
                },
                {
                    "conditions": [
                        [
                            {
                                "tempValue": "_createUserId",
                                "cacheValue": "accountId",
                                "checkType": "innerValue"
                            }
                            // {
                            //     "ajaxConfig": {
                            //         "url": "https://jsonplaceholder.typicode.com/users",
                            //         "ajaxType": "GET",
                            //         "params": []
                            //     },
                            //     "checkType": "executeAjax"
                            // }
                        ]
                    ],
                    "action": {
                        "type": "info",
                        "message": "对他人创建的数据只有浏览权限，没有编辑权限",
                        "execute": "prevent"
                    }
                }
            ]
        }
    ];

    public dataConfig = {
        entity: 'CaseDemo',
        properties: [
            {
                name: 'id',
                field: 'caseName',
                text: 'entity.case.name',
                value: '1',
                dataType: 'string'
            },
            {
                name: 'caseName',
                field: 'caseName',
                text: 'entity.case.name',
                value: 'zhangsan',
                dataType: 'string'
            }
        ],
        children: [
            {
                entity: 'group',
                properties: [
                    {
                        name: 'id',
                        field: 'groupName',
                        text: 'entity.group.name',
                        value: '1',
                        dataType: 'string'
                    },
                    {
                        name: 'groupName',
                        field: 'groupName',
                        text: 'entity.group.name',
                        value: 'jigoudsdsss',
                        dataType: 'string'
                    },
                    {
                        name: 'groupText',
                        field: 'groupText',
                        text: 'entity.group.text',
                        value: 'groutText',
                        dataType: 'string'
                    }
                ]
            },
            {
                entity: 'role',
                properties: [
                    {
                        name: 'id',
                        field: 'groupName',
                        text: 'entity.group.name',
                        value: '1',
                        dataType: 'string'
                    },
                    {
                        name: 'roleName',
                        field: 'roleName',
                        text: 'entity.role.name',
                        value: 'juese',
                        dataType: 'string'
                    }
                ]
            }
        ]
    }

    testResult: Observable<any>;

    constructor(
        @Inject(BSN_COMPONENT_SERVICES) private _componentServices: ComponentServiceProvider,
    ) {
        super(_componentServices);
    }

    public ngOnInit() {


    }

    public click() {
        this.load();
    }

    private load() {
        const beforeOperation = new BeforeOperationResolver(this.beforeOperation,
            {

            },
            {
                accountId: 'user1'
            },
            {
                _createUserId: 'user1'
            }, this._componentServices.apiService, this._componentServices.modalService, this._componentServices.msgService);
        beforeOperation.operationItemData = {
            _recordstatus: 2,
            _recods: 3,
            _resourcesreceiveid1: "undefined",
            _createUserId: '1'
        }
        this.testResult = beforeOperation.buildStatusObservableByStatusCfg({ name: 'D_addRow' }).pipe(reduce((a, b) => a || b));

        const s = new BusinessObjectBase();
        // console.log(s.resolver(s.dataConfig));
        const t = s.resolver(this.dataConfig);
        t.addProperty('caseText', '123456');
        t.editProperty('caseText', '67890');
        // t.removeProperty('caseText');

        t.addChildren('group', { groupName: '2', id: '2' })
        t.addChildren('group', [{ groupName: '3', id: '3' }, { groupName: '4', id: '4' }]);

        t.orderChange({ groupName: '2', id: '2' }, { groupName: '4', id: '4' }, 'group');

        console.log(t);
    }
}