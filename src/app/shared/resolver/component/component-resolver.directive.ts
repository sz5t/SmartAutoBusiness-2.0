import { CnTreeTableComponent } from './../../components/cn-tree-table/cn-tree-table.component';
import { CnTreeComponent } from './../../components/cn-tree/cn-tree.component';
import { CnToolbarComponent } from './../../components/toolbar/cn-toolbar.component';
import { CnDataTableComponent } from './../../components/data_table/cn-data-table.component';
import { Directive, OnInit, Input, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';

const components: { [type: string]: Type<any> } = {
    cnDataTable: CnDataTableComponent,
    cnToolbar: CnToolbarComponent,
    form: CnDataFormComponent,
    cnTree: CnTreeComponent,
    cnTreeTable: CnTreeTableComponent
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