import { ChartOptions, Color } from 'chart.js';
import { DataProviderService } from '../services/dataProvider.service';

export class ChartConfig {

  ///ctor
  constructor(private dataProvider: DataProviderService) {}

  /// properties
  labels_initialized: boolean = false;
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartData: any[] = [];
  public lineChartLabels: any[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  /// methods
  public refresh() {
    this.lineChartLabels = [...this.lineChartLabels];
  }
  public addPair(
    symbolName: String,
    symbol: String,
    id: String,
    color: Color,
    pointColor: Color
  ) {
    const s1 = symbolName.toLowerCase();
    const s2 = symbol.toLowerCase();
    if (this.findIndex(s1, s2) >= 0) return;
    this.lineChartData.push({
      data: [],
      label: `${s1}(${s2})`,
      borderColor: color,
      pointBackgroundColor: pointColor,
    });
    this.getData(id, s2, s1);
  }
  public removePair(symbolName: String, symbol: String) {
  
    const index = this.findIndex(symbolName, symbol);
    if (index > -1) {
      this.lineChartData.splice(index, 1);
    }
    this.refresh();
  }
  private getData(symbolId: String, symbol: String, symbolName: String) {
   
    this.dataProvider.getSymbol(symbolId).subscribe({
      next: (data: any) => {
        data.prices.forEach((p: any[]) => {
          const dataIndex = this.findIndex(symbolName, symbol);
          this.lineChartData[dataIndex].data.push(p[1]);
          if (!this.labels_initialized)
            this.lineChartLabels.push(this.convertToNormalTimeString(p[0]));
        });
        this.labels_initialized = true;

        this.refresh();
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
  private convertToNormalTimeString(t: number): String {
    const d = new Date(t);
    return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
  }
  private findIndex(symbolName: String, symbol: String): number {
    const pair = `${symbolName.toLowerCase()}(${symbol.toLowerCase()})`;
    for (let i = 0; i < this.lineChartData.length; i++) {
      if (this.lineChartData[i].label == pair) return i;
    }
    return -1;
  }
}
