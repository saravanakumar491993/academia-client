import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../model/course';
import { CourseService } from '../../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../service/loader.service';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.scss']
})
export class ShowCourseComponent implements OnInit {
 
  private _courseId: number;
  @Input()
  get courseId(): number{
    return this._courseId;
  }
  set courseId(id: number){
    this._courseId = id;
    this.loadCourse();
   
  }

  @Input()
  course: Course;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id){
      this.courseId = id;
    }
  }

  private loadCourse(){
    this.loaderService.setLoaderVisibility(true);
    this.courseService.getCourse(this.courseId).subscribe(course => {
      setTimeout(() => {
        this.course = course;
        this.loaderService.setLoaderVisibility(false);
      }, 2000);
    });
  }
}
