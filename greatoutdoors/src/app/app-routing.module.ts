import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { RetailerComponent } from './retailer/retailer.component';

const routes: Routes = [
  {path:'retailer',component:RetailerComponent},
  {path:'product',component:ProductComponent},
  {path:'report', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
