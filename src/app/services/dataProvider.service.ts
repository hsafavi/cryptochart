import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  constructor(private client: HttpClient, private spinner: NgxSpinnerService) {}
  getSymbol(symbolId: String) {
    this.spinner.show();
    const subject = this.client.get(
      `https://api.coingecko.com/api/v3/coins/${symbolId.toLowerCase()}/market_chart?vs_currency=USD&days=30&interval=daily`
    );

    return subject.pipe(
      map((p: any) => {
        this.spinner.hide();
        return p;
      })
    );
  }
  getSymbolList() {
    // this.spinner.show()
    const subject = this.client.get(
      `https://api.coingecko.com/api/v3/coins/list`
    );

    return subject.pipe(
      map((p: any) => {
        // this.spinner.hide()
        return p;
      })
    );
  }
}
