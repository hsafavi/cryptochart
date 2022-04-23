import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartConfig } from 'src/app/configurations/chartConfig';
import { ButtonsDirective } from 'src/app/directives/cryptoButtonsHost.directive';
import { ICrypto } from 'src/app/interfaces/iCrypto';
import { DataProviderService } from 'src/app/services/dataProvider.service';
import { SymbolPairButtonComponent } from '../partials/symbolPairButton/symbolPairButton.component';

@Component({
  selector: 'app-btc',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  ///ctor
  constructor(private dataProvider: DataProviderService) {}

  /// properties
  private symbols: any[] = [];
  private addedButtons!: String[]
  cryptoSymbol: String = '';
  config: ChartConfig = new ChartConfig(this.dataProvider);
  @ViewChild('btcusdt') btcusdt!: SymbolPairButtonComponent;
  @ViewChild(ButtonsDirective, { static: false })
  cryptoButtons!: ButtonsDirective;
  selectedColor: any ='#59c400';

  /// methods
  ngOnInit() {
    this.config.addPair('bitcoin', 'btc', 'bitcoin', '#f00b', '#f00b');
    setTimeout(() => {
      this.dataProvider.getSymbolList().subscribe({
        next: (resp: any[]) => {
          this.symbols = resp;
        },
      });
    }, 3000);
    this.addedButtons = ['btc', 'eth', 'ada', 'matic', 'atom', 'bnb']
  }
  addSymbol() {
    if(this.addedButtons.indexOf(this.cryptoSymbol.toLowerCase())>=0){
      return
    }
    if (this.symbols.length == 0) {
    }
    const s = this.findSymbol();

    if (s) {
      this.addedButtons.push(s.symbol)
      const b = this.cryptoButtons.viewContainerRef.createComponent(
        SymbolPairButtonComponent
      );
      b.instance.symbolId = s.id;
      b.instance.symbol = s.symbol;
      b.instance.symbolName = s.name;
      b.instance.config = this.config;
      b.instance.color = this.selectedColor;
      b.instance.pointColor = this.selectedColor
    }
  }
  private findSymbol(): ICrypto | undefined {
    let c: any;
    for (let i = 0; i < this.symbols.length; i++) {
      c = this.symbols[i];

      if (c.symbol == this.cryptoSymbol) {
        return c;
      }
    }
    return undefined;
  }
}
