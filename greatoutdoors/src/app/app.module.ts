import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { RetailerComponent } from './retailer/retailer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RetailerService } from './retailer.service';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {AdminModule} from './admin/admin.module';
import { InventoryComponent } from './inventory/inventory.component'
import { InventoryService } from './inventory.service';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    RetailerComponent,
    InventoryComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MatListModule,
    MatSelectModule,
    AdminModule,
    
  ],
  providers: [RetailerService,ProductService,InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
