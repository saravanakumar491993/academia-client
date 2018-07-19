import { Component, OnInit } from '@angular/core';
import { Course } from '../../../model/course';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  formSubmittedHandler(course: Course){
  }

}
