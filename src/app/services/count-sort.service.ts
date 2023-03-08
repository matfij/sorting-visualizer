import { Observable, timer, take, map } from 'rxjs';
import { ArrayItem } from '../definitions/array-item';
import { SortStrategy } from '../definitions/sort-strategy';

export class CountSortService implements SortStrategy {
  /**
   * Count sort:
   * https://en.wikipedia.org/wiki/Counting_sort
   */
  sort(array: ArrayItem[]): Observable<ArrayItem[]> {
    const arrayStates: ArrayItem[][] = [];
    const holes: ArrayItem[][] = [];
    const maxVal = Math.max(...array.map((item) => item.value));
    for (let i = 0; i <= maxVal; i++) {
      holes.push([]);
    }
    array.forEach((item) => {
      holes[item.value].push(item);
    });
    let arrayInd = 0;
    holes.forEach((hole) => {
      hole.forEach((item) => {
        array[arrayInd] = item;
        arrayInd++;
        arrayStates.push([...array]);
      })
    });
    let retInd = 0;
    return timer(0, 100).pipe(
      take(arrayStates.length),
      map(() => {
        const state = arrayStates[retInd];
        retInd++;
        return state;
      })
    );
  }
}
