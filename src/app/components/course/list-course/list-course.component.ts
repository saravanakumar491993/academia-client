import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { CourseService } from '../../../service/course.service';
import { MediaMatcher, BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MediaType } from '../../../constants/media.constants';
import { Course } from '../../../model/course';
import { LoaderService } from '../../../service/loader.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public canShowList: boolean = true;
  private isTablet: boolean;
  public courses: Course[];
  public selectedCourse: Course;
  public canShowEmpty: boolean;

  constructor(
    private courseService: CourseService,
    private breakpointObserver: BreakpointObserver,
    private loaderService: LoaderService
  ) {
    breakpointObserver.observe([`(max-width: ${MediaType.Tablet})`])
      .subscribe(state => this.mediaQueryListener(state));
      courseService.courseDeleted$.subscribe(t => this.courseDeletedHandler(t))
  }

  ngOnInit() {
      this.getCourse(0, 5);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(t => {
      this.getCourse(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  ngOnDestroy(): void {
  }


  mediaQueryListener(state: BreakpointState) {
    this.isTablet = state.matches;

    if (this.isTablet) {
      if (this.selectedCourse) {
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
    this.selectedCourse = null;
  }

  getCourse(page, pageSize) {
    this.courses = [];
    this.canShowEmpty = false;
    this.selectedCourse = null;
    this.courseService.list(page, pageSize).subscribe(res => {
      this.loaderService.setLoaderVisibility(true);
      setTimeout(() => {
        this.paginator.length = res["count"];
        this.courses = res["courses"];
        this.canShowEmpty = true;
        this.loaderService.setLoaderVisibility(false);
      }, 0);
    });
  }

  courseSelected(selectedCourse) {
    if (this.isTablet) {
      this.canShowList = false;
    }
    this.selectedCourse = selectedCourse;
  }

  courseDeletedHandler(id) {
    const c = this.courses.find(t => t.id == id)
    if (c) {
      const index: number = this.courses.indexOf(c);
      if (index !== -1) {
        this.courses.splice(index, 1);
      }

      if(this.selectedCourse){
        this.selectedCourse = null;
      }
    }
  }

  keyDownHandler(e: KeyboardEvent) {
    if (e.keyCode == 13) {
    }
  }

  selectionChange(e) {
    if(!this.selectedCourse){
      return;
    }

    var selectedIndex = this.courses.indexOf(this.selectedCourse);
    
    if(e.keyCode == 38) { //up arrow
      if(selectedIndex > 0) {
        this.selectedCourse = this.courses[--selectedIndex]
      }
    }
    else if(e.keyCode == 40) { //down arrow
      if(selectedIndex < this.courses.length - 1) {
        this.selectedCourse = this.courses[++selectedIndex]
      }
    }
  }
}
