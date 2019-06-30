import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  canActivate(
    rote: ActivatedRouteSnapshot,
    state: RouterStateSnapshot 
  ): Observable<boolean> | boolean {
    if (this.cookieService.check('idpessoa')) {
      return(true)
    }
    this.router.navigate(['/login'])
    return false
  }
}
