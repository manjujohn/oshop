import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { AppUser } from './models/app-file';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard  implements CanActivate{

  appUser : AppUser
  isAdmin : boolean

  constructor(private auth : AuthService, private userService : UserService) { }
  canActivate() : Observable<boolean>{
      return this.auth.appUser$.pipe(map(appuser=>{
        return appuser.subscribe(res =>{
          this.isAdmin = res.isAdmin
          console.log(this.isAdmin);
          return this.isAdmin;
        })
     }))
}
}
