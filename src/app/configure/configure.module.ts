import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureFormComponent } from './configure-form/configure-form.component';
import { ConfigureTableComponent } from './configure-table/configure-table.component';
import { ConfigureHomeComponent } from './configure-home/configure-home.component';
import { ConfigureRoutingModule } from './configure-routing.module';
import { ConfigureComponentComponent } from './configure-home/configure-component/configure-component.component';
import { ConfigureLayoutComponent } from './configure-home/configure-layout/configure-layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ConfigureFormComponent, 
    ConfigureTableComponent, 
    ConfigureHomeComponent,
    ConfigureComponentComponent,
    ConfigureLayoutComponent
  ],
  imports: [
    CommonModule,
    ConfigureRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class ConfigureModule { }
