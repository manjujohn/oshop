import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from '../models/app-file';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user$: Observable<firebase.User>


  appUser: AppUser;

  constructor(private auth:AuthService) {
    auth.appUser$.subscribe(appUser=> this.appUser = appUser);
   }

  logout(){
   this.auth.logout();
   
  }

  


}
