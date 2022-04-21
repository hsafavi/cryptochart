import { ChartOptions, Color } from 'chart.js';
import { DataProviderService } from '../services/dataProvider.service';

export class ChartConfig {
  constructor(private dataProvider: DataProviderService) {}
  labels_initialized: boolean = false;
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartData: any[] = [];
  public lineChartLabels: any[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
 
  public refresh() {
    this.lineChartLabels = [...this.lineChartLabels];
  }
  public addPair(symbolName: String, symbol: String, color: Color, pointColor: Color) {
    const s1 = symbolName.toLowerCase();
    const s2 = symbol.toLowerCase();
    if(this.findIndex(s1, s2)>=0)
        return;
    this.lineChartData.push({ data: [], label: `${s1}(${s2})`, borderColor: color, pointBackgroundColor: pointColor  });
    this.getData(s1, s2);
  }
  public removePair(symbolName: String, symbol: String) {
    const s1 = symbolName.toLowerCase();
    const s2 = symbol.toLowerCase();
    const index = this.findIndex(s1, s2);
    if (index > -1) {
    this.lineChartData.splice(index, 1);
    }
    this.refresh();
  }
  private getData(symbolName: String, symbol: String) {
    this.dataProvider.getSymbol(symbolName).subscribe({
      next: (data: any) => {
    
        data.prices.forEach((p: any[]) => {
          const dataIndex = this.findIndex(symbolName, symbol);
          this.lineChartData[dataIndex].data.push(p[1]);
          if (!this.labels_initialized)
            this.lineChartLabels.push(this.convertToNormalTim(p[0]));
        });
        this.labels_initialized = true;
      
        this.refresh();
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
  private convertToNormalTim(t: number): String {
    const d = new Date(t);
    return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
  }
  private findIndex(symbolName: String, symbol: String): number {
    const pair =`${symbolName}(${symbol})`;
    for (let i = 0; i < this.lineChartData.length; i++) {
      if (this.lineChartData[i].label == pair) return i;
    }
    return -1;
  }
}
