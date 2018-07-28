import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material';
import { API } from '../constants/api.constants';
import { UrlConstant } from '../constants/url.constants';
import { AppConstant } from '../constants/app.contants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
      private authService: AuthService,
      private snackBar: MatSnackBar,
      private router: Router
    ) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var request: HttpRequest<any>

        if(req.url != `${API.Authenticate}`){
            var authtoken = this.authService.getAuthToken();
            request = req.clone({ setHeaders: { Authorization: authtoken } });
        }
        else{
            request = req;
        }
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // do stuff with response if you want
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                switch(err.status){
                    case 400:
                        this.badRequest();
                        break;
                    case 401:
                        this.unAuthorized(req);
                        break;
                    case 500:
                        this.unKnownError();
                        break;
                }
            }
        });
    }

    badRequest() {
        this.snackBar.open("Bad Request", "Close",  {
            duration: AppConstant.SnackBarDismissalTime
          });
    }

    unAuthorized(req) {
        if(req.url == API.Authenticate){
            this.snackBar.open("Login failed", "Close",  {
                duration: AppConstant.SnackBarDismissalTime
              });
        }
        else{
            this.authService.logout();
            this.router.navigate([UrlConstant.LoginPath]);
        }
    }

    unKnownError() {
        this.snackBar.open("Unknown Error occured", "Close",  {
            duration: AppConstant.SnackBarDismissalTime
        });
    }
}

