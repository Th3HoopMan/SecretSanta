import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExchangeService {
  authToken: any;
  exchange: any;
  constructor(private http:Http) { }

  createExchange(exchange) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    // let ep = this.prepEndpoint('users/register');
    return this.http.post('http://localhost:3000/exchanges/create', exchange,{headers: headers})
      .map(res => res.json());
  }

  validateExchange(exchange) {
    if (exchange.name == undefined || exchange.description == undefined
      || exchange.startDate == undefined || exchange.matchDate == undefined
      || exchange.endDate == undefined || exchange.privacy == undefined){
      return false;
    } else {
      return true;
    }
  }


}
