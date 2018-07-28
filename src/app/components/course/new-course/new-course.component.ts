import { Component, OnInit } from '@angular/core';
import { Course } from '../../../model/course';
import { MatSnackBar } from '@angular/material';
import { CourseService } from '../../../service/course.service';
import { Router } from '@angular/router';
import { AppConstant } from '../../../constants/app.contants';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  formSubmittedHandler(course: Course){
    this.courseService.add(course).subscribe(
      res => this.AddCourseSuccessHandler(res),
      error => this.AddCourseErrorHandler(error)
    )
  }

  AddCourseSuccessHandler(res) {
    var course = res
    this.router.navigate(['courses', course.id]);
    this.snackBar.open("Course added", "Close",  {
      duration: AppConstant.SnackBarDismissalTime
    })
  }

  AddCourseErrorHandler(error) {
    var status = error["status"];
    switch (status) {
      case 409:
        this.snackBar.open("Course code already exists", "Close",  {
          duration: AppConstant.SnackBarDismissalTime
        })
        break;
    }
  }
}
