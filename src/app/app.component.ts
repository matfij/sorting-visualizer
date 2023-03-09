import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ArrayVisualizerComponent } from './components/array-visualizer/array-visualizer.component';
import { ArrayItem } from './definitions/array-item';
import { SortStrategyOption } from './definitions/sort-strategy';
import { BubbleSortService } from './services/bubble-sort.service';
import { CountSortService } from './services/count-sort.service';
import { SortService } from './services/sort.service';

const SORT_STRATEGY = new InjectionToken<string>('sortStrategy');

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ArrayVisualizerComponent],
  providers: [{ provide: SORT_STRATEGY, useClass: BubbleSortService }],
  template: `
    <main class="wrapper-main">
      <section class="wrapper-app">
        <h2 class="text-title">Sorting Visualizer</h2>
        <div class="wrapper-buttons">
          <button (click)="addNumber()" class="button-primary">Extend</button>
          <button (click)="clearArray()" class="button-primary">Clear</button>
          <select [(ngModel)]="selectedSortStrategy" class="select-primary">
            <option
              *ngFor="let strategy of SORT_STRATEGIES; let ind = index"
              value="{{ ind }}"
            >
              {{ strategy.name }}
            </option>
          </select>
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
  SORT_STRATEGIES: SortStrategyOption[] = [
    { name: 'Bubble Sort', strategy: new BubbleSortService() },
    { name: 'Count Sort', strategy: new CountSortService() },
  ];
  selectedSortStrategy = 0;
  array: ArrayItem[] = [];
  array$ = new BehaviorSubject(this.array);

  constructor(
    @Inject(SORT_STRATEGY)
    private sortService: SortService
  ) {}

  addNumber() {
    const newItem: ArrayItem = {
      value: Math.round(Math.random() * (20 - 1) + 1),
      active: false,
    };
    this.array.push(newItem);
    this.array$.next(this.array);
  }

  clearArray() {
    this.array = [];
    this.array$.next(this.array);
  }

  sort() {
    this.sortService = new SortService(
      this.SORT_STRATEGIES[this.selectedSortStrategy].strategy
    );
    this.sortService.sort(this.array).subscribe((arrayState) => {
      this.array = arrayState;
      this.array$.next(this.array);
    });
  }
}
