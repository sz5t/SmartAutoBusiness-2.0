import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-layout-resolver',
    templateUrl: './cn-layout.component.html',
    styles: [
        `
        .ant-card {
            margin-bottom: 2px;
        }
        .ant-card-body {
            padding: 6px;
        }
        [nz-col] {
            padding-right: 0px;
        }
        .ant-layout {
            background: none;
        }

        .page-header {
            margin-bottom:0px;
        }

        .alain-default .page-header {
            margin-bottom:0px;
        }
        `
    ]
})
export class CnLayoutComponent implements OnInit {
    public layoutObj;
    @Input() public initData;
    @Input() public tempData;
    constructor() {

    }

    public ngOnInit() {
        console.log('layout init---', this.initData, this.tempData);
        // console.log('******',this.layoutObj);
    }
}
