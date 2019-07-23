import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import {switchMap, map} from 'rxjs/operators'
import { AppUser } from './models/app-file';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>  
  result: any


  constructor(

    private userService: UserService,
    private afAuth : AngularFireAuth , 
    private router: Router,
    private route: ActivatedRoute) { 
      this.user$= afAuth.authState; 
      
   }

  login(){
    console.log("login reached",this.user$);
    let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log("returnUrlauth", returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    console.log("logout reached",this.user$);
    this.afAuth.auth.signOut();
    
  }
    get appUser$(){
      return this.user$.pipe(map(user=>{
        this.result =this.userService.get(user.uid)
          return this.result;
      }))
    }
}
 