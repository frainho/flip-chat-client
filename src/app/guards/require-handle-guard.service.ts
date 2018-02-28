import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class RequireHandleGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('handle')) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
