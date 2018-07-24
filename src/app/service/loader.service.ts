import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
  private loaderVisibilitySource = new Subject<boolean>();

  public showLoader: boolean = false; 
   loaderVisibilityChanged$ = this.loaderVisibilitySource.asObservable();

  setLoaderVisibility(isVisible: boolean) {
    this.loaderVisibilitySource.next(isVisible);
  }
}
