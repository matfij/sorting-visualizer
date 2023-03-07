import { Injectable } from '@angular/core';
import { map, Observable, take, timer } from 'rxjs';
import { ArrayItem } from '../definitions/array-item';

@Injectable({
  providedIn: 'root',
})
export class BubbleSortService {
  constructor() {}

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
