export interface LineChartData {
    x: (string | number)[];
    y: (string | number)[];
    title: string;
    xAxisTitle: string;
    yAxisTitle: string;
}

export interface StackedAreaChartData {
    x: (string | number)[];
    y1: (string | number)[];
    y2: (string | number)[];
    title: string;
    xAxisTitle: string;
    yAxisTitle: string;
    y1Name: string;
    y2Name: string;
}

export interface PieChartData {
    labels: string[];
    values: number[];
    title: string;
    hole: number;
}