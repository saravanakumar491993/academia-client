import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { API } from '../constants/api.constants';
import { Router } from '@angular/router';
import { UrlConstant } from '../constants/url.constants';

@Injectable()
export class AuthService {

  public currentUser: User;

  constructor(
    private http: HttpClient,
    private router: Router
  )
  { 
  }

  public isLoggedIn(){
    return this.getAuthToken() != null;
  }

  public authenticate (user: User) {
    this.http.post(API.Authenticate, user).subscribe(res => {
      window.localStorage.setItem("authtoken", res["token"]);
      this.currentUser = res["user"];
      this.router.navigate([UrlConstant.StartPath]);
    });
  }

  public getAuthToken(){
    return  window.localStorage.getItem("authtoken");
  }

  public logout(){
      window.localStorage.removeItem("authtoken");
      this.currentUser = null;

  }
}
