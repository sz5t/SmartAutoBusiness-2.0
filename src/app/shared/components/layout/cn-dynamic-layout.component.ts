import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild } from '@angular/core';

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
export class CnDynamicLayoutComponent implements OnInit {
    @Input() public layoutObj;
    @Input() public initData;
    @Input() public tempData;
    constructor() {

    }

    public ngOnInit() {
        console.log('layout init---', this.initData, this.tempData);
        console.log('******', this.layoutObj);
    }
}
