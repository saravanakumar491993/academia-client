import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { NewCourseComponent } from './components/course/new-course/new-course.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UrlConstant } from './constants/url.constants';
import { ListCourseComponent } from './components/course/list-course/list-course.component';
import { ShowCourseComponent } from './components/course/show-course/show-course.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses/new', pathMatch: 'full' },
  { path: 'courses/new', component: NewCourseComponent },
  { path: 'courses', component: ListCourseComponent },
  { path: 'courses/:id', component: ShowCourseComponent },
  { path: 'settings', component: SettingComponent },
  { path: 'login', component: LoginComponent },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ],

  declarations: []
})

export class AppRoutingModule { }
