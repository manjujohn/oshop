import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
   items: ShoppingCartItem[] = [] ;
    constructor( public itemMap:{[productId:string]: ShoppingCartItem}){ 
      this.itemMap = itemMap || {};
      for (let productId in itemMap){
        let item = itemMap[productId];
        let x = new ShoppingCartItem();
        Object.assign(x,item);
        this.items.push(x);
      }
    }
    get totalPrice(){
      let sum =0;
      for(let productId in this.items){
        sum+=this.items[productId].totalPrice;
      }
      return sum;
    }


    getQuantity(product:Product){
  
     let item = this.itemMap[product.key];
     return item ? item.quantity:0;
    }

    get totalItemsCount(){
        let count = 0;
      for(let productId in this.itemMap){
        count += this.itemMap[productId].quantity;
      }
      return count;
    }
}