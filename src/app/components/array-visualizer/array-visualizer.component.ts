import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ArrayItem } from 'src/app/definitions/array-item';

@Component({
  selector: 'app-array-visualizer',
  imports: [CommonModule],
  template: `
    <div *ngIf="array$ | async as arrayItems" class="wrapper-array">
      <div
        *ngFor="let item of arrayItems"
        class="item-array"
        [ngClass]="{ 'item-array-active': item.active }"
        style="height: {{ getItemHeight(item) }};"
      ></div>
    </div>
  `,
  styleUrls: ['./array-visualizer.component.scss'],
  standalone: true,
})
export class ArrayVisualizerComponent {
  @Input() array$!: Observable<ArrayItem[]>;

  getItemHeight(item: ArrayItem) {
    const heightRem = 0.5 * item.value;
    return `${heightRem}rem`;
  }
}
