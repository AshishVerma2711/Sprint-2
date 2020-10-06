import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
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
    })
  }

  productForm = new FormGroup({
    productId: new FormControl('', [Validators.required, Validators.pattern(/^[P]{1}[0-9]{5}$/)]),
    retailerId: new FormControl('', [Validators.required, Validators.pattern(/^[R]{1}[0-9]{5}$/)]),
    units: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{0,}$/)]),
  })

  public applySearchFilter(){
    console.log(this.myInput);
      this.inventoryService.getProductByProductId(this.myInput).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        this.message = error.error;
        return throwError('Error fetching data from serve');
      })).subscribe((data: any) => {
        this.inventoryList = data;
      });
  }

   public onUpdate(id: any, programName: any) {
    this.showSuccess = false;
    this.showUpdationForm = true;
    this.showAdditionForm=false;
    this.productId = id;
    this.productForm.controls["productId"].setValue(programName);
  }  

  public onSubmit() {
    if (this.productForm.valid) {

      this.postdata = new Inventory(this.productId, this.productForm.get("retailerId").value, this.productForm.get("units").value);
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
  }

  public onAdding()
  {
    if (this.productForm.valid) {

      this.postdata = new Inventory(this.productId,this.productForm.get("retailerId").value, this.productForm.get("units").value);
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
