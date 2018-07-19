import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {


  constructor(
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit() {
  }

  currentAccent = "indigo"
  currentTheme = "dark"
  currentFont = "courier-new"

  fontFamilies = [
    { "Key" : "Arial", "Value" : "arial" },
    { "Key" : "Courier New", "Value" : "courier-new" },
    { "Key" : "Segoe UI", "Value" : "segoe-ui" },
    { "Key" : "Times New Roman", "Value" : "times-new-roman" },
    { "Key" : "Verdana", "Value" : "verdana" }
  ]
  
  setAccent(accent){
    //this.overlayContainer.getContainerElement().classList.remove(`${this.currentAccent}-${this.currentTheme}-theme`);
    document.body.classList.remove(`${this.currentAccent}-${this.currentTheme}-theme`)
    this.currentAccent = accent;
    document.body.classList.add(`${this.currentAccent}-${this.currentTheme}-theme`)
    //this.overlayContainer.getContainerElement().classList.add(`${this.currentAccent}-${this.currentTheme}-theme`);
  }

  setTheme(theme){

    //this.overlayContainer.getContainerElement().classList.remove(`${this.currentAccent}-${this.currentTheme}-theme`);
    document.body.classList.remove(`${this.currentAccent}-${this.currentTheme}-theme`)
    this.currentTheme = theme;
    document.body.classList.add(`${this.currentAccent}-${this.currentTheme}-theme`)
    //this.overlayContainer.getContainerElement().classList.add(`${this.currentAccent}-${this.currentTheme}-theme`);
  }

  setFontFamily(fontFamily){
    document.body.classList.remove(`${this.currentFont}`)
    this.currentFont = fontFamily;
    document.body.classList.add(`${this.currentFont}`)
  }
}
