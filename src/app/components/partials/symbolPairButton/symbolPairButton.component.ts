import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'chart.js';
import { ChartConfig } from 'src/app/configurations/chartConfig';

@Component({
  selector: 'app-symbolPairButton',
  templateUrl: './symbolPairButton.component.html',
  styleUrls: ['./symbolPairButton.component.css']
})
export class SymbolPairButtonComponent implements OnInit {


  
  btnclass = 'btn-secondary';
  @Input() symbolName!: String
  @Input() symbol !: String 
  @Input()
  config!: ChartConfig;
  @Input()
  color!: Color
  @Input()
  pointColor!: Color
  @Input()
  isActive:boolean = false
  ngOnInit() {
    if(this.isActive){
      this.btnclass = 'btn-primary'
    }
  }
  btnClicked(){
    if (this.btnclass == 'btn-primary') {
      this.btnclass = 'btn-secondary';
      this.config.removePair(this.symbolName, this.symbol)
    } else {
      this.btnclass = 'btn-primary';
      this.config.addPair(this.symbolName, this.symbol,this.color, this.pointColor)
    }
  }
}
