export interface LineChartData {
    x: (string | number)[];
    y: (string | number)[];
    title: string;
    mode: string;
    xAxisTitle: string;
    yAxisTitle: string;
}

export interface StackedAreaChartData {
    x: (string | number)[];
    y1: (string | number)[];
    y2: (string | number)[];
    title: string;
    mode: string;
    xAxisTitle: string;
    yAxisTitle: string;
    y1Name: string;
    y2Name: string;
    y1Fill: string;
    y2Fill: string;
}

export interface MultiLineChartData {
    x: (string | number)[];
    y1: (string | number)[];
    y2: (string | number)[];
    title: string;
    mode: string;
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
    textinfo: string;
}