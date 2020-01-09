import { BaseComponentMannagerComponent } from './base-component-manager.component';
import { PageDesignComponent } from './page-design.component';
import { CalendarDemoComponent } from './calendar-demo.component';
import { BaseInnerMethodManagerComponent } from './base-inner-method-manager.component';
import { BaseCfgPropertyManagerComponent } from './base-cfg-property-manager.component';
import { DataSqlModelingComponent } from './data-sql-modeling.component';
import { BaseInnerPropertyManagerComponent } from './base-inner-property-manager.component';
import { DataModelingComponent } from './data-modeling.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { LayoutDemoComponent } from './layout-demo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CfgLayoutDemoComponent } from './cfg-layout-demo.component';
import { CfgFormDemoComponent } from './cfg-form-demo.component';
import { TreeDemoComponent } from './tree-demo.component';
import { TreeTableDemoComponent } from './tree-table-demo.component';
import { StepsDemoComponent } from './steps-demo.component';
import { DataBusinessModelingComponent } from './data-business-modeling.component';
import { CnDynamicTemplateComponent } from './dynamic-template/dynamic-template.component';


const routes: Routes = [
  { path: 'demo', component: LayoutDemoComponent },
  { path: 'cfglayoutdemo', component: CfgLayoutDemoComponent },
  { path: 'cfgformdemo', component: CfgFormDemoComponent },
  { path: 'dataTableDemo', component: DataTableDemoComponent },
  { path: 'treeDemo', component: TreeDemoComponent },
  { path: 'treeTableDemo', component: TreeTableDemoComponent },
  { path: 'datamodeling', component: DataModelingComponent },
  { path: 'stepsDemo', component: StepsDemoComponent },
  { path: 'innerPropertyManager', component: BaseInnerPropertyManagerComponent },
  { path: 'sqlmodeling', component: DataSqlModelingComponent },
  { path: 'configPropertyManager', component: BaseCfgPropertyManagerComponent },
  { path: 'innerMethodManager', component: BaseInnerMethodManagerComponent },
  { path: 'calendarDemo', component: CalendarDemoComponent },
  { path: 'pageDesign', component: PageDesignComponent },
  { path: 'businessmodeling', component: DataBusinessModelingComponent },
  { path: 'componentManager', component: BaseComponentMannagerComponent },
  { path: 'dynamic/:name', component: CnDynamicTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule { }
