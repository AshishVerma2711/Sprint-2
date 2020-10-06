import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  localurl1:string="http://localhost:9090/api/viewInventory";
  localurl2:string="http://localhost:9090/api/viewInventoryByProductId";
  localurl3:string="http://localhost:9090/api/viewInventoryByRetailerId";
  localurl4:string="http://localhost:9090/api/addProductToInventory";
  localurl5:string="http://localhost:9090/api/updateInventory"; 

  constructor(private http: HttpClient) { }
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  public getProducts():Observable<Inventory>{
    return this.http.get<Inventory>(this.localurl1);
  }

  public getProductByProductId(productId:string):Observable<Inventory>{
    return this.http.get<Inventory>(this.localurl2+"?productId"+productId);
  }

  public getProductByRetailerId(retailerId:string):Observable<Inventory>{
    return this.http.get<Inventory>(this.localurl3+"?retailerId"+retailerId);
  }

  public addProduct(inventory:Inventory):Observable<Inventory>{
    return this.http.post<Inventory>(this.localurl4,inventory,this.httpOptions);
  }

  public updateInventory(inventory:Inventory):Observable<Inventory>{
    return this.http.put<Inventory>(this.localurl5,inventory,this.httpOptions);
  }
}
