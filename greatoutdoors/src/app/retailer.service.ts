import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Retailer } from './retailer';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  public retailerdb:Retailer[]=[];
  private url:string='http://localhost:8084/retailerList';

  constructor(private http:HttpClient) { }
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  getRetaielrs():Observable<Retailer[]>{
   return this.http.get<Retailer[]>(this.url).pipe(retry(0), catchError((error: HttpErrorResponse) => {
      window.alert(error.error.message);
      return throwError('Error fetching data from serve ');}));
  }

  deleteRetailer(id:string):Observable<Retailer>{
  return this.http.delete<Retailer>(this.url+'/'+id,this.httpOptions).pipe(
    catchError((error: HttpErrorResponse) => {
      window.alert(error.error.message);
      return throwError('Error deleting'+error.error.message);}));
  } 

  addRetaIler(retailer:Retailer):Observable<Retailer>{
     return this.http.post<Retailer>(this.url,retailer,this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        window.alert(error.error.message);
        return throwError('Error Adding'+error.error.message);}));
  }

  updateRetailer(retailer:Retailer):Observable<Retailer>{
   return this.http.put<Retailer>(this.url,retailer,this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        window.alert(error.error.message);
        return throwError('Error Updating '+error.error.message);}));
  }
}

