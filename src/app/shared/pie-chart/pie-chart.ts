import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { PieChartData } from '../models';

@Component({
  selector: 'app-pie-chart',
  imports: [PlotlyModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
})
export class PieChart implements OnChanges {
  @Input() chartData!: PieChartData;

  public graph = {
    // Data
    data: [
      {
        values: [],
        labels: [],
        type: 'pie',
        hole: 1,
        textinfo: '',
      }
    ],
    // Layout
    layout: {
      title: { text: '' },
      autosize: true,
      automargin: true,
      showlegend: true,
      legend: {
        orientation: 'h',
        y: '-0.1',
        x: '0.5',
        xanchor: 'center',
      },
    },
    // Config
    config: {
      displayModeBar: false,
      responsive: true,
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartData) {
      this.graph.data[0].values = this.chartData.values as never[];
      this.graph.data[0].labels = this.chartData.labels as never[];
      this.graph.layout.title.text = this.chartData.title;
      this.graph.data[0].hole = this.chartData.hole;
      this.graph.data[0].textinfo = this.chartData.textinfo;
    }
  }

}
