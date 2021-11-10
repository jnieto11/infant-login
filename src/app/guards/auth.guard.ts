import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {

  }

  canActivate(): any { //Hacemos una validacion muy sencilla para mantener la integridad de las rutas
    if (localStorage.getItem('user')) {
      return true;
    } else {
      this._router.navigate(["login"]);
      return false;
    }
  }

}
