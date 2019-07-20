import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route, state:RouterStateSnapshot){
    return this.auth.user$.pipe(map(user=>{
      console.log("user-auth guard",user.displayName);
      if(user) return true;
    this.router.navigate(['/login'], {queryParams: {returnUrl :state.url}});
      return false;
    }));

  }
}
