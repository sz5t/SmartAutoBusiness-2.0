import { CnCalendarComponent } from './../../components/cn-calendar/cn-calendar.component';
import { CnProgressComponent } from './../../components/cn-progress/cn-progress.component';
import { CnStatisticComponent } from './../../components/cn-statistic/cn-statistic.component';
import { CnStepsComponent } from './../../components/cn-steps/cn-steps.component';
import { CnDescriptionsComponent } from './../../components/cn-descriptions/cn-descriptions.component';
import { CnTreeTableComponent } from './../../components/cn-tree-table/cn-tree-table.component';
import { CnTreeComponent } from './../../components/cn-tree/cn-tree.component';
import { CnToolbarComponent } from './../../components/toolbar/cn-toolbar.component';
import { CnDataTableComponent } from './../../components/data_table/cn-data-table.component';
import { Directive, OnInit, Input, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';
import { CfgLayoutPageComponent } from '@shared/config-components/config-layout-page/cfg-layout-page/cfg-layout-page.component';

const components: { [type: string]: Type<any> } = {
    cnDataTable: CnDataTableComponent,
    cnToolbar: CnToolbarComponent,
    form: CnDataFormComponent,
    cnTree: CnTreeComponent,
    cnTreeTable: CnTreeTableComponent,
    cnDescription: CnDescriptionsComponent,
    cnSteps: CnStepsComponent,
    cnStatistic: CnStatisticComponent,
    cnProgress: CnProgressComponent,
    cnCalendar: CnCalendarComponent,
    CfgLayoutPage:CfgLayoutPageComponent
};

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: ' [cnComponentResolverDirective]'
})
export class CnComponentResolverDirective implements OnInit, OnDestroy {
    @Input() config;
    @Input() initData;
    @Input() tempData;
    private _componentRef: ComponentRef<any>;
    constructor(
        private _resolver: ComponentFactoryResolver,
        private _container: ViewContainerRef
    ) {

    }

    ngOnInit() {
        this.resolve();
    }

    ngOnDestroy(): void {

    }

    private resolve() {
        if (this.config) {
            if (!components[this.config.component]) {
                const supportedTypes = Object.keys(components).join(', ');
                throw new Error(
                    `Trying to use an unsupported types (${
                    this.config.component
                    }).Supported types: ${supportedTypes}`
                );
            }
        }

        const comp = this._resolver.resolveComponentFactory<any>(
            components[this.config.component]
        );

        this._componentRef = this._container.createComponent(comp);
        this._componentRef.instance.config = this.config;
        this._componentRef.instance.initData = this.initData;
        this._componentRef.instance.tempData = this.tempData;
    }




}