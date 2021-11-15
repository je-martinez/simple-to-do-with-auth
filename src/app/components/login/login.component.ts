import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, LoginInfo } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup;
  unsubscribe$ = new Subject<void>();
  loading:boolean = false;
  redirecting:boolean = false;

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  get title(){
    return !this.redirecting ? 'Log in':`Welcome back ${this.authService.getUsername()}`
  }

  get formValue(){
    return this.loginForm.value as LoginInfo;
  }

  get classesContainer(){
    const mainClasses = ['login'];
    this.loading ? mainClasses.push('loading'):'';
    this.redirecting ? mainClasses.push('ok'):'';
    return mainClasses?.join(' ');
  }

  private initForm(){
    this.loginForm = this.fb.group({
      username:[null, Validators.required],
      password:[null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(){
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }

  login(){
    console.log(this.formValue);
    this.loading = true;
    this.authService.fakeLogin(this.formValue).pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.redirecting = true;
      setTimeout(() => {
        this.router.navigate(['todo-list']);
      }, 1000);
    }, error => {
      this.loading = false;
    })
  }

}
