import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student } from '../../../model/student';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  formSubmittedHandler(student: Student){
    // this.courseService.add(course).subscribe(
    //   res => this.AddCourseSuccessHandler(res),
    //   error => this.AddCourseErrorHandler(error)
    // )
  }

}
