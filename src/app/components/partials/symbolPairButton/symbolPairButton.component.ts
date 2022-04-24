import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from 'chart.js';
import { ChartConfig } from 'src/app/configurations/chartConfig';
import { SymbolButtonConfig } from 'src/app/configurations/symbolButtonConfig';


@Component({
  selector: 'app-symbolPairButton',
  templateUrl: './symbolPairButton.component.html',
  styleUrls: ['./symbolPairButton.component.css'],
})
export class SymbolPairButtonComponent implements OnInit {

  ///properties 
  btnclass = 'btn-secondary';
  @Input()
  config!: ChartConfig;
 
  @Input() symbolConfig:SymbolButtonConfig = new SymbolButtonConfig()
  @Output() onRemove: EventEmitter<any> = new EventEmitter() 
  /// methods 
  ngOnInit() {
    if (this.symbolConfig.isActive) {
      this.btnclass = 'btn-primary';
    }
  }
  btnClicked() {
    if (this.btnclass == 'btn-primary') {
      this.btnclass = 'btn-secondary';
      this.config.removePair(this.symbolConfig.symbolName, this.symbolConfig.symbol);
    } else {
      this.btnclass = 'btn-primary';
      this.config.addPair(
        this.symbolConfig.symbolName,
        this.symbolConfig.symbol,
        this.symbolConfig.symbolId,
        this.symbolConfig.color,
        this.symbolConfig.pointColor
      );
    }
  }
  remove(){
    this.onRemove.emit()
  }
}
