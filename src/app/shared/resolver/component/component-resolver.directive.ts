import { CnToolbarComponent } from './../../components/toolbar/cn-toolbar.component';
import { CnDataTableComponent } from './../../components/data_table/cn-data-table.component';
import { CnCustomLayoutComponent } from '../../components/layout/cn-custom-layout.component';
import { CnTabsComponent } from '../../components/layout/cn-tabs.component';
import { Directive, OnInit, Input, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { CnLayoutComponent } from '@shared/components/layout/cn-layout.component';
import { LayoutBase, LayoutSize } from '../layout/layout.base';
import { LayoutRow } from '../layout/layout.row';
import { LayoutColumn } from '../layout/layout.column';
import { LayoutTabs } from '../layout/layout.tabs';
import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';

const components: { [type: string]: Type<any> } = {
    cnDataTable: CnDataTableComponent,
    cnToolbar: CnToolbarComponent,
    form: CnDataFormComponent
};

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: ' [cnComponentResolverDirective]'
})
export class CnComponentResolverDirective implements OnInit, OnDestroy {
    @Input() config;
    private _componentRef: ComponentRef<any>;
    constructor(
        private _resolver: ComponentFactoryResolver,
        private _container: ViewContainerRef
    ) {

    }

    ngOnInit() {
        // console.log('component result init', this.config);
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
        // if (this.tempValue && this.componentRef.instance.tempValue) {
        //     this.componentRef.instance.tempValue = this.tempValue;
        // }

    }




}