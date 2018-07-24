import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatDialog, MatSidenav } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { AuthService } from './service/auth.service';
import { User } from './model/user';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationStart } from '@angular/router';
import { UrlConstant } from './constants/url.constants';
import { ApplicationModule, ApplicationModuleOption } from './model/application-module';
import { AppConstant } from './constants/app.contants';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingService } from './service/setting.service';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Academia';
  mobileQuery: MediaQueryList;
  modules = AppConstant.AppModules;
  private _mobileQueryListener;
  public showLoader: boolean;
  @ViewChild('snav') sideNav: MatSidenav;

  constructor(
    private settingService: SettingService,
    public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private loaderService: LoaderService
  ) 
  {
    
  }


  ngOnInit(){   
    this.settingService.Init();
    this.loaderService.loaderVisibilityChanged$.subscribe( t => {
      //set to prevent lifecycle change error.
      setTimeout(() => {
        this.showLoader = t;
      }, 0);
    });
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
 
    this.router.events.subscribe(evt =>{

      if (evt instanceof NavigationStart) {

        if(this.authService.isLoggedIn()){
          if(evt.url == UrlConstant.LoginPath){
            window.location.href= UrlConstant.StartPath;
          }
        }
        else{
          if(evt.url != UrlConstant.LoginPath){
            window.location.href= UrlConstant.LoginPath;
          }
        }
      }
    });
  }

  selectOptionHandler(option: ApplicationModuleOption){
    this.handleMenuClick();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(){
    this.sideNav.close();
    this.authService.logout();
    this.router.navigate([UrlConstant.LoginPath]);
  }

  handleMenuClick(){
    if(this.mobileQuery.matches){
      this.sideNav.close();
    }
  }

  showSetting(){
    this.handleMenuClick();
    this.router.navigate(['/settings']);
  }
}