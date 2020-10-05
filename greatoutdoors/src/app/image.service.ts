import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  
  constructor(private http:HttpClient) { }

  url:string="  http://localhost:8089/image/";

  getImageByProductId(productId:String)
  {
    return this.http.get(this.url+productId);
  }


}
