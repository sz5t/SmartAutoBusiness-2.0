import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
import { ConfigureHomeComponent } from './configure-home/configure-home.component';
import { ConfigureComponentComponent } from './configure-home/configure-component/configure-component.component';
import { ConfigureLayoutComponent } from './configure-home/configure-layout/configure-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigureHomeComponent,
    // canActivate: [SimpleGuard],
    // canActivateChild: [SimpleGuard],
    children: [
    // { path: 'layout', redirectTo: 'dashboard/v1', pathMatch: 'full' },
    // { path: 'component', redirectTo: 'dashboard/v1', pathMatch: 'full' },
    // { path: 'layout', component:  },
    { path: 'component', component: ConfigureComponentComponent},
    { path: 'layout', component: ConfigureLayoutComponent}
    //   { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
    //   { path: 'dashboard/monitor', component: DashboardMonitorComponent },
    //   { path: 'dashboard/workplace', component: DashboardWorkplaceComponent },
    //   {
    //     path: 'widgets',
    //     loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule),
    //   },
    //   { path: 'style', loadChildren: () => import('./style/style.module').then(m => m.StyleModule) },
    //   { path: 'delon', loadChildren: () => import('./delon/delon.module').then(m => m.DelonModule) },
    //   { path: 'extras', loadChildren: () => import('./extras/extras.module').then(m => m.ExtrasModule) },
    //   { path: 'pro', loadChildren: () => import('./pro/pro.module').then(m => m.ProModule) },
    //   // Exception
    //   { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
    //   { path: 'template', loadChildren: () => import('./template/template.module').then(m => m.TemplateModule) }
    ]
  },
  // 全屏布局
//   {
//     path: 'data-v',
//     component: LayoutFullScreenComponent,
//     children: [{ path: '', loadChildren: () => import('./data-v/data-v.module').then(m => m.DataVModule) }],
//   },

//   // passport
//   {
//     path: 'passport',
//     component: LayoutPassportComponent,
//     children: [
//       {
//         path: 'login',
//         component: UserLoginComponent,
//         data: { title: '登录', titleI18n: 'app.login.login' },
//       },
//       {
//         path: 'register',
//         component: UserRegisterComponent,
//         data: { title: '注册', titleI18n: 'app.register.register' },
//       },
//       {
//         path: 'register-result',
//         component: UserRegisterResultComponent,
//         data: { title: '注册结果', titleI18n: 'app.register.register' },
//       },
//       {
//         path: 'lock',
//         component: UserLockComponent,
//         data: { title: '锁屏', titleI18n: 'app.lock' },
//       },
//     ],
//   },
//   // 单页不包裹Layout
//   { path: 'callback/:type', component: CallbackComponent },
//   { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ConfigureRoutingModule { }
