import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
 
  async getCart():Promise<Observable<ShoppingCart>>{
    const cartId = await this.getOrCreateCartId();
  
    let product = this.db.object('/shopping-carts/'+ cartId);
     return product.valueChanges().pipe(map(x=>{
        return new ShoppingCart(x['items'])}
    ));
  }

  async addToCart(product:Product){
    this.updateCart(product,1);
  } 

  async removeFromCart(product:Product){
    this.updateCart(product,-1);
  }

  async clearCart(){
    const cartId = await this.getOrCreateCartId();
    console.log("cartdid",cartId);
    return this.db.object('/shopping-carts/' + cartId + '/items').remove();

    
  }
  private getItem(cartId:string, productId:string){

    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
    
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    })
  }


  private async updateCart(product:Product, change:number){
    const cartId = await this.getOrCreateCartId();
      const item$ = this.getItem(cartId,product.key);
      item$.valueChanges().pipe(take(1))
      .subscribe((item : any) => {
        let quantity = item?item.quantity+change : 0 +change ;
        if(quantity ===0) item$.remove();
        else{
          item$.update({
            title:product.title,
            price:product.price,
            key:product.key,
            imageUrl:product.imageUrl,
            quantity:quantity });
        }
    });

  }
}
