import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  
  constructor(private http:HttpClient) { }

  url:string="  http://localhost:8089/";

  getImageByProductId(productId:String)
  {
    return this.http.get(this.url+'image/'+productId);
  }

  addImageByProductId(image:any,productId:string){
    console.log(productId);
    
    return this.http.post(this.url+'addImage/'+productId,image);
  }


}
