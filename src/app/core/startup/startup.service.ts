import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { environment } from '@env/environment';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  public async getWebConfig(){
    
    const data = await this.httpClient.get(`assets/tmp/webConfig.json`).toPromise();

    
    if(data && data.hasOwnProperty('SERVER_URL')){
       if(data['SERVER_URL']){
        environment.SERVER_URL = data['SERVER_URL'];
       }
    }

   // const data1 = await this.httpClient.get(`http://192.168.1.111:8401/page/struct/parse?pageId=m2lSKOiIgmNR5R3JStQg0CYPNzdSd4Fd`).toPromise();
    console.log('+++++++++加载后台服务访问地址++++++++++++',data);
  }

  async load(): Promise<any> {
    //debugger;
    await this.getWebConfig();
    //const data = await this.httpClient.get(`resource/SMT_SETTING_LAYOUT_BASE/query?_mapToObject=true`).toPromise();
    //console.log('======测试发布地址======',data);
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise(resolve => {
      zip(

        this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`),
        this.httpClient.get(`resource/GET_SYS_I18N_LIST/query?_mapToObject=true&ddicCode=${this.i18n.defaultLang}`),
        this.httpClient.get(`assets/tmp/app-data.json`),
        this.httpClient.get(`resource/GET_MODULE_LIST/query?_mapToObject=true&_sort=sortcode asc`)

      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([
            langData,
            serverlangData,
            appData,
            serverData
          ]) => {
            resolve(null);
            return [
              langData,
              serverlangData,
              appData,
              serverData
            ];
          }),
        )
        .subscribe(
          ([langData, serverlangData, appData,
            serverData
          ]) => {
            // setting language data
           const lang_data=  this.buildI18NServerRes(langData, serverlangData);
            this.translate.setTranslation(this.i18n.defaultLang, lang_data);
            this.translate.setDefaultLang(this.i18n.defaultLang);

            // application data
            // const res = appData;
            const res: any = this.buildServerRes(appData, serverData)// appData;
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app);
            // 用户信息：包括姓名、头像、邮箱地址
            this.settingService.setUser(res.user);
            // ACL：设置权限为全量
            this.aclService.setFull(true);
            // 初始化菜单
            this.menuService.add(res.menu);
            // 设置页面标题的后缀
            this.titleService.default = '';
            this.titleService.suffix = res.app.name;
          },
          () => { },
          () => {
            resolve(null);
          },
        );
    });
  }

  private buildLocalRes(data) {
    return data;
  }

  private buildI18NServerRes(data, serverData) {
    if (serverData.data) {
      const s ={};
      serverData.data.forEach(element => {
        s[element['i18n']] = element['name'];
      });
      data = {...data, ...s}
      return data;
    } else {
      return data;
    }
  }

  private buildServerRes(data, serverData) {
    if (serverData.data) {
      const s = this.buildServerMenu(serverData);
      data.menu = [...s, ...data.menu]
      return data;
    } else {
      return data;
    }
  }
  private buildServerMenu(serverData) {
    const menu_level_1 = serverData.data.filter(d => d.nodetype === 1);
    const menu_level_2 = serverData.data.filter(d => d.nodetype === 2);
    const menu_level_3 = serverData.data.filter(d => d.nodetype === 3);

    if (menu_level_3) {
      for (const l2 of menu_level_2) {
        l2['children'] = [];
        for (const l3 of menu_level_3) {
          if (l3.parentId === l2.id) {
            l2['children'].push(l3);
          }
        }
      }
    }


    //   menu_level_3.map(l3 => {
    //     menu_level_2.map(l2 => {
    //       l2['children'] = [];
    //       if (l3.parentId === l2.id) {
    //         l2['children'].push(l3);
    //       }
    //     });
    //   });
    // }
    if (menu_level_2) {
      menu_level_1.map(l1 => {
        l1['children'] = [];
        menu_level_2.map(l2 => {
          if (l2.parentId === l1.id) {
            l1['children'].push(l2);
          }
        })
      })
    }

    return menu_level_1;
  }
}
