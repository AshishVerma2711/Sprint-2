import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from './material.module';
import { RestService } from './rest.service';
import { BasicComponent } from './basic/basic.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ChartsComponent } from './charts/charts.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    BasicComponent,
    ChartsComponent, 
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MyMaterialModule,
    ChartsModule,
  ],
  exports: [
    ChartsComponent,
  ],
  providers: [
    RestService
  ]
})
export class AdminModule { }
