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
  public lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public refresh() {
    this.lineChartLabels = [...this.lineChartLabels];
  }
  public addPair(symbol1: String, symbol2: String, color: Color, pointColor: Color) {
    let s1 = symbol1.toUpperCase();
    let s2 = symbol2.toUpperCase();
    if(this.findIndex(s1, s2)>=0)
        return;
    this.lineChartData.push({ data: [], label: s1+s2, borderColor: color, pointBackgroundColor: pointColor  });
    this.getData(s1, s2);
  }
  public removePair(symbol1: String, symbol2: String) {
    let s1 = symbol1.toUpperCase();
    let s2 = symbol2.toUpperCase();
    const index = this.findIndex(s1, s2);
    if (index > -1) {
    this.lineChartData.splice(index, 1);
    }
    this.refresh();
  }
  private getData(s1: String, s2: String) {
    this.dataProvider.getSymbol(s1, s2).subscribe({
      next: (data: any) => {
        JSON.parse(data.data1d).forEach((p: any[]) => {
          let dataIndex = this.findIndex(s1, s2);
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
    let d = new Date(t * 1000);
    return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
  }
  private findIndex(s1: String, s2: String): number {
    let pair = s1.toUpperCase().concat(s2.toUpperCase());
    for (let i = 0; i < this.lineChartData.length; i++) {
      if (this.lineChartData[i].label == pair) return i;
    }
    return -1;
  }
}
