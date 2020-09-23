import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-step-demo',
  templateUrl: './data-step-demo.component.html',
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
export class DataStepsDemoComponent  implements OnInit {

  public config = {
    "id": "4K0naM",
    "type": "layout",
    "title": "布局4K0naM",
    "container": "rows",
    "rows": [
      {
        "cols": [
          {
            "id": "r5zDHB2-1",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 24,
            "container": "component",
            "size": {
              "nzXs": 24,
              "nzSm": 24,
              "nzMd": 24,
              "nzLg": 24,
              "nzXl": 24,
              "nzXXl": 24
            },
            "component": {
              "id": "dataStep_test_01",
              "title": "步骤圈",
              "titleIcon": "right-circle",
              "component": "cnDataStep",
              "keyId": "ID",
              "drawDirection":"vertical", // vertical 竖直 horizontal 水平
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/DATA_STEP_TEST_DATA/query",
                "method": "get",
                "params": [],
                "filter": []
              },
              "bodyStyle":{
                "maxWidth":500,
                "maxHeight":500
              },
              "basiAttribute": {
                // "asyncLoadChild": false,
                "graphWidth" : 500,
                "graphHeight" : 800,
                "nodeLabelField": "NODE_LABLE",
                "nodeParentField": "PARENT_ID",
                "descField":"DESC_FIELD",
                "nodeWidth": 150,
                "nodeHeight": 50,
                "edgeType": "line",
                "showEndArrow": true,
                "lineWidth": 2
              },
              "cascade": {
                "messageSender": [
                  {
                      "id": "datastep_sender_02",
                      "senderId": "dataStep_test_01",
                      "triggerType": "BEHAVIOR",
                      "trigger": "CLICK_NODE",
                      "triggerMoment": "after",
                      "sendData": [
                          {
                              "beforeSend": {},
                              "reveicerId": "AAA",
                              "receiverTriggerType": "BEHAVIOR",
                              "receiverTrigger": "REFRESH_AS_CHILD",
                              "params": [
                                  {
                                      "name": "_PID",
                                      "type": "item",
                                      "valueName": "ID"
                                  }
                              ]
                          }
                      ]
                  }
              ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          }
        ],
        id: "3vlDRq",
        type: "row"
      }
    ]
  };

  ngOnInit() {
  }

}
