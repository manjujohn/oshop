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
    if(auth.user$){
      auth.appUser$.subscribe((appUser)=> {

        appUser.subscribe(res=>{
          this.appUser = res;
  
        })
        
      })

    }
    
   }

  logout(){
   this.auth.logout();
   this.appUser=null;
   
  }

  


}
