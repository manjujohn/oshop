import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {

  cart$  : Observable<ShoppingCart>;
  cart:ShoppingCart;  

  constructor( private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$= await this.cartService.getCart();
    this.cart$.subscribe(cart=>{
      this.cart=cart;
    });    
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
