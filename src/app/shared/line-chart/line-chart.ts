import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { LineChartData } from '../models';

@Component({
  selector: 'app-line-chart',
  imports: [PlotlyModule],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart implements OnChanges {
  @Input() chartData!: LineChartData;

  public graph = {
    // Data
    data: [
      {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers'
      },
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
      this.graph.data[0].y = this.chartData.y as never[];
      this.graph.layout.title.text = this.chartData.title;
      this.graph.layout.xaxis.title.text = this.chartData.xAxisTitle;
      this.graph.layout.yaxis.title.text = this.chartData.yAxisTitle;
    }
  }
}
