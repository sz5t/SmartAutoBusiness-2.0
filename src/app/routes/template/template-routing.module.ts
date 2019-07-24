import { LayoutDemoComponent } from './layout-demo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CfgLayoutDemoComponent } from './cfg-layout-demo.component';
import { CfgFormDemoComponent } from './cfg-form-demo.component';


const routes: Routes = [
  { path: 'demo', component: LayoutDemoComponent },
  { path: 'cfglayoutdemo', component: CfgLayoutDemoComponent },
  { path: 'cfgformdemo', component: CfgFormDemoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule { }
