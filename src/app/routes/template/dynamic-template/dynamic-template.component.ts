import { CnComponentBase } from './../../../shared/components/cn-component.base';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CfgLayoutComponent } from '@shared/config-components/config-layout/cfg-layout/cfg-layout.component';
import { constructor } from 'date-fns/is_before/index.js';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';

@Component({
  selector: 'cn-dynamic-template,[cn-dynamic-template]',
  templateUrl: './dynamic-template.component.html',
  styles: [``]
})
export class CnDynamicTemplateComponent extends CnComponentBase implements OnInit {
  public config;
  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
  ) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;

    // init cacheValue
  }

  ngOnInit() {

    this.componentService.activeRoute.params.subscribe(params => {
      if (params.name) {
        this.componentService.apiService.getLocalData(params.name).subscribe(localJson => {
          if (localJson) {
            this.config = localJson;
          } else {
            this.componentService.apiService.post('sd/PROCEDURE B_P_C_CONFIG_PAGE_ALL/procedure', { "PageId": params.name }).subscribe(response => {
              if (response.data._procedure_resultset_1[0]['W'] === "") {
                this.config = null;
              }
              else {
                const pageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);

                for (const key in pageJson) {
                  if (pageJson.hasOwnProperty(key)) {
                    // 判断是否时主页面配置,如果是主页面配置,则直接进行页面解析
                    if (pageJson[params.name]) {
                      this.config = pageJson[params.name];
                    } else {
                      // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取
                      this.componentService.cacheService.set(key, pageJson[key]);
                    }
                  }
                }


                // this.PageJson = response.data._procedure_resultset_1[0]['W'];
                //  this.PageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);
                //   this.PageJson =this.formatJson(JSON.parse(response.data._procedure_resultset_1[0]['W']),{})

              }
            })
          }
        })
      }
    });

  }


}
