import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfig } from 'src/app/configurations/chartConfig';
import {DataProviderService} from 'src/app/services/dataProvider.service';
import { SymbolPairButtonComponent } from '../partials/symbolPairButton/symbolPairButton.component';

@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css'],
})
export class BtcComponent implements AfterViewInit {
  constructor(private dataProvider: DataProviderService) {}
  ngAfterViewInit(): void {
    this.btcusdt.btnClicked()
  }
  
 @ViewChild('btcusdt') btcusdt!:SymbolPairButtonComponent
  ngOnInit() {
   
   
  }
  config: ChartConfig = new ChartConfig(this.dataProvider);

 
}
