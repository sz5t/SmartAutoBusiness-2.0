import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-tabs-resolver',
    templateUrl: './cn-tabs.component.html',
    styles: [
        `
        `
    ]
})
export class CnTabsComponent implements OnInit {
    public tabsObj;
    constructor() {
    }

    public ngOnInit() {
        console.log(this.tabsObj);
    }
}
