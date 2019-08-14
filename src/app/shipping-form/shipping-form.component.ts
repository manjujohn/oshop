import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  
shipping:{} ;
userSubscription: Subscription;
userId: string;

@Input("cart") cart: ShoppingCart;
  constructor(private orderService:OrderService, private router:Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription =  this.authService.user$.subscribe(user=>this.userId= user.uid)

  }
  async placeOrder(shipping){
    let order= new Order(this.userId,shipping,this.cart);
    let resut = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',resut.key]);
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
   

}
