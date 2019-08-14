import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders;
  constructor( private orderService:OrderService) { 
    orderService.getOrders().subscribe(orders=>{
      this.orders= orders;
      console.log("orders",this.orders)
    });
  }

  ngOnInit() {
  }

}
