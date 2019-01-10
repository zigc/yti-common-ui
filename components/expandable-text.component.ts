import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expandable-text',
  styleUrls: ['./expandable-text.component.scss'],
  template: `
    <div *ngIf="text" class="expandable-text-container" [ngClass]="{'expand': expanded}" [ngStyle]="expanded ? {'line-height.em': lineHeightEm} : {'max-height.em': rows*lineHeightEm, 'line-height.em': lineHeightEm}">
      <span class="expandable-text-content">{{text}}</span>
      <div class="expandable-text-limiter-container" [ngStyle]="expanded ? {} : {'min-height.em': rows*lineHeightEm}">
        <div class="expandable-text-limiter" [ngStyle]="expanded ? {} : {'height.em': lineHeightEm, 'top.em': (rows-1)*lineHeightEm}" (click)="expanded = !expanded"></div>
      </div>
    </div>
  `
})
export class ExpandableTextComponent {
  expanded: boolean = false;
  @Input() text: string;
  @Input() rows: number = 4;
  @Input() lineHeightEm: number = 1.5;
}
