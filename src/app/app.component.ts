import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatDialog, MatSidenav } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { AuthService } from './service/auth.service';
import { User } from './model/user';
import { MediaMatcher, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, NavigationStart } from '@angular/router';
import { UrlConstant } from './constants/url.constants';
import { ApplicationModule, ApplicationModuleOption } from './model/application-module';
import { AppConstant } from './constants/app.contants';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingService } from './service/setting.service';
import { LoaderService } from './service/loader.service';
import { MediaType } from './constants/media.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Academia';
  modules = AppConstant.AppModules;
  public showLoader: boolean;
  @ViewChild('snav') sideNav: MatSidenav;
  public isMobile: boolean;
  
  constructor(
    private settingService: SettingService,
    public authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private loaderService: LoaderService
  ) 
  {

  }

  mediaQueryListener(state: BreakpointState) {
    this.isMobile = state.matches;

    if(this.isMobile) {
      this.sideNav.close();
    }
    else {
      this.sideNav.open();
    }
  }

  ngOnInit(){   
    this.settingService.Init();

    this.breakpointObserver.observe([ `(max-width: ${MediaType.Mobile})`])
      .subscribe( state => this.mediaQueryListener(state));

    this.loaderService.loaderVisibilityChanged$.subscribe( t => {
      //set to prevent lifecycle change error.
      setTimeout(() => {
        this.showLoader = t;
      }, 0);
    });
   
    this.router.events.subscribe(evt => this.handleRouterEvents(evt)); 
  }

  handleRouterEvents(evt) {
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
  }

  selectOptionHandler(option: ApplicationModuleOption){
    this.handleMenuClick();
  }

  ngOnDestroy(): void {
  }

  logout(){
    this.sideNav.close();
    this.authService.logout();
    this.router.navigate([UrlConstant.LoginPath]);
  }

  handleMenuClick(){
    if(this.isMobile){
      this.sideNav.close();
    }
  }

  showSetting(){
    this.handleMenuClick();
    this.router.navigate(['/settings']);
  }
}