export interface Restaurant {
  id: number;
  name: string;
  address?: string;
  cuisine?: string;
  notes?: string;
  image?: string;
  visited: boolean;
  rating?: number;
  tags?: string[];
}
