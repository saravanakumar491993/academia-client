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

  getCourses(page: number = 0, per_page: number = 0): Observable<Course[]>{
    return this.http.get<Course[]>(`${API.Courses}?page=${page}&per_page=${per_page}`);
  }

  getCourse(id, includes = null): Observable<Course>{
    let url = `${API.Courses}/${id}`
    return  this.http.get<Course>(url);
  }
}
