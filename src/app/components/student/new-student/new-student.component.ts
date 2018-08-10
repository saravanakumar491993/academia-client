import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student } from '../../../model/student';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { StudentService } from '../../../service/student.service';
import { AppConstant } from '../../../constants/app.contants';
import { LoaderService } from '../../../service/loader.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private studentService: StudentService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  formSubmittedHandler(student: Student) {
    this.loaderService.setLoaderVisibility(true);
    this.studentService.add(student).subscribe(
      res => this.AddStudentSuccessHandler(res),
      error => this.AddStudentErrorHandler(error)
    )
  }


  AddStudentSuccessHandler(res) {
    this.loaderService.setLoaderVisibility(false);
    var student = res
    this.router.navigate(['students', student.id]);
    this.snackBar.open("Student added", "Close",  {
      duration: AppConstant.SnackBarDismissalTime
    })
  }

  AddStudentErrorHandler(error) {
    this.loaderService.setLoaderVisibility(false);
    var status = error["status"];
    switch (status) {
      case 409:
        this.snackBar.open("Student already exists", "Close",  {
          duration: AppConstant.SnackBarDismissalTime
        })
        break;
    }
  }
}
