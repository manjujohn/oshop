import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

cart: ShoppingCart;
cartSubscription:Subscription;


  constructor( private cartService: ShoppingCartService) { }
  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart=>this.cart = cart);
  }
  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }
   

}
