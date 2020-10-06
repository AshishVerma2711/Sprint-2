import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public orderService: OrderService) { }

  status:string;
  changeFlag:boolean=false;
  id:string;
  changedStatus:string;

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((resp:any)=>{
      this.orderService.orderdb=resp;
      console.log(this.orderService.orderdb);
    })
  }

  onChange(order:Order){
      this.changeFlag=true;
      this.status=order.status;
      this.id=order.orderId;
  }
  cancel(){
    this.changeFlag=false;
      this.status=null;
      this.id=null;
  }

  update(){
    this.orderService.changeStatus(this.changedStatus,this.id).subscribe(data=>{
      console.log("Status changed");
      // this.changeFlag=false;
      // this.status=null;
      // this.id=null;
      window.location.reload();
    });
  }

}
