import { Component } from '@angular/core';
import { ArrayVisualizerComponent } from './components/array-visualizer/array-visualizer.component';

@Component({
  selector: 'app-root',
  imports: [
    ArrayVisualizerComponent,
  ],
  template: `
    <main class="wrapper-main">
      <h2 class="text-title">Sorting Visualizer</h2>
      <button (click)="addNumber()">++</button>
      <app-array-visualizer [array]="array"></app-array-visualizer>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  array = [1, 2, 3, 4, 5];

  addNumber() {
    const newNumber = Math.floor(10 * Math.random());
    this.array.push(newNumber);
  }
}
