import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { Observable } from 'rxjs/Observable';
import { API } from '../constants/api.constants';

@Injectable()
export class CourseService {

  constructor(
    protected http: HttpClient
  ) { }

  addCourse (course: Course): Observable<Course> {
    return this.http.post<Course>(API.Courses, course);
  }
}
