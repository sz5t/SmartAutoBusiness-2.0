import { LayoutDemoComponent } from './layout-demo.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { TemplateRoutingModule } from './template-routing.module';
import { CfgLayoutDemoComponent } from './cfg-layout-demo.component';
import { CfgFormDemoComponent } from './cfg-form-demo.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { TreeDemoComponent } from './tree-demo.component';
import { TreeTableDemoComponent } from './tree-table-demo.component';

const COMPONENTS = [LayoutDemoComponent, CfgLayoutDemoComponent, CfgFormDemoComponent, DataTableDemoComponent, TreeDemoComponent, TreeTableDemoComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, TemplateRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class TemplateModule { }
