import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  localurl1:string="  http://localhost:9090/productList";
  localurl2:string="  http://localhost:9090/products/search";
 

  constructor(private http:HttpClient) { }
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  getProducts():Observable<Product>
  {
    return this.http.get<Product>(this.localurl1);
  }

  getProductByProductName(productName:String):Observable<Product>
  {
    return this.http.get<Product>(this.localurl2+"?productName="+productName);
  }

  deleteProduct(id:any):Observable<Product>
  {
    return this.http.delete<Product>(this.localurl1+"/"+id,this.httpOptions);
  }


  updateProduct(product:Product)
  {
    return this.http.put(this.localurl1,product,this.httpOptions);
  }

  addProduct(product:Product):Observable<Product>
  {
    return this.http.post<Product>(this.localurl1,product,this.httpOptions);
  }

 

}
