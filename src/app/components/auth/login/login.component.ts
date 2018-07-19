import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../../model/user';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ){

  }
  user: User = new User();

  ngOnInit() {
  }

  login(){
    this.authService.authenticate(this.user);
  }
}
