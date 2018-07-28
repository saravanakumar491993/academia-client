import { Component, OnInit, Input } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../model/course';
import { LoaderService } from '../../../service/loader.service';
import { CourseService } from '../../../service/course.service';
import { MatSnackBar } from '@angular/material';
import { AppConstant } from '../../../constants/app.contants';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  private _courseId: number;
  @Input()
  get courseId(): number {
    return this._courseId;
  }
  set courseId(id: number) {
    this._courseId = id;
    this.loadCourse();
  }

  @Input()
  course: Course;

    
  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private router: Router

  ) { }
  

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = id;
    }
  }
  
  loadCourse() {
    this.course = null;
    this.loaderService.setLoaderVisibility(true);
    this.courseService.get(this.courseId).subscribe(course => {
      setTimeout(() => {
        if (course.id == this.courseId) {
          this.course = course;
          this.loaderService.setLoaderVisibility(false);
        }
      }, 500);
    });
  }


  formSubmittedHandler(course: Course){
    this.courseService.edit(course.id, course).subscribe(
      res => this.EditCourseSuccessHandler(res),
      error => this.EditCourseErrorHandler(error)
    )
  }

  EditCourseSuccessHandler(res) {
    var course = res
    this.router.navigate(['courses', course.id]);
    this.snackBar.open("Course edited", "Close",  {
      duration: AppConstant.SnackBarDismissalTime
    })
  }

  EditCourseErrorHandler(error) {
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
