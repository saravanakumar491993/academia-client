import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable()
export class SettingService {

  accentColors = [ "indigo", "green", "blue", "pink", "yellow" ];

  fontFamilies = [
    { "Key" : "Arial", "Value" : "arial" },
    { "Key" : "Courier New", "Value" : "courier-new" },
    { "Key" : "Segoe UI", "Value" : "segoe-ui" },
    { "Key" : "Times New Roman", "Value" : "times-new-roman" },
    { "Key" : "Verdana", "Value" : "verdana" }
  ]

  private _currentAccent: string = "green";
  get currentAccent(): string {
    return this._currentAccent;
  }

  private _currentTheme = "dark";
  get currentTheme(): string {
    return this._currentTheme;
  }
  
  private _currentFontFamily = "verdana"
  get currentFontFamily(): string {
    var fontFamily = window.localStorage.getItem("fontFamily");
    if(fontFamily != null){
      this._currentFontFamily = fontFamily;
    }
    return this._currentFontFamily;
  }

  constructor(
    private overlayContainer: OverlayContainer
  ) { }

  private getCurrentStyle() {
    var accent = window.localStorage.getItem("accent");
    var theme = window.localStorage.getItem("theme");

    if(accent != null){
      this._currentAccent = accent;
    }

    if(theme != null){
      this._currentTheme = theme;
    }

    return `${this.currentAccent}-${this.currentTheme}-theme`;
  }

  public setAccent(accent){
    this.removeStyle();
    this._currentAccent = accent;
    window.localStorage.setItem("accent", accent);
    this.addStyle();
  }

  public setTheme(theme){
    this.removeStyle();
    this._currentTheme = theme;
    window.localStorage.setItem("theme", theme);
    this.addStyle();
  }

  private removeStyle(){
    var curStyle = this.getCurrentStyle();
     document.body.classList.remove(curStyle);
     this.overlayContainer.getContainerElement().classList.remove(curStyle);
    }

  private addStyle(){
    var curStyle = this.getCurrentStyle();
    document.body.classList.add(curStyle);
    this.overlayContainer.getContainerElement().classList.add(curStyle);
  }

  //font family
  private removeFontFamily(){
    document.body.classList.remove(this.currentFontFamily);
  }

  private addFontFamily(){
    document.body.classList.add(this.currentFontFamily);
  }

  public setFontFamily(fontFamily){
    this.removeFontFamily();
    this._currentFontFamily = fontFamily;
    window.localStorage.setItem("fontFamily", fontFamily);
    this.addFontFamily();
  }
  

  //init
  public Init(){
    this.removeStyle();
    this.removeFontFamily();
    this.addStyle();
    this.addFontFamily();
  }
}
