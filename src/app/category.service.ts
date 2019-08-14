import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) { }

  getCategories(){
     this.categoryRef = this.db.list('/categories', ref => ref.orderByChild('name'));
     return this.categoryRef.snapshotChanges().pipe(map(categories=>{
       return categories.map(c=>({key: c.payload.key, ...c.payload.val()}))
     }));
  }
}

