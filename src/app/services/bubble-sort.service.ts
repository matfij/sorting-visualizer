import { Injectable } from '@angular/core';
import { map, Observable, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {

  constructor() {}

  sort(array: number[]): Observable<number[]> {
    const arrayStates: number[][] = [[]];
    for (let i = 0; i < array.length; i++) {
      for (let j = i; j < array.length; j++) {
        if (array[i] > array[j]) {
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
