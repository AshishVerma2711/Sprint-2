import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './admin/basic/basic.component';
import { ChartsComponent } from './admin/charts/charts.component';
import { ProductComponent } from './product/product.component';
import { RetailerComponent } from './retailer/retailer.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {path:'retailer',component:RetailerComponent},
  {path:'product',component:ProductComponent},
<<<<<<< HEAD
  {path:'report', component:DashboardComponent},
  {path:'inventory',component:InventoryComponent}
=======
  {path:'basic', component:BasicComponent},
  {path: 'charts', component:ChartsComponent}
>>>>>>> 694e3d6524650ce54cd8bc2118a327b78a6dc05e
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
