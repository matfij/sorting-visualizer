import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-array-visualizer',
  template: `
    <div [innerHTML]="formatArray(array)" class="text-array"></div>
  `,
  styleUrls: ['./array-visualizer.component.scss'],
  standalone: true,
})
export class ArrayVisualizerComponent {
  @Input() array!: number[];

  formatArray(array: number[]): string {
    let formattedArray = '';
    array.forEach((num) => {
      for (let i = 0; i < num; i++) {
        formattedArray += `█`;
      }
      formattedArray += `<br>`;
    });
    return formattedArray;
  }
}
