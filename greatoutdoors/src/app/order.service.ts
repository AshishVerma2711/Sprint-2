import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Order } from './order'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http:HttpClient) { }

  public orderdb:Order[]=[];
  private url:string='http://localhost:8081/';

  changeStatus(status:string,orderId:string){
    console.log(status,orderId);
   return this.http.put(this.url+'/admin/order/status/',{"status":status,"orderId":orderId}).pipe(retry(0),catchError((error: HttpErrorResponse)=>{
    window.alert(error.error.message);
    return throwError("");}));
  }
  // getOrderById(){}
  getAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.url+"/admin/orders").pipe(retry(0),catchError((error: HttpErrorResponse)=>{
      window.alert(error.error.message);
      return throwError("");}));
  }

}
