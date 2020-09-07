import { ActivatedRoute } from '@angular/router';
import { CnComponentBase } from './../../../shared/components/cn-component.base';
import { Component, OnInit, ViewChild, Inject, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { CfgLayoutComponent } from '@shared/config-components/config-layout/cfg-layout/cfg-layout.component';
import { constructor } from 'date-fns/is_before/index.js';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { CnLayoutComponent } from '@shared/components/layout/cn-layout.component';
import { CnDynamicLayoutComponent } from '@shared/components/layout/cn-dynamic-layout.component';

@Component({
  selector: 'cn-dynamic-template,[cn-dynamic-template]',
  templateUrl: './dynamic-template.component.html',
  styles: [``]
})
export class CnDynamicTemplateComponent extends CnComponentBase implements OnInit {
  public config = {
    "layoutJson": {},
    "componentsJson": {}
  };
  private _layoutObj: ComponentRef<any>;
  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider,
    private _route: ActivatedRoute,
    private _resolver: ComponentFactoryResolver,
    private _container: ViewContainerRef,
  ) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;

    // init cacheValue
  }

  ngOnInit() {
    this._route.params.subscribe((params: any) => {
      if (params.name) {
        this.componentService.apiService.post('resource/B_P_C_CONFIG_PAGE_ALL/operate', { "PageId": params.name }).subscribe(response => {
          if (response.data._procedure_resultset_1[0]['W'] === "") {
            this.config = null;
          }
          else {
            const pageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);
            for (const key in pageJson) {
              if (pageJson.hasOwnProperty(key)) {
                // 判断是否时主页面配置,如果是主页面配置,则直接进行页面解析
                if (key === params.name) {
                  this.config = pageJson[params.name]['layoutJson'];
                  const componentJson = pageJson[params.name]['componentsJson']
                  if (Array.isArray(componentJson) && componentJson.length > 0) {
                    componentJson.forEach(json => {
                      this.componentService.cacheService.set(json['id'], json);
                    });
                  }
                  this._route.queryParams.subscribe(queryParam => {
                    this.buildLayout({...params, ...queryParam});
                  })

                  this.componentService.cacheService.set(key, pageJson[params.name]);
                  
                } else {
                  // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取
                  this.componentService.cacheService.set(key, pageJson[key]);
                  const componentJson = pageJson[key]['componentsJson']
                  if (Array.isArray(componentJson) && componentJson.length > 0) {
                    componentJson.forEach(json => {
                      this.componentService.cacheService.set(json['id'], json);
                    });
                  }

                }
              }
            }

            console.log(this.config);
         
            // this.PageJson = response.data._procedure_resultset_1[0]['W'];
            //  this.PageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);
            //   this.PageJson =this.formatJson(JSON.parse(response.data._procedure_resultset_1[0]['W']),{})

          }
        })
        // this.componentService.apiService.getLocalData(params.name).subscribe(localJson => {
        //   if (localJson) {
        //     this.config = localJson;
        //   } else {
        //     this.componentService.apiService.post('resource/PROCEDURE B_P_C_CONFIG_PAGE_ALL/procedure', { "PageId": params.name }).subscribe(response => {
        //       if (response.data._procedure_resultset_1[0]['W'] === "") {
        //         this.config = null;
        //       }
        //       else {
        //         const pageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);

        //         for (const key in pageJson) {
        //           if (pageJson.hasOwnProperty(key)) {
        //             // 判断是否时主页面配置,如果是主页面配置,则直接进行页面解析
        //             if (pageJson[params.name]) {
        //               this.config = pageJson[params.name];
        //             } else {
        //               // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取
        //               this.componentService.cacheService.set(key, pageJson[key]);
        //             }
        //           }
        //         }


        //         // this.PageJson = response.data._procedure_resultset_1[0]['W'];
        //         //  this.PageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);
        //         //   this.PageJson =this.formatJson(JSON.parse(response.data._procedure_resultset_1[0]['W']),{})

        //       }
        //     })
        //   }
        // }, error => {
        //   console.log(error);
        // })
      }
    });

  }

  private buildLayout(params) {
    // console.log('buildLayout Receive message --', this.initValue, this.tempValue);
    const cmpt = this._resolver.resolveComponentFactory<any>(
      CnDynamicLayoutComponent
    );
    this._container.clear();
    this._layoutObj = this._container.createComponent(cmpt);
    this._layoutObj.instance.layoutObj = this.config;
    if (params) {
      this._layoutObj.instance.initData = params;
    }
  }

}
