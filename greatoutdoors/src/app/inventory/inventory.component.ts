import { Component, OnInit } from '@angular/core';
import { Inventory, InventoryId } from '../inventory';
import { InventoryService } from '../inventory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventoryList:Inventory[]=[];
  inventoryListFull:Inventory[]=[];
  message:string;
  myInput:string;
  showUpdationForm:boolean=false;
  showSuccess:boolean=false;
  showAdditionForm:boolean=false;
  productId:any;
  postdata:Inventory;


  constructor(public inventoryService:InventoryService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(){
    return this.inventoryService.getProducts().subscribe((data:any) =>{
      this.inventoryList = data;
      console.log(data);
      console.log(this.inventoryList);
    })
  }

  productForm = new FormGroup({
    productId: new FormControl('', [Validators.required, Validators.pattern(/^[P]{1}[0-9]{5}$/)]),
    retailerId: new FormControl('', [Validators.required, Validators.pattern(/^[R]{1}[0-9]{5}$/)]),
    units: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{0,}$/)]),
  })

   public onUpdate(product:any) {
    this.showSuccess = false;
    this.showUpdationForm = true;
    this.showAdditionForm=false;
    this.productId = product.inventoryId.productId;
    this.productForm.controls["productId"].setValue(product.inventoryId.productId);
    this.productForm.controls["productId"].disable();
    this.productForm.controls["retailerId"].setValue(product.inventoryId.retailerId);
    this.productForm.controls["retailerId"].disable();
    this.productForm.controls["units"].setValue(product.units);
  }  

  public onSubmit() {
    if (this.productForm.valid) {

      this.postdata = new Inventory(new InventoryId(this.productForm.controls["productId"].value, this.productForm.get("retailerId").value), this.productForm.get("units").value);
      this.inventoryService.updateInventory(this.postdata).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        return throwError('Error fetching data from serve');
      })).subscribe(data => {
        this.inventoryList.push(this.postdata);
        alert("Product Updated Successfully");
      })
    }
  }

  public onAdd()
  {
    this.showSuccess = false;
    this.showUpdationForm = false;
    this.showAdditionForm=true;
    this.productForm.controls["productId"].setValue("");
    this.productForm.controls["retailerId"].setValue("");
    this.productForm.controls["units"].setValue("");
    this.productForm.controls["productId"].enable();
    this.productForm.controls["retailerId"].enable();
  }

  public onAdding()
  {
    if (this.productForm.valid) {

      this.postdata = new Inventory(new InventoryId(this.productForm.controls["productId"].value, this.productForm.get("retailerId").value), this.productForm.get("units").value);
      this.inventoryService.addProduct(this.postdata).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        return throwError('Error fetching data from serve');
      })).subscribe(data => {
        let product:Inventory=data;
        this.inventoryList.push(product);
        alert("Product Added Successfully");
      })
    }
  }

}
