import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArrayVisualizerComponent } from './components/array-visualizer/array-visualizer.component';
import { ArrayItem } from './definitions/array-item';
import { BubbleSortService } from './services/bubble-sort.service';
import { SortService } from './services/sort.service';

const SORT_STRATEGY = new InjectionToken<string>('sortStrategy');

@Component({
  selector: 'app-root',
  imports: [CommonModule, ArrayVisualizerComponent],
  providers: [{ provide: SORT_STRATEGY, useClass: BubbleSortService }],
  template: `
    <main class="wrapper-main">
      <section class="wrapper-app">
        <h2 class="text-title">Sorting Visualizer</h2>
        <div class="wrapper-buttons">
          <button (click)="addNumber()" class="button-primary">Extend</button>
          <button (click)="sort()" class="button-primary">Sort</button>
        </div>
        <app-array-visualizer [array$]="array$"></app-array-visualizer>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  array: ArrayItem[] = [];
  array$ = new BehaviorSubject(this.array);

  constructor(
    @Inject(SORT_STRATEGY)
    private sortService = new SortService(new BubbleSortService())
  ) {}

  addNumber() {
    const newItem: ArrayItem = {
      value: Math.random() * (20 - 1) + 1,
      active: false,
    };
    this.array.push(newItem);
    this.array$.next(this.array);
  }

  sort() {
    this.sortService.sort(this.array).subscribe((arr) => {
      this.array = arr;
      this.array$.next(this.array);
    });
  }
}
