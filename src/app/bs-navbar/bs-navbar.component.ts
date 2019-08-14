import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from '../models/app-file';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit { 
  user$: Observable<firebase.User>
  appUser: AppUser;
  cart$  : Observable<ShoppingCart>;
  cart:ShoppingCart;

  constructor(private auth:AuthService, private cartService: ShoppingCartService) { 
    if(auth.user$){
      auth.appUser$.subscribe((appUser)=> {
        appUser.subscribe(res=>{
          this.appUser = res;
        })
      })
    }
   }

   async ngOnInit(){
    this.cart$= await this.cartService.getCart();
    this.cart$.subscribe(cart=>{
      this.cart=cart;
    });     
   }

  logout(){
   this.auth.logout();
   this.appUser=null;
   
  }

  


}
