import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationModule, ApplicationModuleOption } from '../../../model/application-module';

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss']
})
export class OptionItemComponent implements OnInit {

  @Input()
  appModule: ApplicationModule;
  
  @Output()
  optionSelected: EventEmitter<ApplicationModuleOption> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  selectOption(option: ApplicationModuleOption){
    this.optionSelected.emit(option);
  }
}
