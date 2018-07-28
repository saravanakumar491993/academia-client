import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../model/course';
import { CourseService } from '../../../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../service/loader.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AppConstant } from '../../../constants/app.contants';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.scss']
})
export class ShowCourseComponent implements OnInit {

  @Input()
  public canClose: boolean;

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
  @Output()
  closed: EventEmitter<any> = new EventEmitter();
  @Output()
  courseDeleted: EventEmitter<string> = new EventEmitter();


  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
      }, 0);
    });
  }

  close() {
    this.closed.emit();
  }

  edit() {
    this.router.navigate([`courses/${this.course.id}/edit`]);
  }

  delete() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { msg: `Delete ${this.course.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.delete(this.course.id).subscribe(res => {
          this.snackBar.open("Course deleted", "Close", {
            duration: AppConstant.SnackBarDismissalTime
          })
        })
      }
    })
  }
}
