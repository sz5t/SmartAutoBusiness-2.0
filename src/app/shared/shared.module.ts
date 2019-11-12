import { CnCalendarComponent } from './components/cn-calendar/cn-calendar.component';
import { CnGridTagComponent } from './components/data_table/cn-grid-items/cn-grid-tag/cn-grid-tag.component';
import { CnStepsComponent } from './components/cn-steps/cn-steps.component';
import { CnDescriptionsComponent } from './components/cn-descriptions/cn-descriptions.component';
import { CnPageHeaderComponent } from './components/layout/cn-page-header.component';
import { CnTreeComponent } from './components/cn-tree/cn-tree.component';
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
import { CnFormSelectMultipleComponent } from './components/data-form/cn-form-items/cn-form-select-multiple/cn-form-select-multiple.component';
import { CnFormDatePickerComponent } from './components/data-form/cn-form-items/cn-form-date-picker/cn-form-date-picker.component';
import { CnFormYearPickerComponent } from './components/data-form/cn-form-items/cn-form-year-picker/cn-form-year-picker.component';
import { CnFormWeekPickerComponent } from './components/data-form/cn-form-items/cn-form-week-picker/cn-form-week-picker.component';
import { CnFormRangePickerComponent } from './components/data-form/cn-form-items/cn-form-range-picker/cn-form-range-picker.component';
import { CnFormMonthPickerComponent } from './components/data-form/cn-form-items/cn-form-month-picker/cn-form-month-picker.component';
import { CnFormSwitchComponent } from './components/data-form/cn-form-items/cn-form-switch/cn-form-switch.component';
import { CnFormRadioComponent } from './components/data-form/cn-form-items/cn-form-radio/cn-form-radio.component';
import { CnFormCheckboxComponent } from './components/data-form/cn-form-items/cn-form-checkbox/cn-form-checkbox.component';
import { CnFormTreeSelectComponent } from './components/data-form/cn-form-items/cn-form-tree-select/cn-form-tree-select.component';
import { CnFormTransferComponent } from './components/data-form/cn-form-items/cn-form-transfer/cn-form-transfer.component';
import { CnFormGridSelectComponent } from './components/data-form/cn-form-items/cn-form-grid-select/cn-form-grid-select.component';
import { CnFormTextareaComponent } from './components/data-form/cn-form-items/cn-form-textarea/cn-form-textarea.component';
import { CnTreeTableComponent } from './components/cn-tree-table/cn-tree-table.component';
import { CnFormCustomSelectComponent } from './components/data-form/cn-form-items/cn-form-custom-select/cn-form-custom-select.component';
import { CnPageComponent } from './components/cn-page/cn-page.component';
import { CnGridInputComponent } from './components/data_table/cn-grid-items/cn-grid-input/cn-grid-input.component';
import { CnGridSelectComponent } from './components/data_table/cn-grid-items/cn-grid-select/cn-grid-select.component';
import { CnGridItemDirective } from '@shared/components/data_table/cn-grid-item.directive';
import { CnAttributeComponent } from './components/cn-attribute/cn-attribute.component';
import { CnFormCodeEditComponent } from '@shared/components/data-form/cn-form-items/cn-form-code-edit/cn-form-code-edit.component';
import { CnCodeEditComponent } from './components/cn-code-edit/cn-code-edit.component';
import { CnAttributeObjectComponent } from './components/cn-attribute/cn-attribute-items/cn-attribute-object/cn-attribute-object.component';
import { CnAttributeArrayComponent } from './components/cn-attribute/cn-attribute-items/cn-attribute-array/cn-attribute-array.component';
import { CnAttributeTableComponent } from './components/cn-attribute/cn-attribute-items/cn-attribute-table/cn-attribute-table.component';
import { CnAttributePropertyGridComponent } from './components/cn-attribute/cn-attribute-items/cn-attribute-property-grid/cn-attribute-property-grid.component';
import { CnAttributeFormComponent } from './components/cn-attribute/cn-attribute-items/cn-attribute-form/cn-attribute-form.component';
import { CnAttributeItemDirective } from '@shared/components/cn-attribute/cn-attribute-item.directive';
import { CnAttributeTableFormComponent } from './components/cn-attribute/cn-attribute-items/cn-attribute-table-form/cn-attribute-table-form.component';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { CnStatisticComponent } from './components/cn-statistic/cn-statistic.component';
import { CnProgressComponent } from './components/cn-progress/cn-progress.component';
import { CfgLayoutPageComponent } from './config-components/config-layout-page/cfg-layout-page/cfg-layout-page.component';
import { CnStaticTableComponent } from './components/data_table/cn-static-table.component';
import { CnFormStaticGridComponent } from './components/data-form/cn-form-items/cn-form-static-grid/cn-form-static-grid.component';

const THIRDMODULES = [NgZorroAntdModule, CountdownModule, UEditorModule, NgxTinymceModule];
// #endregion

// #region your componets & directives
const COMPONENTS = [
  CnLayoutComponent,
  CnTabsComponent,
  CnCustomLayoutComponent,
  CnDataTableComponent,
  CnToolbarComponent,
  CnTreeComponent,
  CnTreeTableComponent,
  CnPageHeaderComponent,

  // --设计组件--
  CfgLayoutPageComponent,
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
  CnFormLabelComponent,
  CnFormSelectMultipleComponent,
  CnFormDatePickerComponent,
  CnFormYearPickerComponent,
  CnFormWeekPickerComponent,
  CnFormRangePickerComponent,
  CnFormMonthPickerComponent,
  CnFormSwitchComponent,
  CnFormRadioComponent,
  CnFormCheckboxComponent,
  CnFormTreeSelectComponent,
  CnFormTransferComponent,
  CnFormGridSelectComponent,
  CnFormTextareaComponent,
  CnFormCustomSelectComponent,
  CnPageComponent,
  CnGridInputComponent,
  CnGridSelectComponent,
  CnGridTagComponent,
  CnAttributeComponent,
  CnFormCodeEditComponent,
  CnCodeEditComponent,
  CnAttributeObjectComponent,
  CnAttributeArrayComponent,
  CnAttributeTableComponent,
  CnAttributePropertyGridComponent,
  CnAttributeFormComponent,
  CnAttributeTableFormComponent,
  CnDescriptionsComponent,
  CnStepsComponent,
  CnStatisticComponent,
  CnProgressComponent,
  CnCalendarComponent,
  CnStaticTableComponent,
  CnFormStaticGridComponent
  // ------设计组件-----
];
const DIRECTIVES = [
  CnLayoutResolverDirective,
  CnComponentResolverDirective,
  CfgFormItemContentDirective,
  CfgLayoutItemContentDirective,
  CnFormItemDirective,
  CnGridItemDirective,
  CnAttributeItemDirective
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
    NzResizableModule
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,




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
