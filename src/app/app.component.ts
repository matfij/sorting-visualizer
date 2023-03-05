import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArrayVisualizerComponent } from './components/array-visualizer/array-visualizer.component';
import { BubbleSortService } from './services/bubble-sort.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ArrayVisualizerComponent,
  ],
  template: `
    <main class="wrapper-main">
      <h2 class="text-title">Sorting Visualizer</h2>
      <button (click)="addNumber()">Add</button>
      <button (click)="sort()">Sort</button>
      <app-array-visualizer [array]="(array$ | async) || []"></app-array-visualizer>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  array: number[] = [];
  array$ = new BehaviorSubject(this.array);

  constructor(
    private bubbleSortService: BubbleSortService,
  ) {}

  addNumber() {
    const newNumber = Math.max(1, Math.floor(10 * Math.random()));
    this.array.push(newNumber);
    this.array$.next(this.array);
  }
  
  sort() {
    this.bubbleSortService.sort(this.array).subscribe((arr) => {
      console.log(arr)
      this.array = arr;
      this.array$.next(this.array);
    });
  }
}
