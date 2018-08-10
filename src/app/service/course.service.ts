import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { Observable } from 'rxjs/Observable';
import { API } from '../constants/api.constants';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CourseService {

  private courseDeletedSource = new Subject<number>();
  courseDeleted$ = this.courseDeletedSource.asObservable();

  constructor(
    protected http: HttpClient
  ) { }

  add(course: Course): Observable<Course> {
    return this.http.post<Course>(API.Courses, course);
  }

  edit(id, course: Course): Observable<Course> {
    let url = `${API.Courses}/${id}`
    return this.http.put<Course>(url, course);
  }

  list(page: number = 0, perSize: number = 0): Observable<Course[]>{
    return this.http.get<Course[]>(`${API.Courses}?page=${page}&pageSize=${perSize}`);
  }

  get(id, includes = null): Observable<Course>{
    let url = `${API.Courses}/${id}`
    return  this.http.get<Course>(url);
  }

  delete(id): Observable<any> {
    let url = `${API.Courses}/${id}`
    this.courseDeletedSource.next(id);
    return this.http.delete(url)
  }
}
