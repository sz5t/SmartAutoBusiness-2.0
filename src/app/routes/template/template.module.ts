import { LayoutDemoComponent } from './layout-demo.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { TemplateRoutingModule } from './template-routing.module';

const COMPONENTS = [LayoutDemoComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, TemplateRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class TemplateModule { }
