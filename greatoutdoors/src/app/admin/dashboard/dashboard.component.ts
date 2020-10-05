import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders:any;
  constructor(private _adminService: RestService) { }

  ngOnInit(): void {
    this._adminService.orderPlaced('2020-01-01', '2020-12-12').subscribe(
      res => {
        this.orders = res;
        console.log("At AdminParentComponent:: orders placed = "+this.orders);
      }
    )
  }
}
