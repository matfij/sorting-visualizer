import { Observable } from 'rxjs';
import { ArrayItem } from '../definitions/array-item';
import { SortStrategy } from '../definitions/sort-strategy';

export class SortService {
  constructor(private sortService: SortStrategy) {}

  sort(array: ArrayItem[]): Observable<ArrayItem[]> {
    return this.sortService.sort(array);
  }
}
