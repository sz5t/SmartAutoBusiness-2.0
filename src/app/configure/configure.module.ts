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
import { ConfigureFormDirectiveDirective } from './configure-form/configure-form-directive.directive';
import { FormItemCheckboxComponent } from './configure-form/configure-form-items/form-item-checkbox/form-item-checkbox.component';
import { FormItemInputComponent } from './configure-form/configure-form-items/form-item-input/form-item-input.component';
import { FormItemRadioComponent } from './configure-form/configure-form-items/form-item-radio/form-item-radio.component';
import { FormItemSwitchComponent } from './configure-form/configure-form-items/form-item-switch/form-item-switch.component';




@NgModule({
  declarations: [
    ConfigureFormComponent, 
    ConfigureTableComponent, 
    ConfigureHomeComponent,
    ConfigureComponentComponent,
    ConfigureLayoutComponent,
    FormItemCheckboxComponent,
    ConfigureFormDirectiveDirective,
    FormItemInputComponent,
    FormItemRadioComponent,
    FormItemSwitchComponent
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
