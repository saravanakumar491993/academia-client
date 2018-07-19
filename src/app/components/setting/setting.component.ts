import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {


  constructor(
    public settingService: SettingService
  ) { }

  ngOnInit() {
  }

  
  setAccent(accent){
    this.settingService.setAccent(accent);
  }

  setTheme(theme){
    this.settingService.setTheme(theme);
  }

  setFontFamily(fontFamily){
    this.settingService.setFontFamily(fontFamily);
  }
}
