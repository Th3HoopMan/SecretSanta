import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../models/user';
import { ValidateService } from '../services/validate.service';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  secondPassword: string;

  constructor(
    private validateService:ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    if (!this.validateService.validateRegister(this.user, this.secondPassword)) {
      this._flashMessagesService.show('You must fill out all fields', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }
    if (!this.validateService.validateEmail(this.user.email)) {
      this._flashMessagesService.show('You must enter a valid email', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }
    if (!this.validateService.validatePassword(this.user.password, this.secondPassword)) {
      this._flashMessagesService.show('Your passwords must match', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    //Register user
    this.userService.registerUser(this.user).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('You are now registered', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/login']);
      } else {
        this._flashMessagesService.show('Something went wrong...', { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/register']);
      }
    });

  }
}
