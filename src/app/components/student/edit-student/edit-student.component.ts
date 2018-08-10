import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../../model/student';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../service/loader.service';
import { StudentService } from '../../../service/student.service';
import { MatSnackBar } from '@angular/material';
import { AppConstant } from '../../../constants/app.contants';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  private _studentId: number;
  @Input()
  get studentId(): number {
    return this._studentId;
  }
  set studentId(id: number) {
    this._studentId = id;
    this.loadStudent();
  }

  @Input()
  student: Student;

    
  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router

  ) { }
  

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = id;
    }
  }
  
  loadStudent() {
    this.student = null;
    this.loaderService.setLoaderVisibility(true);
    this.studentService.get(this.studentId).subscribe(student => {
      setTimeout(() => {
        if (student.id == this.studentId) {
          this.student = student;
          this.loaderService.setLoaderVisibility(false);
        }
      }, 500);
    });
  }


  formSubmittedHandler(student: Student){
    this.studentService.edit(student.id, student).subscribe(
      res => this.EditStudentSuccessHandler(res),
      error => this.EditStudentErrorHandler(error)
    )
  }

  EditStudentSuccessHandler(res) {
    this.router.navigate(['students', this.studentId]);
    this.snackBar.open("Student edited", "Close",  {
      duration: AppConstant.SnackBarDismissalTime
    })
  }

  EditStudentErrorHandler(error) {
    var status = error["status"];    
  }
}
