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
  // item = {
  //   name :string,

  // };

  userdetails:Observable<any>;

  constructor( private db: AngularFireDatabase,
    private afAuth : AngularFireAuth) {
    
   }
  //  private name : FirebaseObj
   save(user: firebase.User){
     this.db.object('/users/'+user.uid).update({
       name: user.displayName,
       email: user.email,
       isAdmin:false
     });  
    
   }

 get (uid : string){
   //this.userdetails = this.db.object('/users/'+uid).valueChanges();
   //return this.userdetails;
   return {
     name:"manjujohn",
     email:"manjujohn007@gmail.com",
     isAdmin:true
   }
    
 }
}
