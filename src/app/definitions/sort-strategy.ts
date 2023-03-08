import { Observable } from 'rxjs';
import { ArrayItem } from './array-item';

export interface SortStrategy {
  sort(array: ArrayItem[]): Observable<ArrayItem[]>;
}

export interface SortStrategyOption {
  name: string;
  strategy: SortStrategy;
}
