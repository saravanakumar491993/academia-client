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
  public selectedId: number;
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
      this.getCourse(1, 5);
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
      if (this.selectedId) {
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
    this.selectedId = null;
  }

  getCourse(page, pageSize) {
    this.courses = [];
    this.canShowEmpty = false;
    this.selectedId = null;
    this.courseService.list(page, pageSize).subscribe(res => {
      this.loaderService.setLoaderVisibility(true);
      setTimeout(() => {
        this.paginator.length = res["count"];
        this.courses = res["courses"];
        this.canShowEmpty = true;
        this.loaderService.setLoaderVisibility(false);
      }, 500);
    });
  }

  courseSelected(id) {
    if (this.isTablet) {
      this.canShowList = false;
    }
    this.selectedId = id;
  }

  courseDeletedHandler(id) {
    const c = this.courses.find(t => t.id == id)
    if (c) {
      const index: number = this.courses.indexOf(c);
      if (index !== -1) {
        this.courses.splice(index, 1);
      }

      if(c.id == this.selectedId){
        this.selectedId = null;
      }
    }
  }

  keyDownHandler(e: KeyboardEvent) {
    if (e.keyCode == 13) {
    }
  }
}
