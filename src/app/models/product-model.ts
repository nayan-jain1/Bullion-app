export interface Product {
    name: string;
    id: number;
    values: {
      current: number;
      high: number;
      low: number;
      previous: number
    };
  }
  