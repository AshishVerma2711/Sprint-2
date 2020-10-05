import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private REST_ADMIN_API_SERVER = "http://localhost:8080/api";

  private errorMsg = new BehaviorSubject('');
  currErrorMsg = this.errorMsg.asObservable();

  constructor(private httpClient: HttpClient) { }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage:any;
    if (error.error instanceof ErrorEvent)
      errorMessage = `Error: ${error.error.message}`;
    else {
      if (error.status == 0)
        errorMessage = `Server Not Accessible! It Might be off.`
      else
        errorMessage = `${error.status}: ${error.statusText}`;
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  }

  changeMessage(message: string) {
    this.errorMsg.next(message);
  }

  public costOfOrderForStatue(from:string, to:string, status:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER + 
    `/getCostOfOrderForStatus/${from}/${to}/${status}`).
    pipe(retry(1), catchError(this.handleError));
  }
  public costOfOrderForStatueOn(date:string, status:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER + 
    `/getCostOfOrderForStatusOn/${date}/${status}`).
    pipe(retry(1), catchError(this.handleError));
  }
  public revenueGeneratedOn(date:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER +
    `/revenueGeneratedOn/${date}`).
    pipe(retry(1), catchError(this.handleError))
  }
  public revenueGenerated(from:string, to:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER +
    `/revenueGenerated/${from}/${to}`).pipe(retry(1), catchError(this.handleError));
  }
  public orderCancelledByCategory(from:string, to:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER + 
    `/orderCancelledByCategory/${from}/${to}`).pipe(retry(1), catchError(this.handleError));
  }
  public orderCancelledByCategoryOn(date:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER + 
    `/orderCancelledByCategoryOn/${date}`).pipe(retry(1), catchError(this.handleError));
  }
  
  public orderSoldByCategory(from: string, to:string) {
    return this.httpClient.get( this.REST_ADMIN_API_SERVER +
    `/orderSoldByCategory/${from}/${to}`).pipe(retry(1), catchError(this.handleError));
  }
  public orderSoldByCategoryOn(date: string) {
    return this.httpClient.get( this.REST_ADMIN_API_SERVER +
    `/orderSoldByCategoryOn/${date}`).pipe(retry(1), catchError(this.handleError));
  }
  public orderCancelled(from:string, to:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER +
    `/orderCancelled/${from}/${to}`).pipe(retry(1), catchError(this.handleError));
  }
  public orderCancelledOn(date:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER +
    `/orderCancelledOn/${date}`).pipe(retry(1), catchError(this.handleError));
  }
  public orderPlaced(from:string, to:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER +
    `/orderPlaced/${from}/${to}`).pipe(retry(1), catchError(this.handleError));
  }
  public orderPlacedOn(date:string) {
    return this.httpClient.get(this.REST_ADMIN_API_SERVER +
    `/orderPlacedOn/${date}`).pipe(retry(1), catchError(this.handleError));
  }

}
