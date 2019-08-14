import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(orders){
    let result = await this.db.list('/orders').push(orders);
    this.cartService.clearCart();
    return result;
  }
  getOrders(){
    let orderRef = this.db.list('/orders');
    return orderRef.snapshotChanges().pipe(map(orders=>{
      return orders.map(c=>({key: c.payload.key, ...c.payload.val()})         )
   }));
  }

  getOrdersByUser(userId:string){
    return this.db.list('/orders',ref => {
      return ref.orderByChild('userId').equalTo(userId)
    }).snapshotChanges().pipe(map(orders=>{
      return orders.map(c=>({key: c.payload.key, ...c.payload.val()})         )
   }));
  }

  getOrderById(orderId:string){
    return this.db.object('/orders/'+orderId).valueChanges();
  }
}

