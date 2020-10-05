import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productList: Product[] = [];
  message: string;
  myInput: string;
  showUpdationForm: boolean = false;
  showSuccess: boolean = false;
  showAdditionForm: boolean = false;
  productId: any;
  postdata: Product;
  showDeleteForm: boolean = false;
  products:Product[]=[];
  page = 1;
  pageSize = 2;


  constructor(public service: ProductService) {

    this.refreshProducts();
   }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    return this.service.getProducts().subscribe((data: any) => {
      this.productList = data;
      this.refreshProducts();
    })

  }


  refreshProducts() {
    this.products = this.productList
      .map((retailer, i) => ({ id: i + 1, ...retailer }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  productForm = new FormGroup({
    productId: new FormControl({disabled:true}),
    productName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/)]),
    category: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/)]),
    description: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/)]),
    price: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/)]),
  })


  applySearchFilter() {
    console.log(this.myInput);
    this.service.getProductByProductName(this.myInput).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      this.message = error.error;
      return throwError('Error fetching data from serve');
    })).subscribe((data: any) => {
      this.products = data;
      //this.refreshProducts();

    });

  }


  onRemove(id: any, productName: any) {
    this.productId=id;
    this.showUpdationForm = false;
    this.showAdditionForm = false;
    this.showSuccess=false;
    this.showDeleteForm = true;




  }


  delete(id: any) {



    this.service.deleteProduct(id).pipe(catchError((error: HttpErrorResponse) => {
      this.message = error.error.message;
      this.showSuccess = true;
      return throwError('Error fetching data from serve');
    })).subscribe(resp => {
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].productId == id) {
          this.productList.splice(i, 1);
        }
      }
      this.message = id + " Product is deleted successfully";
      this.showDeleteForm=false;
      this.showSuccess=true;

    })
  }


  onUpdate(id: any, programName: any) {
    this.showSuccess = false;
    this.showUpdationForm = true;
    this.showAdditionForm = false;
    this.productId = id;
    this.productForm.controls["productId"].setValue(this.productId);
    this.productForm.controls["productId"].disable();
    this.productForm.controls["productName"].setValue(programName);
  }


  update() {
    if (this.productForm.valid) {

      this.postdata = new Product(this.productForm.get("productId").value, this.productForm.get("productName").value, this.productForm.get("category").value, this.productForm.get("description").value, this.productForm.get("price").value, this.productForm.get("manufacturer").value);
      this.service.updateProduct(this.postdata).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        return throwError('Error fetching data from serve');
      })).subscribe(data => {
        let data2: any = data;
        this.refreshProducts();
      
        this.showUpdationForm=false;
        alert("Product Updated Successfully");
        window.location.reload();
      })
    }
  }


  onAdd() {
    this.showSuccess = false;
    this.showUpdationForm = false;
    this.showAdditionForm = true;
  }


  cancel() {
    this.showSuccess = false;
    this.showUpdationForm = false;
    this.showAdditionForm = false;
    this.showDeleteForm = false;
  }




  add() {
    if (this.productForm.valid) {

      this.postdata = new Product(null, this.productForm.get("productName").value, this.productForm.get("category").value, this.productForm.get("description").value, this.productForm.get("price").value, this.productForm.get("manufacturer").value);
      this.service.addProduct(this.postdata).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        return throwError('Error fetching data from serve');
      })).subscribe(data => {
        let product: Product = data;
        this.productList.push(product);
        this.refreshProducts();
        this.showAdditionForm=false;
        alert("Product Added Successfully");
      })
    }
  }



}
