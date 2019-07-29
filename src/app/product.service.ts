import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 productArray : any[]=[];
 itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db:AngularFireDatabase) {
   // this.getAll();
   }
  create(products){
    return this.db.list('/products').push(products);
  }

  getAll(){
    
   this.itemsRef = this.db.list('/products');
   return this.itemsRef.snapshotChanges().pipe(map(items=>{
       return items.map(c=>({key: c.payload.key, ...c.payload.val()})         )
    }));
  }



  get(productId){
    return this.db.object('/products/'+ productId).valueChanges().pipe(map(p=>{
      return p;
    }));
  }
   update(productId, product){
     console.log("update",product,productId)
    return this.db.object('/products/'+productId).update(product);
   }

   delete(productId){
     return this.db.object('/products/'+productId).remove();
   }
}
