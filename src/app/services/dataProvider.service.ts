import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

constructor(private client: HttpClient, private spinner:NgxSpinnerService) { }
getSymbol(symbol1: String){
  this.spinner.show()
  const subject =  this.client.get(`https://api.coingecko.com/api/v3/coins/${symbol1.toLowerCase()}/market_chart?vs_currency=USD&days=30&interval=daily`
  )

  return subject.pipe(map((p:any)=>{
    this.spinner.hide()
    return p
    
  }))
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
