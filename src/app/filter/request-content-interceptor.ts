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
export class RequestContentInterceptor implements HttpInterceptor {
  constructor(
    ) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set('content-type', 'application/json')
          });
        return next.handle(authReq);
    }
}

