import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { debounceTime, delay, map, tap } from 'rxjs/operators';

export interface LoginInfo{
  username:string;
  password:string;
}

enum AuthKeys{
  TOKEN = "TOKEN",
  USERNAME = "USERNAME"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  private setUserInfo(token:string, username:string){
     localStorage.setItem(AuthKeys.TOKEN, token);
     localStorage.setItem(AuthKeys.USERNAME, username);
  }

  private clearUserInfo(){
     localStorage.removeItem(AuthKeys.TOKEN);
     localStorage.removeItem(AuthKeys.USERNAME);
  }

  getAuthToken(){
    return localStorage.getItem(AuthKeys.TOKEN);
  }

  getUsername(){
    return localStorage.getItem(AuthKeys.USERNAME);
  }

  fakeLogin(user:LoginInfo){
    return of('TOKEN_FAKE').pipe(
      delay(3000),
      map(token => token),
      tap(token =>{
        this.setUserInfo(token, user?.username);
      })
    )
  }

  logout(){
    return of(null).pipe(
      delay(1000),
      map(token => token),
      tap(token =>{
        this.clearUserInfo();
      })
    )
  }

}
