import { DummyData } from "@/types/store/dummyData";


// Simulate fetching channelPerformances based on filter and subFilter
export async function fetchDummyChartsData(filter: string, subFilter: string): Promise<DummyData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Dummy product data
  const channelPerformances: DummyData[] = [
    { key: '11', value: 11 },
    { key: '12', value: 12 },
    { key: '13', value: 13 },
    // ... more channelPerformances
  ];

  // Filter and process channelPerformances based on filter and subFilter
  const channelPerformance = channelPerformances.filter((product) => {
    // Apply your filter and subFilter logic here
    return product.key.toLowerCase().includes(subFilter.toLowerCase());
  });

  return channelPerformance;
}