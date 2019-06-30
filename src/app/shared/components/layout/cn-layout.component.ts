import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-layout-resolver',
    templateUrl: './cn-layout.component.html',
    styles: [
        `
        `
    ]
})
export class CnLayoutComponent implements OnInit {
    public layoutObj;
    constructor() {
    }

    public ngOnInit() {
        console.log(this.layoutObj);
    }
}
