import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Retailer } from './retailer';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  public retailerdb:Retailer[]=[];
  private url:string='http://localhost:8085/retailerList';

  constructor(private http:HttpClient) { }

  getRetaielrs(){
    this.http.get<Retailer[]>(this.url).pipe(retry(0), catchError((error: HttpErrorResponse) => {
      window.alert(error.error.message);
      return throwError('Error fetching data from serve');})).subscribe(resp=>{
      for(const i of(resp as any)){
        this.retailerdb.push({
          retailerId:i.retailerId,
          retailerName:i.retailerName,
          address:i.address,
          zipcode:i.zipcode,
          city:i.city,
          state:i.state,
          phoneNumber:i.phoneNumber,
          email:i.email,
        })
      }
    });
  }

  deleteRetailer(id:string){
  return this.http.delete(this.url+'/'+id).pipe(
    catchError((error: HttpErrorResponse) => {
      window.alert(error.error.message);
      return throwError('Error deleting');}));
  } 
}

