export type MockIndex = {
  country: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
};

export const mockIndices: MockIndex[] = [
  {
    country: "United States",
    name: "S&P 500",
    value: 5482.4,
    change: 18.5,
    changePercent: 0.34,
  },
  {
    country: "United States",
    name: "Nasdaq 100",
    value: 19764.2,
    change: 100.2,
    changePercent: 0.51,
  },
  {
    country: "United States",
    name: "Dow Jones",
    value: 39118.9,
    change: -45.3,
    changePercent: -0.12,
  },
  {
    country: "Japan",
    name: "Nikkei 225",
    value: 39215.8,
    change: -70.5,
    changePercent: -0.18,
  },
  {
    country: "Japan",
    name: "TOPIX",
    value: 2798.1,
    change: 8.4,
    changePercent: 0.3,
  },
  {
    country: "Germany",
    name: "DAX",
    value: 18472.1,
    change: 52.6,
    changePercent: 0.29,
  },
  {
    country: "United Kingdom",
    name: "FTSE 100",
    value: 8215.4,
    change: -12.8,
    changePercent: -0.16,
  },
  {
    country: "France",
    name: "CAC 40",
    value: 7631.2,
    change: 21.7,
    changePercent: 0.29,
  },
  {
    country: "South Korea",
    name: "KOSPI",
    value: 2807.6,
    change: 14.9,
    changePercent: 0.53,
  },
  {
    country: "China",
    name: "Shanghai Composite",
    value: 2997.3,
    change: -9.2,
    changePercent: -0.31,
  },
  {
    country: "Hong Kong",
    name: "Hang Seng",
    value: 17978.5,
    change: 86.4,
    changePercent: 0.48,
  },
  {
    country: "India",
    name: "Nifty 50",
    value: 24286.5,
    change: 73.1,
    changePercent: 0.3,
  },
  {
    country: "Australia",
    name: "ASX 200",
    value: 7893.2,
    change: -18.6,
    changePercent: -0.24,
  },
];
