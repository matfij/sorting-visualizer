import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-array-visualizer',
  template: `
    <p>array-visualizer works!</p>
    <p>{{ array }}</p>
  `,
  styleUrls: ['./array-visualizer.component.scss'],
  standalone: true,
})
export class ArrayVisualizerComponent {
  @Input() array!: number[];
}
