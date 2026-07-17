import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { MultiLineChartData } from '../models';

@Component({
  selector: 'app-multi-line-chart',
  imports: [PlotlyModule],
  templateUrl: './multi-line-chart.html',
  styleUrl: './multi-line-chart.css',
})
export class MultiLineChart implements OnChanges {
  @Input() chartData!: MultiLineChartData;

  public graph = {
    // Data
    data: [
      {
        x: [],
        y: [],
        name: '',
        type: 'scatter',
        mode: 'lines+markers',
      },
      {
        x: [],
        y: [],
        name: '',
        type: 'scatter',
        mode: 'lines+markers',
      }
    ],
    // Layout
    layout: {
      title: { text: '' },
      xaxis: {
        visible: true,
        title: {
          text: ''
        }
      },
      yaxis: {
        visible: true,
        title: {
          text: ''
        }
      },
      autosize: true,
      automargin: true,
    },
    // Config
    config: {
      displayModeBar: false,
      responsive: true,
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartData) {
      this.graph.data[0].x = this.chartData.x as never[];
      this.graph.data[0].y = this.chartData.y1 as never[];
      this.graph.data[0].name = this.chartData.y1Name;
      this.graph.data[1].x = this.chartData.x as never[];
      this.graph.data[1].y = this.chartData.y2 as never[];
      this.graph.data[1].name = this.chartData.y2Name;
      this.graph.layout.title.text = this.chartData.title;
      this.graph.layout.xaxis.title.text = this.chartData.xAxisTitle;
      this.graph.layout.yaxis.title.text = this.chartData.yAxisTitle;
    }
  }

}
