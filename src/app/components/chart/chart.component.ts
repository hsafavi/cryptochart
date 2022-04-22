import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfig } from 'src/app/configurations/chartConfig';
import {DataProviderService} from 'src/app/services/dataProvider.service';
import { SymbolPairButtonComponent } from '../partials/symbolPairButton/symbolPairButton.component';

@Component({
  selector: 'app-btc',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  constructor(private dataProvider: DataProviderService) {}
  
 @ViewChild('btcusdt') btcusdt!:SymbolPairButtonComponent
  ngOnInit() {
   this.config.addPair('bitcoin','btc','#f00b','#f00b')
   
  }
  config: ChartConfig = new ChartConfig(this.dataProvider);

}
