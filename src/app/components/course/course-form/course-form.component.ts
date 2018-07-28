import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Course } from '../../../model/course';
import { CourseService } from '../../../service/course.service';
import { Router } from '@angular/router';
import { API } from '../../../constants/api.constants';
import { MatSnackBar } from '@angular/material';
import { AppConstant } from '../../../constants/app.contants';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  @Input()
  course: Course = new  Course();

  @Output()
  formSubmitted: EventEmitter<Course> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {
  }

  submitHandler() {
    this.formSubmitted.emit(this.course);
  }
 
}
