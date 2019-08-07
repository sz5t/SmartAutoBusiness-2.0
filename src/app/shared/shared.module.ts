import { CnComponentResolverDirective } from './resolver/component/component-resolver.directive';
import { CnDataTableComponent } from './components/data_table/cn-data-table.component';
import { CnTabsComponent } from './components/layout/cn-tabs.component';
import { CnLayoutComponent } from './components/layout/cn-layout.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
// i18n
import { TranslateModule } from '@ngx-translate/core';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
import { CnLayoutResolverDirective } from './resolver/layout/layout-resolver.directive';
import { CnCustomLayoutComponent } from './components/layout/cn-custom-layout.component';
import { CnToolbarComponent } from './components/toolbar/cn-toolbar.component';
import { CfgCustomLayoutComponent } from '@shared/config-components/config-layout/cfg-custom-layout/cfg-custom-layout.component';
import { CfgLayoutCardComponent } from '@shared/config-components/config-layout/cfg-layout-card/cfg-layout-card.component';
import { CfgLayoutComponent } from '@shared/config-components/config-layout/cfg-layout/cfg-layout.component';
import { CfgLayoutColComponent } from '@shared/config-components/config-layout/cfg-layout-col/cfg-layout-col.component';
import { CfgLayoutCollapseComponent } from '@shared/config-components/config-layout/cfg-layout-collapse/cfg-layout-collapse.component';
import { CfgLayoutRowComponent } from '@shared/config-components/config-layout/cfg-layout-row/cfg-layout-row.component';
import { CfgLayoutTabsComponent } from '@shared/config-components/config-layout/cfg-layout-tabs/cfg-layout-tabs.component';
import { CfgFormItemComponent } from '@shared/config-components/config-form-layout/cfg-form-item/cfg-form-item.component';
import { CfgFormLayoutComponent } from '@shared/config-components/config-form-layout/cfg-form-layout/cfg-form-layout.component';
import { CfgFormLayoutColComponent } from '@shared/config-components/config-form-layout/cfg-form-layout-col/cfg-form-layout-col.component';
import { CfgFormLayoutRowComponent } from '@shared/config-components/config-form-layout/cfg-form-layout-row/cfg-form-layout-row.component';
import { CfgFormInputComponent } from '@shared/config-components/config-form-layout/cfg-form-component/cfg-form-input/cfg-form-input.component';
import { CfgFormSelectComponent } from '@shared/config-components/config-form-layout/cfg-form-component/cfg-form-select/cfg-form-select.component';
import { CfgFormItemContentDirective } from '@shared/config-components/config-form-layout/cfg-form-item-content.directive';
import { CfgLayoutItemComponent } from '@shared/config-components/config-layout/cfg-layout-item/cfg-layout-item.component';
import { CfgLayoutItemContentDirective } from '@shared/config-components/config-layout/cfg-layout-item-content.directive';
import { CfgDataTableComponent } from './config-components/config-layout/cfg-layout-component/cfg-data-table/cfg-data-table.component';
import { CfgTreeComponent } from './config-components/config-layout/cfg-layout-component/cfg-tree/cfg-tree.component';
import { CfgFormComponent } from './config-components/config-layout/cfg-layout-component/cfg-form/cfg-form.component';
import { CfgCalendarComponent } from './config-components/config-layout/cfg-layout-component/cfg-calendar/cfg-calendar.component';
import { CfgCarouselComponent } from './config-components/config-layout/cfg-layout-component/cfg-carousel/cfg-carousel.component';
import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';
import { CnFormItemDirective } from '@shared/components/data-form/cn-form-item.directive';
import { CnFormInputComponent } from './components/data-form/cn-form-items/cn-form-input/cn-form-input.component';
import { CnFormSelectComponent } from './components/data-form/cn-form-items/cn-form-select/cn-form-select.component';
import { CnFormLabelComponent } from './components/data-form/cn-form-items/cn-form-label/cn-form-label.component';

const THIRDMODULES = [NgZorroAntdModule, CountdownModule, UEditorModule, NgxTinymceModule];
// #endregion

// #region your componets & directives
const COMPONENTS = [
  CnLayoutComponent,
  CnTabsComponent,
  CnCustomLayoutComponent,
  CnDataTableComponent,
  CnToolbarComponent,
  // --设计组件--
  CfgCustomLayoutComponent,
  CfgLayoutComponent,
  CfgLayoutCardComponent,
  CfgLayoutColComponent,
  CfgLayoutCollapseComponent,
  CfgLayoutRowComponent,
  CfgLayoutTabsComponent,
  CfgLayoutItemComponent,
  CfgDataTableComponent,
  CfgTreeComponent,
  CfgFormComponent,
  CfgCalendarComponent,
  CfgCarouselComponent,

  CfgFormItemComponent,
  CfgFormLayoutComponent,
  CfgFormLayoutColComponent,
  CfgFormLayoutRowComponent,
  CfgFormInputComponent,
  CfgFormSelectComponent,

  CnDataFormComponent,
  CnFormInputComponent,
  CnFormSelectComponent,
  CnFormLabelComponent
  // ------设计组件-----
];
const DIRECTIVES = [
  CnLayoutResolverDirective,
  CnComponentResolverDirective,
  CfgFormItemContentDirective,
  CfgLayoutItemContentDirective,
  CnFormItemDirective
];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
