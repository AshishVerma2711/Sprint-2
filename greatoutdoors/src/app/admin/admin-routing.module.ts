import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { ChartsComponent } from './charts/charts.component';
 
const routes: Routes = [
  {path: 'basic', component: BasicComponent},
  {path: 'charts', component: ChartsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
