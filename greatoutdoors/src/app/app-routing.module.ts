import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './admin/basic/basic.component';
import { ChartsComponent } from './admin/charts/charts.component';
import { ProductComponent } from './product/product.component';
import { RetailerComponent } from './retailer/retailer.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:'retailer',component:RetailerComponent},
  {path:'product',component:ProductComponent},
  {path:'basic', component:BasicComponent},
  {path: 'charts', component:ChartsComponent},
  {path:'inventory',component:InventoryComponent},
  {path:'order',component:OrderComponent},
  {path:'',component:ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
