import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MediaMatcher, LayoutModule } from '@angular/cdk/layout';

import { NgMaterialModule } from './ngmaterial.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './service/auth.service';
import { SettingComponent } from './components/setting/setting.component';
import { AppRoutingModule } from './app.routing.module';
import { NewCourseComponent } from './components/course/new-course/new-course.component';
import { AuthInterceptor } from './filter/auth-interceptor';
import { httpInterceptorProviders } from './filter/index';
import { OptionItemComponent } from './components/option/option-item/option-item.component';
import { ListCourseComponent } from './components/course/list-course/list-course.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';
import { CourseService } from './service/course.service';
import { ShowCourseComponent } from './components/course/show-course/show-course.component';
import { SettingService } from './service/setting.service';
import { LoaderService } from './service/loader.service';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { StudentFormComponent } from './components/student/student-form/student-form.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { ListStudentComponent } from './components/student/list-student/list-student.component';
import { NewStudentComponent } from './components/student/new-student/new-student.component';
import { ShowStudentComponent } from './components/student/show-student/show-student.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingComponent,
    NewCourseComponent,
    OptionItemComponent,
    ListCourseComponent,
    CourseFormComponent,
    ShowCourseComponent,
    EditCourseComponent,
    DeleteDialogComponent,
    StudentFormComponent,
    EditStudentComponent,
    ListStudentComponent,
    NewStudentComponent,
    ShowStudentComponent,
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
    LayoutModule,
    CourseService,
    SettingService,
    LoaderService,
   ],
   entryComponents: [
    DeleteDialogComponent
  ],
    bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
