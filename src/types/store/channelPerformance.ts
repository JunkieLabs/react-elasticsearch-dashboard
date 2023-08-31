export interface ModelChannelPerformanceFilters {
    bucket: string;
    bouquets: string[];
    bouquetChannelsMap: { [bouquet: string]: string[] };
    // plots: ModelAnalyticPlot[]
}