import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfig } from 'src/app/configurations/chartConfig';
import {DataProviderService} from 'src/app/services/dataProvider.service';
import { SymbolPairButtonComponent } from '../partials/symbolPairButton/symbolPairButton.component';

@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css'],
})
export class BtcComponent implements OnInit {
  constructor(private dataProvider: DataProviderService) {}
  
 @ViewChild('btcusdt') btcusdt!:SymbolPairButtonComponent
  ngOnInit() {
   this.config.addPair('bitcoin','btc','#f00b','#f00b')
   
  }
  config: ChartConfig = new ChartConfig(this.dataProvider);

}
