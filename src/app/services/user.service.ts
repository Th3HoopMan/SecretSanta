import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from '../models/user';
import { Exchange } from '../models/exchange';

@Injectable()
export class UserService {
  authToken: any;
  user: User;
  exchanges: Exchange[];
  // isDev:boolean;

  constructor(private http:Http) {
    // this.isDev = true; // Change to false before deployment
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    // let ep = this.prepEndpoint('users/register');
    return this.http.post('http://localhost:3000/users/register', user ,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    // let ep = this.prepEndpoint('users/authenticate');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  findUser() {
    const id = this.getCurrentUser().id;
    return this.http.get('http://localhost:3000/users/' + id)
      .map(res => res.json());
  }

  // getOwnedExchanges() {
  //   const user = this.findUser();
  //   console.log("Moved over it now looks like ", this.user);
  //   // this.exchanges = this.user.ownedExchanges;
  //   // console.log("Owned exchanges are ", this.exchanges);
  // }

  updateOwnedExchanges(newExchange) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    const user = this.getCurrentUser();
    let updatedExchange = user.ownedExchanges;
    if (updatedExchange == undefined) {
      updatedExchange = [];
    }

    updatedExchange.push(newExchange);

    const req = {
        username: user.username,
        ownedExchanges: updatedExchange
    }

    return this.http.post('http://localhost:3000/users/updateOwned', req, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // let ep = this.prepEndpoint('users/profile');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }


  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //
  // prepEndpoint(ep){
  //   if(this.isDev){
  //     return ep;
  //   } else {
  //     return 'http://localhost:8080/'+ep;
  //   }
  // }
}
