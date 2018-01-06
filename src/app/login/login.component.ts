import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.userService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.userService.storeUserData(data.token, data.user);
          this._flashMessagesService.show('You are now logged in', {
            cssClass: 'alert-success',
            timeout: 5000
          });
          this.router.navigate(['/home']);
        } else {
          this._flashMessagesService.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
          this.router.navigate(['/login']);
        }
    });
  }

}
