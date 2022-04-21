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
  @Input() symbol1!: String
  @Input() symbol2 !: String 
  @Input()
  config!: ChartConfig;
  @Input()
  color!: Color
  @Input()
  pointColor!: Color
  ngOnInit() {
  }
  btnClicked(){
    if (this.btnclass == 'btn-primary') {
      this.btnclass = 'btn-secondary';
      this.config.removePair(this.symbol1, this.symbol2)
    } else {
      this.btnclass = 'btn-primary';
      this.config.addPair(this.symbol1, this.symbol2,this.color, this.pointColor)
    }
  }
}
