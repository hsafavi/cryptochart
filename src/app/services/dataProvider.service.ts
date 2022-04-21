import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

constructor(private client: HttpClient) { }
getSymbol(symbol1: String, symbol2:String){
  let date=new Date();
  
  date.setDate(date.getDate()-1)
  
  const subject =  this.client.get(`https://cex.io/api/ohlcv/hd/${this.toNormalDateString(date)}/${symbol1}/${symbol2}`
  )

  return subject
}
toNormalDateString(date: Date) {
  var mm = date.getUTCMonth() + 1;
  var dd = date.getUTCDate();

  return [date.getUTCFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};
}
