import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgMaterialModule } from './ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SettingComponent } from './components/setting/setting.component';
import { AppRoutingModule } from './app.routing.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { NewCourseComponent } from './components/course/new-course/new-course.component';
import { AuthInterceptor } from './filter/auth-interceptor';
import { httpInterceptorProviders } from './filter/index';
import { OptionItemComponent } from './components/option/option-item/option-item.component';
import { ListCourseComponent } from './components/course/list-course/list-course.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';
import { CourseService } from './service/course.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingComponent,
    NewCourseComponent,
    OptionItemComponent,
    ListCourseComponent,
    CourseFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ 
    httpInterceptorProviders,
    AuthService,
    MediaMatcher,
    CourseService
   ],
    bootstrap: [AppComponent
  ]
})
export class AppModule { }
