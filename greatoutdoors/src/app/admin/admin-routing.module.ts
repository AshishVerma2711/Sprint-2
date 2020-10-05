import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
 
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: 'basic', component: BasicComponent},
  {path: 'charts', component: ChartsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
