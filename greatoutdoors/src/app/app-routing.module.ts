import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailerComponent } from './retailer/retailer.component';

const routes: Routes = [
  {path:'retailer',component:RetailerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
