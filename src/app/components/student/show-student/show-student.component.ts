import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';
import { Student } from '../../../model/student';
import { StudentService } from '../../../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../service/loader.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AppConstant } from '../../../constants/app.contants';
import { CountryCode, BloodGroup, NamePrefix, NameSuffix, MaritalStatus, PhoneType } from '../../../constants/person.constants';
import { PersonHelper } from '../../../helper/person-helper';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss']
})
export class ShowStudentComponent implements OnInit {

  CountryCode = CountryCode;
  BloodGroup = BloodGroup;
  NamePrefix = NamePrefix;
  NameSuffix = NameSuffix;
  MaritalStatus = MaritalStatus
  PhoneType = PhoneType
  
  @Input()
  public canClose: boolean;
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
  @Output()
  closed: EventEmitter<any> = new EventEmitter();
  @Output()
  studentDeleted: EventEmitter<string> = new EventEmitter();


  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
      }, 0);
    });
  }

  close() {
    this.closed.emit();
  }

  edit() {
    this.router.navigate([`students/${this.student.id}/edit`]);
  }

  delete() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { msg: `Delete ${this.student.firstName}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.delete(this.student.id).subscribe(res => {
          this.snackBar.open("Student deleted", "Close", {
            duration: AppConstant.SnackBarDismissalTime
          })
        })
      }
    })
  }
}
