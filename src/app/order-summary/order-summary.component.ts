import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  order;
  orderId;
  constructor(private authService:AuthService,
    private orderService:OrderService,private route:ActivatedRoute) { 
      this.orderId = this.route.snapshot.paramMap.get('id')
     this.authService.user$.subscribe(u=>{
        this.orderService.getOrderById(this.orderId).subscribe(order=>{
          this.order=order;
        })
      } );
    }
     
}


