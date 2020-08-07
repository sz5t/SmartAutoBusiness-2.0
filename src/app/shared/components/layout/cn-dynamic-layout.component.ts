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
    @Input() public dataServe;
    constructor() {

    }

    public ngOnInit() {
        console.log('layout init---', this.initData, this.tempData);
        if(  this.dataServe)
        this.dataServe && this.dataServe.data.push({id:2});
        this.dataServe && this.dataServe.setComponentValue('002',{name:333});
        console.log('******', this.layoutObj,this.dataServe);
    }
}
