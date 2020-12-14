import { ActivatedRoute } from '@angular/router';
import { CnComponentBase } from './../../../shared/components/cn-component.base';
import { Component, OnInit, Inject, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { CnDynamicLayoutComponent } from '@shared/components/layout/cn-dynamic-layout.component';
import { pageConfigCache } from '@env/page-config-cache';
import { environment } from '@env/environment';

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
    //console.log('this._route.params=========>',this._route.params);
    //console.log('activeMenu=========>',activeMenu);
    // 如果 activeMenu 为空，则是默认当前按页加载数据

    this._route.params.subscribe((params: any) => {
      // console.log('params=========>',params);
      if (params.name) {


        console.log('当前系统配置', environment)



        if (environment['systemSettings'] && environment['systemSettings']['systemMode'] === 'work') {

          let page_url ='resource/B_P_C_CONFIG_PAGE_ALL_NEW/operate';
          let page_params = { "PageId": params.name };
            if (environment['systemSettings'] && environment['systemSettings']['permissionInfo']['enableOperatePermission']) {
              const work_Page = environment['systemSettings']['pageInfo']['workPageInfo']['pageAjaxConfig'];
              page_url = work_Page['url'];
              let d_params={ "PageId": params.name };
              page_params = this.buildParametersByPage(work_Page['params'],d_params);
            }
            else{
               page_url ='resource/B_P_C_CONFIG_PAGE_ALL_NEW/operate';
               page_params = { "PageId": params.name };
            }

            this.componentService.apiService.post(page_url, page_params).subscribe(response => {
              if (response.data._procedure_resultset_1[0]['W'] === "") {
                this.config = null;
              }
              else {
                const pageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);
                console.log('=====当前页加载数据=====', pageJson);
                for (const key in pageJson) {
                  if (pageJson.hasOwnProperty(key)) {
                    // 判断是否时主页面配置,如果是主页面配置,则直接进行页面解析
                    if (key === params.name) {
                      this.config = pageJson[params.name]['config']['layoutJson'];
                      // liu 2020.11.12
                      this.setCache(key, 'mainPage', pageJson[params.name]['config'], pageJson[params.name]['permission']);
                      this._route.queryParams.subscribe(queryParam => {
                        this.buildLayout({ ...params, ...queryParam });
                      })
  
                    } else {
                      // 2020.11.12
                      this.setCache(key, 'childPage', pageJson[key]['config'], pageJson[key]['permission']);
  
                    }
                  }
                }
              }
            })

        }
        else {
          this.componentService.apiService.post('resource/B_P_C_CONFIG_PAGE_ALL/operate', { "PageId": params.name }).subscribe(response => {
            if (response.data._procedure_resultset_1[0]['W'] === "") {
              this.config = null;
            }
            else {
              const pageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);
              // console.log('=====当前页加载数据=====',pageJson);
              for (const key in pageJson) {
                if (pageJson.hasOwnProperty(key)) {
                  // 判断是否时主页面配置,如果是主页面配置,则直接进行页面解析
                  if (key === params.name) {
                    this.config = pageJson[params.name]['layoutJson'];
                    // const componentJson = pageJson[params.name]['componentsJson']
                    // if (Array.isArray(componentJson) && componentJson.length > 0) {
                    //   componentJson.forEach(json => {
                    //     this.componentService.cacheService.set(json['id'], json);
                    //   });
                    // }

                    // liu 2020.11.12
                    this.setCache(key, 'mainPage', pageJson[params.name], null);
                    this._route.queryParams.subscribe(queryParam => {
                      this.buildLayout({ ...params, ...queryParam });
                    })

                    // this.componentService.cacheService.set(key, pageJson[params.name]);

                  } else {
                    // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取

                    // 2020.11.12
                    this.setCache(key, 'childPage', pageJson[key], null);
                    // this.componentService.cacheService.set(key, pageJson[key]);
                    // const componentJson = pageJson[key]['componentsJson']
                    // if (Array.isArray(componentJson) && componentJson.length > 0) {
                    //   componentJson.forEach(json => {
                    //     this.componentService.cacheService.set(json['id'], json);
                    //   });
                    // }

                  }
                }
              }

              // console.log(this.config);

              // this.PageJson = response.data._procedure_resultset_1[0]['W'];
              //  this.PageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);
              //   this.PageJson =this.formatJson(JSON.parse(response.data._procedure_resultset_1[0]['W']),{})

            }
          })
        }


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

 public buildParametersByPage(params?,data?):any {
    let userInfo = this.componentService.cacheService.getNone('userInfo');
    let activeMenu =this.componentService.cacheService.getNone('activeMenu');
    let paramsData = {};
    params.forEach(element => {
      let valueItem: any;
      if (element['type'] === 'userValue') {
        valueItem = userInfo[element['valueName']];
      }if (element['type'] === 'item') {
        valueItem = data[element['valueName']];
      } 
      if (element['type'] === 'activeMenu') {
        valueItem = activeMenu[element['valueName']];
      } 
      if(element['type'] === 'value'){
        valueItem = element['value'];
      }

      if(!valueItem && valueItem!==0){
        valueItem = element['value'];
      }
     
      paramsData[element['name']] = valueItem;
    });
    return paramsData;
  }


  /*
  
  
    -- 当前系统激活菜单【组件信息加载在激活code下】
    -- active menuCode 
     页面配置缓存：{
     
      activeMenuId:'',  // 当前主激活菜单
      activeMainPageId:'', // 当前菜单下主激活页面
      menuId:{
         activeMainPage:'', // 当前主页【关键信息】  【通过路由跳转的才是主激活页，其他方式加载的都是子页信息，依赖于当前主页】
         type：inner, //内部，外部【可ifream包含其他系统页面】---  
         pageId:{   // 具体页面信息
            pageConfig:{
            pageId:{},
            componentId:{}，
            permission:{  // 每个页面独立的权限，按照布局结构，组件解析过程，自加载当前自生权限信息
  
              
            }
          },
           
       }
      }
     
     }
  
     == 【存储】
     页面独立、组件以页面分类，传递参数 _layoutId 独立布局下组件唯一
  
     缓存存储数据结构，不能分布存储，需要公共方法支持，层级get set 缓存数据
     1.取出当前对象，将
  
     ？？当前结构无法解决，重复引用子页，且权限有差异
  
  
     == 退出时，将页面配置缓存清空
     ？？？
    1. 若要 公用页面在同一菜单下多引用，则页面标识不能用实际页面id，使用权限内的引用标识
    2. 同一菜单下 同一页面只有一种权限项，则按照原来模式即可，满足当前操作
  
    3.若是跳转路由等是直接切换至其他菜单模块下，则将全局activemenu切换至需要跳转菜单即可，
  
  
    ==【思路】
  
    组件-》操作-》执行【内置、ajax、其他】-》响应（反馈）
  
  
    == 权限
    子页面权限复杂，公用页面
    菜单-》主页-》子页  （不同主页下的相同子页，可拥有不同权限）  缓存信息，需要主页标识+布局子页标识
  
    
  
  */

  // 缓存数据写入  写入至指定层级路径下
  // 参数 页面标识、类型（是否主页加载）、页面配置数据、页面权限数据
  public setCache(layoutId?, type?, configData?, permissionData?) {

    let page_config_data = {};
    let page_permission_data = {};


    if (configData['layoutJson']) {
      page_config_data[layoutId] = configData['layoutJson'];
    } else {
      page_config_data[layoutId] = configData;
    }
    const componentJson = configData['componentsJson']
    if (Array.isArray(componentJson) && componentJson.length > 0) {
      componentJson.forEach(json => {
        // 组件信息
        page_config_data[json['id']] = json;
      });
    }

    const componentsPermissionJson = permissionData;
    if (Array.isArray(componentsPermissionJson) && componentsPermissionJson.length > 0) {
      componentsPermissionJson.forEach(json => {
        // 组件信息
        page_permission_data[json['id']] = json;
      });
    }

    const activeMenu = this.componentService.cacheService.getNone('activeMenu');
    // 2.从当前缓存下查找当前menu的配置集合
    let menuId = activeMenu['id'];

    //console.log('=========将缓存数据写入==========',page_config_data);
    // 将缓存数据写入
    // this.componentService.cacheService.set(menuId,activeConfig);

    if (!pageConfigCache[menuId]) {
      pageConfigCache[menuId] = { pageConfig: {}, permissionConfig: {} };
    }
    pageConfigCache[menuId]['pageConfig'] = { ...pageConfigCache[menuId]['pageConfig'], ...page_config_data };

    pageConfigCache[menuId]['permissionConfig'] = { ...pageConfigCache[menuId]['permissionConfig'], ...page_permission_data };


  }

  // 新的加载模式
  loadPageConfig() {
    console.log('this._route.params=========>', this._route.params);
    const activeMenu = this.componentService.cacheService.getNone('activeMenu');
    console.log('activeMenu=========>', activeMenu);
    // 如果 activeMenu 为空，则是默认当前按页加载数据

    this._route.params.subscribe((params: any) => {
      console.log('params=========>', params);
      if (params.name) {
        this.componentService.apiService.post('resource/B_P_C_CONFIG_PAGE_ALL/operate', { "PageId": params.name }).subscribe(response => {
          if (response.data._procedure_resultset_1[0]['W'] === "") {
            this.config = null;
          }
          else {
            const pageJson = JSON.parse(response.data._procedure_resultset_1[0]['W']);
            console.log('=====当前页加载数据=====', pageJson);
            for (const key in pageJson) {
              if (pageJson.hasOwnProperty(key)) {
                // 判断是否时主页面配置,如果是主页面配置,则直接进行页面解析
                if (key === params.name) {
                  this.config = pageJson[params.name]['layoutJson'];
                  const componentJson = pageJson[params.name]['componentsJson']
                  if (Array.isArray(componentJson) && componentJson.length > 0) {
                    componentJson.forEach(json => {
                      // 组件信息
                      this.componentService.cacheService.set(json['id'], json);
                    });
                  }
                  this._route.queryParams.subscribe(queryParam => {
                    this.buildLayout({ ...params, ...queryParam });
                  })

                  // 页面信息
                  this.componentService.cacheService.set(key, pageJson[params.name]);

                } else {
                  // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取
                  this.componentService.cacheService.set(key, pageJson[key]);
                  const componentJson = pageJson[key]['componentsJson']
                  if (Array.isArray(componentJson) && componentJson.length > 0) {
                    componentJson.forEach(json => {
                      // 子页面组件信息
                      this.componentService.cacheService.set(json['id'], json);
                    });
                  }

                }
              }
            }

            console.log(this.config);


          }
        })
      }
    });

  }





}
