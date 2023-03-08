import { map, Observable, take, timer } from 'rxjs';
import { ArrayItem } from '../definitions/array-item';
import { SortStrategy } from '../definitions/sort-strategy';

export class BubbleSortService implements SortStrategy {
  /**
   * Bubble sort:
   * https://en.wikipedia.org/wiki/Bubble_sort
   */
  sort(array: ArrayItem[]): Observable<ArrayItem[]> {
    const arrayStates: ArrayItem[][] = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = i; j < array.length; j++) {
        if (array[i].value > array[j].value) {
          [array[i], array[j]] = [array[j], array[i]];
          arrayStates.push([...array]);
        }
      }
    }
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
