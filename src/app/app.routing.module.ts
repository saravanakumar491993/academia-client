import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { NewCourseComponent } from './components/course/new-course/new-course.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UrlConstant } from './constants/url.constants';
import { ListCourseComponent } from './components/course/list-course/list-course.component';
import { ShowCourseComponent } from './components/course/show-course/show-course.component';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { NewStudentComponent } from './components/student/new-student/new-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { ListStudentComponent } from './components/student/list-student/list-student.component';
import { ShowStudentComponent } from './components/student/show-student/show-student.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses/new', pathMatch: 'full' },

  //courses
  { path: 'courses/new', component: NewCourseComponent },
  { path: 'courses/:id/edit', component: EditCourseComponent },
  { path: 'courses', component: ListCourseComponent },
  { path: 'courses/:id', component: ShowCourseComponent },

  //students
  { path: 'students/new', component: NewStudentComponent },
  { path: 'students/:id/edit', component: EditStudentComponent },
  { path: 'students', component: ListStudentComponent },
  { path: 'students/:id', component: ShowStudentComponent },

  { path: 'settings', component: SettingComponent },
  { path: 'login', component: LoginComponent },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],

  declarations: []
})

export class AppRoutingModule { }
