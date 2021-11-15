import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'simple-to-do-with-auth';
  unsubscribe$ = new Subject<void>();

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  get userName(){
    return this.authService.getUsername();
  }

  get isLogged(){
    return this.authService.getAuthToken();
  }

  logout(){
    return this.authService
    .logout()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(item => {
      this.router.navigate(['login']);
    });
  }

}
