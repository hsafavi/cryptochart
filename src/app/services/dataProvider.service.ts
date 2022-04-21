import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

constructor(private client: HttpClient) { }
getSymbol(symbol1: String){
  const subject =  this.client.get(`https://api.coingecko.com/api/v3/coins/${symbol1.toLowerCase()}/market_chart?vs_currency=USD&days=30&interval=daily`
  )

  return subject
}
// toNormalDateString(date: Date) {
//   var mm = date.getUTCMonth() + 1;
//   var dd = date.getUTCDate();

//   return [date.getUTCFullYear(),
//           (mm>9 ? '' : '0') + mm,
//           (dd>9 ? '' : '0') + dd
//          ].join('');
// };
}
