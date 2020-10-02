import { Component, OnInit } from '@angular/core';
import { RetailerService } from '../retailer.service'

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  constructor(public retailerService:RetailerService) { }

  retailer

  ngOnInit(): void {
    this.retailerService.getRetaielrs();
    console.log(this.retailerService.retailerdb);
  }

  updateRetailer(retailerId:string){
    
  }
}
