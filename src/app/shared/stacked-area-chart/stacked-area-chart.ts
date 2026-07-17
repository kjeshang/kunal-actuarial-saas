import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { StackedAreaChartData } from '../models';

@Component({
  selector: 'app-stacked-area-chart',
  imports: [PlotlyModule],
  templateUrl: './stacked-area-chart.html',
  styleUrl: './stacked-area-chart.css',
})
export class StackedAreaChart implements OnChanges {
  @Input() chartData!: StackedAreaChartData;

  public graph = {
    // Data
    data: [
      {
        x: [],
        y: [],
        name: '',
        type: 'scatter',
        mode:'',
        fill: '',
        stackgroup: 'one'
      },
      {
        x: [],
        y: [],
        name: '',
        type: 'scatter',
        mode:'',
        fill: '',
        stackgroup: 'one'
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
      hovermode: 'x unified'
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
      this.graph.data[0].fill = this.chartData.y1Fill;
      this.graph.data[0].mode = this.chartData.mode;
      this.graph.data[0].name = this.chartData.y1Name;
      this.graph.data[1].x = this.chartData.x as never[];
      this.graph.data[1].y = this.chartData.y2 as never[];
      this.graph.data[1].fill = this.chartData.y2Fill;
      this.graph.data[1].mode = this.chartData.mode;
      this.graph.data[1].name = this.chartData.y2Name;
      this.graph.layout.title.text = this.chartData.title;
      this.graph.layout.xaxis.title.text = this.chartData.xAxisTitle;
      this.graph.layout.yaxis.title.text = this.chartData.yAxisTitle;
    }
  }

}
