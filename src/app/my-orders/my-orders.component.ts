import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import {switchMap,map} from 'rxjs/operators';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  order;
  constructor(private authService:AuthService,
    private orderService:OrderService) { 
     this.authService.user$.subscribe(u=>{
        this.orderService.getOrdersByUser(u.uid).subscribe(order=>{
          this.order=order;
        })
      } );

      
    }

  ngOnInit() {
  }

}
