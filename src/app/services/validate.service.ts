import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user, secondPassword){
    if(user.username == undefined || user.email == undefined || user.password == undefined || secondPassword == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword(password1, password2) {
    if (password1 === password2) {
      return true;
    }  else {
      return false;
    }
  }

}
