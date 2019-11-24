import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cfg-toolbar,[cfg-toolbar]',
  templateUrl: './cfg-toolbar.component.html',
  styleUrls: ['./cfg-toolbar.component.less']
})
export class CfgToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toolbarConfig = [
    {
      "targetViewId": "view_01",
      "group": [
        {
          "id": "M_refresh",
          "text": "刷新",
          "icon": "reload",
          "color": "text-primary",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "BEHAVIOR",
              "trigger": "REFRESH"
            }
          ]
        },
        {
          "id": "M_addRow",
          "text": "新增",
          "icon": "plus",
          "color": "text-primary",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "ADD_ROW",
              // "conditionId": "add_state_1"
            }
          ]
        },
        {
          "id": "M_updateRow",
          "text": "修改",
          "icon": "edit",
          "color": "text-success",
          "hidden": false,
          "disabled": false,
          "state": "text",
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "EDIT_ROWS",
              // "conditionId": "edit_state_1"
            }
          ],
          "toggle": {
            "type": "state",
            "toggleProperty": "hidden",
            "values": [
              {
                "name": "edit",
                "value": true
              },
              {
                "name": "text",
                "value": false
              }
            ]
          }
        },
        {
          "id": "M_deleteRow",
          "text": "删除",
          "icon": "delete",
          "color": "text-red-light",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "OPERATION",
              "trigger": "EXECUTE_CHECKED_ROWS_IDS",
              "conditionId": "delete_operation_1",
              "ajaxId": "delete_row_1"
            }
          ]
        },
        {
          "id": "M_saveRow",
          "text": "保存",
          "icon": "save",
          "color": "text-primary",
          "hidden": true,
          "disabled": false,
          "execute": [
            {
              "triggerType": "OPERATION",
              "trigger": "SAVE_ROWS",
              "ajaxId": "add_provinces_1",
              // "stateId": "add_save_1",
              // "conditionId": "add_save_1"
            },
            {
              "triggerType": "OPERATION",
              "trigger": "SAVE_ROWS",
              "ajaxId": "edit_save_1",
              // "stateId": "edit_save_1",
              // "conditionId": "edit_save_1"
            }
          ],
          "toggle": {
            "type": "state",
            "toggleProperty": "hidden",
            "values": [
              {
                "name": "edit",
                "value": false
              },
              {
                "name": "text",
                "value": true
              },
              {
                "name": "new",
                "value": false
              }
            ]
          }
        },
        {
          "id": "M_cancelrow",
          "text": "取消1",
          "state": "edit",
          "icon": "rollback",
          "color": "text-grey-darker",
          "hidden": true,
          "disabled": null,
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "CANCEL_EDIT_ROWS",
              "conditionId": "cancel_edit_rows_2"
            },
            {
              "triggerType": "STATE",
              "trigger": "CANCEL_NEW_ROWS"
            }
          ],
          "toggle": {
            "type": "state",
            "toggleProperty": "hidden",
            "values": [
              {
                "name": "edit",
                "value": false
              },
              {
                "name": "text",
                "value": true
              },
              {
                "name": "new",
                "value": false
              }
            ]
          }
        }
      ]
    },
    {
      "targetViewId": "view_02",
      "group": [
        {
          "name": "M_addSearchRow",
          "text": "查询",
          "triggerType": "STATE",
          "trigger": "SEARCH_ROW",
          "actionName": "addSearchRow",
          "icon": "search",
          "color": "text-primary",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "SEARCH_ROW"
            }
          ]
        },
        {
          "name": "M_cancelSearchRow",
          "text": "取消查询",
          "icon": "rollback",
          "triggerType": "STATE",
          "trigger": "CANCEL_SEARCH_ROW",
          "actionName": "cancelSearchRow",
          "color": "text-grey-darker",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "SEARCH_ROW"
            }
          ],
        }
      ]
    }
  ]

}
