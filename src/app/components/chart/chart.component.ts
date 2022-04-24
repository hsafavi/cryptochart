import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartConfig } from 'src/app/configurations/chartConfig';
import { SymbolButtonConfig } from 'src/app/configurations/symbolButtonConfig';
import { ButtonsDirective } from 'src/app/directives/cryptoButtonsHost.directive';
import { ICrypto } from 'src/app/interfaces/iCrypto';
import { DataProviderService } from 'src/app/services/dataProvider.service';
import { SymbolPairButtonComponent } from '../partials/symbolPairButton/symbolPairButton.component';

@Component({
  selector: 'app-btc',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  ///ctor
  constructor(private dataProvider: DataProviderService) {}

  /// properties
  private symbols: any[] = [];
  private addedSymbols: SymbolButtonConfig[] = [];
  cryptoSymbol: String = '';
  config: ChartConfig = new ChartConfig(this.dataProvider);
  @ViewChild(ButtonsDirective, { static: false })
  cryptoButtons!: ButtonsDirective;
  selectedColor: any = '#59c400';
  errorMsg: String = '';
  /// methods
  ngOnInit() {
    setTimeout(() => {
      this.dataProvider.getSymbolList().subscribe({
        next: (resp: any[]) => {
          this.symbols = resp;
        },
      });
    }, 3000);
  }
  ngAfterViewInit(): void {
    this.getCryptoListFromLocal();
    setTimeout(() => {
      let i = 0;
      this.addedSymbols.forEach((elm) => {
        const btn = this.addSymbolButton(elm);
        if (i++ == 0) {
            btn.btnClicked();
         
        }
      });
    }, 5);
   
  }

  addSymbol(sym: String) {
    if (this.addedSymbols.filter((sm) => sm.symbol == sym).length > 0) {
      return;
    }
    if (this.symbols.length == 0) {
    }
    const s = this.findSymbol(sym.toLowerCase());

    if (s) {
      const btn = {
        symbolId: s.id,
        symbol: s.symbol,
        symbolName: s.name,
        color: this.selectedColor,
        pointColor: this.selectedColor,
        isActive: false,
      };
      this.addSymbolButton(btn);
      this.addedSymbols.push(btn);
      this.setCryptoListInLocal();
    }
  }
  addSymbolButton(s: SymbolButtonConfig): SymbolPairButtonComponent {
    const b = this.cryptoButtons.viewContainerRef.createComponent(
      SymbolPairButtonComponent
    );
    const conf = b.instance.symbolConfig;
    conf.symbolId = s.symbolId;
    conf.symbol = s.symbol;
    conf.symbolName = s.symbolName;
    b.instance.config = this.config;
    conf.color = s.color;
    conf.pointColor = s.pointColor;
    b.instance.onRemove.subscribe({
      next: () => {
        const ind = this.findInButtonList(s.symbolId);
        this.cryptoButtons.viewContainerRef.remove(ind);
        this.addedSymbols.splice(ind, 1);
        this.setCryptoListInLocal();
      },
    });
    return b.instance;
  }
  private findSymbol(sym: String): ICrypto | undefined {
    let c: any;
    for (let i = 0; i < this.symbols.length; i++) {
      c = this.symbols[i];

      if (c.symbol == sym) {
        return c;
      }
    }
    return undefined;
  }
  private findInButtonList(id: String) {
    for (let i = 0; i < this.addedSymbols.length; i++)
      if (this.addedSymbols[i].symbolId == id) return i;
    return -1;
  }
  private setCryptoListInLocal() {
    localStorage.setItem('cryptoList', JSON.stringify(this.addedSymbols));
  }
  private getCryptoListFromLocal() {
    const localList = localStorage.getItem('cryptoList');
    if (!localList) {
      this.addedSymbols = [
        {
          symbolName: 'bitcoin',
          symbol: 'btc',
          symbolId: 'bitcoin',
          color: '#f00b',
          pointColor: '#f00b',
          isActive: false,
        },
        {
          symbolName: 'ethereum',
          symbol: 'eth',
          symbolId: 'ethereum',
          color: '#00fb',
          pointColor: '#00fb',
          isActive: false,
        },
        {
          symbolName: 'cardano',
          symbol: 'ada',
          symbolId: 'cardano',
          color: '#f66b',
          pointColor: '#f66b',
          isActive: false,
        },
        {
          symbolName: 'cosmos',
          symbol: 'atom',
          symbolId: 'cosmos',
          color: '#0f0b',
          pointColor: '#0f0b',
          isActive: false,
        },
        {
          symbolName: 'matic network',
          symbol: 'matic',
          symbolId: 'matic-network',
          color: '#f60b',
          pointColor: '#f60b',
          isActive: false,
        },
        {
          symbolName: 'binance coin',
          symbol: 'bnb',
          symbolId: 'binancecoin',
          color: '#f06b',
          pointColor: '#f06b',
          isActive: false,
        },
      ];
      localStorage.setItem('cryptoList', JSON.stringify(this.addedSymbols));
    } else {
      this.addedSymbols = JSON.parse(localList || '');
    }
  }
}
