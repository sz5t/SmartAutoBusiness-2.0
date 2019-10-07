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


const routes: Routes = [
  { path: 'demo', component: LayoutDemoComponent },
  { path: 'cfglayoutdemo', component: CfgLayoutDemoComponent },
  { path: 'cfgformdemo', component: CfgFormDemoComponent },
  { path: 'dataTableDemo', component: DataTableDemoComponent },
  { path: 'treeDemo', component: TreeDemoComponent },
  { path: 'treeTableDemo', component: TreeTableDemoComponent },
  { path: 'datamodeling', component: DataModelingComponent },
  { path: 'innerPropertyManager', component: BaseInnerPropertyManagerComponent },
  { path: 'sqlmodeling', component: DataSqlModelingComponent },
  { path: 'configPropertyManager', component: BaseCfgPropertyManagerComponent },
  { path: 'innerMethodManager', component: BaseInnerMethodManagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule { }
