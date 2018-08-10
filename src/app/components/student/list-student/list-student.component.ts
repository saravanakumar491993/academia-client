import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Student } from '../../../model/student';
import { StudentService } from '../../../service/student.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { LoaderService } from '../../../service/loader.service';
import { MediaType } from '../../../constants/media.constants';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public canShowList: boolean = true;
  private isTablet: boolean;
  public students: Student[];
  public selectedStudent: Student;
  public canShowEmpty: boolean;

  constructor(
    private studentService: StudentService,
    private breakpointObserver: BreakpointObserver,
    private loaderService: LoaderService
  ) {
    breakpointObserver.observe([`(max-width: ${MediaType.Tablet})`])
      .subscribe(state => this.mediaQueryListener(state));
    studentService.studentDeleted$.subscribe(t => this.studentDeletedHandler(t))
  }

  ngOnInit() {
      this.getStudent(0, 5);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(t => {
      this.getStudent(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  ngOnDestroy(): void {
  }


  mediaQueryListener(state: BreakpointState) {
    this.isTablet = state.matches;

    if (this.isTablet) {
      if (this.selectedStudent) {
        this.canShowList = false;
      }
      else {
        this.canShowList = true;
      }
    }
    else {
      this.canShowList = true;
    }
  }

  closeDetail() {
    if (this.isTablet) {
      this.canShowList = true;
    }
    this.selectedStudent = null;
  }

  getStudent(page, pageSize) {
    this.students = [];
    this.canShowEmpty = false;
    this.selectedStudent = null;
    this.studentService.list(page, pageSize).subscribe(res => {
      this.loaderService.setLoaderVisibility(true);
      setTimeout(() => {
        this.paginator.length = res["count"];
        this.students = res["students"];
        this.canShowEmpty = true;
        this.loaderService.setLoaderVisibility(false);
      }, 0);
    });
  }

  studentSelected(selectedStudent) {
    if (this.isTablet) {
      this.canShowList = false;
    }
    this.selectedStudent = selectedStudent;
  }

  studentDeletedHandler(id) {
    const s = this.students.find(t => t.id == id)
    if (s) {
      const index: number = this.students.indexOf(s);
      if (index !== -1) {
        this.students.splice(index, 1);
      }

      if(this.selectedStudent){
        this.selectedStudent = null;
      }
    }
  }

  keyDownHandler(e: KeyboardEvent) {
    if (e.keyCode == 13) {
    }
  }

  selectionChange(e) {
    if(!this.selectedStudent){
      return;
    }

    var selectedIndex = this.students.indexOf(this.selectedStudent);
    
    if(e.keyCode == 38) { //up arrow
      if(selectedIndex > 0) {
        this.selectedStudent = this.students[--selectedIndex]
      }
    }
    else if(e.keyCode == 40) { //down arrow
      if(selectedIndex < this.students.length - 1) {
        this.selectedStudent = this.students[++selectedIndex]
      }
    }
  }
}
