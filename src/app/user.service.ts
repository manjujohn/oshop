import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable'
import { AppUser } from './models/app-file';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  item :any;

  userdetails:Observable<any>;

  constructor( private db: AngularFireDatabase,
    private afAuth : AngularFireAuth) {
    
   }
  //  private name : FirebaseObj
   save(user: firebase.User){
     console.log("uid",user.uid);
     if(user.uid!=='8Y8rPSR28vMEtyBNqdg8XNu06KD3'){
      this.db.object('/users/'+user.uid).update({
        name: user.displayName,
        email: user.email,
        isAdmin:false,
      });  
     }
    
    
   }
   //this.db.list('/orders').push(orders);

 get (uid : string){
    return this.db.object('/users/'+ uid).valueChanges();
 }
}
