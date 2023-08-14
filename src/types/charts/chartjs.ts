export interface ModelChartJsDataset {

    data: number[]
    label: string
    backgroundColor?: string | string[]

}

export interface ModelChartJs {

    data: ModelChartJsDataset[]
    labels: string[]
    
}