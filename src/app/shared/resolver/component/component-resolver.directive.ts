import { CnCardListComponent } from './../../components/cn-card-list/cn-card-list.component';
import { CnCalendarComponent } from './../../components/cn-calendar/cn-calendar.component';
import { CnProgressComponent } from './../../components/cn-progress/cn-progress.component';
import { CnStatisticComponent } from './../../components/cn-statistic/cn-statistic.component';
import { CnStepsComponent } from './../../components/cn-steps/cn-steps.component';
import { CnDescriptionsComponent } from './../../components/cn-descriptions/cn-descriptions.component';
import { CnTreeTableComponent } from './../../components/cn-tree-table/cn-tree-table.component';
import { CnTreeComponent } from './../../components/cn-tree/cn-tree.component';
import { CnToolbarComponent } from './../../components/toolbar/cn-toolbar.component';
import { CnDataTableComponent } from './../../components/data_table/cn-data-table.component';
import { Directive, OnInit, Input, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Type, Inject } from '@angular/core';
import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';
import { CfgLayoutPageComponent } from '@shared/config-components/config-layout-page/cfg-layout-page/cfg-layout-page.component';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnStaticTableComponent } from '@shared/components/data_table/cn-static-table.component';
import { CnTagComponent } from '@shared/components/cn-tag/cn-tag.component';
import { CnUploadComponent } from '@shared/components/cn-upload/cn-upload.component';
import { CnContainersComponent } from '@shared/components/cn-containers/cn-containers.component';
import { CnCarouseComponent } from '@shared/components/cn-carouse/cn-carouse.component';

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
    cfgLayoutPage: CfgLayoutPageComponent,
    cnCardList: CnCardListComponent,
    cnStaticTable: CnStaticTableComponent,
    cnTag:CnTagComponent,
    cnUpload:CnUploadComponent,
    cnContainers:CnContainersComponent,
    CnCarouse:CnCarouseComponent
};

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: ' [cnComponentResolverDirective]'
})
export class CnComponentResolverDirective implements OnInit, OnDestroy {
    @Input() config;
    @Input() initData;
    @Input() tempData;
    @Input() dataServe;

    private _componentRef: ComponentRef<any>;
    constructor(
        private _resolver: ComponentFactoryResolver,
        private _container: ViewContainerRef,
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {

    }



    ngOnInit() {
        this.resolve();
    }

    ngOnDestroy(): void {
        //  console.log('销毁前',  this.componentService.com,this.config.id);
        //  this.componentService.com=this.componentService.com.filter(e=>!e.hasOwnProperty(this.config.id));
        //  console.log('销毁后',  this.componentService.com);
    }

    private resolve() {
        if (this.config) {
            if (this.config.component && components[this.config.component]) {
                this._buildComponent(this.config);
            } else {
                const cmptObj: any = this._getComponentObjectById(this.config.id);
                cmptObj['component'] = this.config.container;
                console.log(cmptObj);
                if (!components[cmptObj.component]) {
                    const supportedTypes = Object.keys(components).join(', ');
                    throw new Error(
                        `Trying to use an unsupported types (${
                        this.config.component
                        }).Supported types: ${supportedTypes}`
                    );
                } else {
                    console.log(cmptObj);
                    this._buildComponent(cmptObj);
                }


            }

        }

        // const comp = this._resolver.resolveComponentFactory<any>(
        //     components[this.config.component]
        // );

        // this._componentRef = this._container.createComponent(comp);
        // console.log(this.config);
        // if (this.config.component) {
        //     this._componentRef.instance.config = this.config;
        // } else {
        //     this._componentRef.instance.config = this.getComponentObjectById(this.config.id);
        // }

        // this._componentRef.instance.initData = this.initData;
        // this._componentRef.instance.tempData = this.tempData;
        // console.log('创建创建创建', this._componentRef );
        //  this.componentService.com.push({[this.config.id]:this._componentRef});
        //  console.log('创建创建创建+++', this.componentService.com );

    }

    private _buildComponent(componentObj) {
        const comp = this._resolver.resolveComponentFactory<any>(
            components[componentObj.component]
        );

        this._componentRef = this._container.createComponent(comp);
        this._componentRef.instance.config = componentObj;
        this._componentRef.instance.initData = this.initData;
        this._componentRef.instance.tempData = this.tempData;
        this._componentRef.instance.dataServe = this.dataServe;
        this.dataServe && (this.dataServe.setComponentInstace(componentObj.id,this._componentRef));
    }

    private _getComponentObjectById(id) {
        return this.componentService.cacheService.getNone(id);
    }




}