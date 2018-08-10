import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../model/student';
import { Observable } from 'rxjs/Observable';
import { API } from '../constants/api.constants';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StudentService {
  private studentDeletedSource = new Subject<number>()
  studentDeleted$ = this.studentDeletedSource.asObservable()

  constructor(
    protected http: HttpClient
  ) { }

  
  add(student: Student): Observable<Student> {
    return this.http.post<Student>(API.Students, student);
  }

  get(id, includes = null): Observable<Student>{
    let url = `${API.Students}/${id}`
    return  this.http.get<Student>(url);
  }

  edit(id, student: Student): Observable<Student> {
    let url = `${API.Students}/${id}`
    return this.http.put<Student>(url, student);
  }

  list(page: number = 0, perSize: number = 0): Observable<Student[]>{
    return this.http.get<Student[]>(`${API.Students}?page=${page}&pageSize=${perSize}`);
  }

  delete(id): Observable<any> {
    let url = `${API.Students}/${id}`
    this.studentDeletedSource.next(id);
    return this.http.delete(url)
  }
}
