import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { OrderSuccessComponent } from './order-success/order-success.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
