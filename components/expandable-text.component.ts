import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expandable-text',
  styleUrls: ['./expandable-text.component.scss'],
  template: `
    <div *ngIf="text" class="expandable-text-container" [ngClass]="{'expand': expanded}"
         [ngStyle]="expanded ? {'line-height.em': lineHeightEm} : {'max-height.em': rows*lineHeightEm, 'line-height.em': lineHeightEm}">
      <span class="expandable-text-content">{{text}}</span>
      <div class="expandable-text-limiter-container" [ngStyle]="expanded ? {} : {'min-height.em': rows*lineHeightEm}">
        <div class="expandable-text-limiter" [ngStyle]="expanded ? {} : {'height.em': lineHeightEm, 'top.em': (rows-1)*lineHeightEm}"
             (click)="onClick($event)"></div>
      </div>
    </div>
  `
})
export class ExpandableTextComponent {
  expanded: boolean = false;
  @Input() text: string;
  @Input() rows: number = 4;
  /**
   * Very much optional (meaning that this probably should not be used) line height parameter. Defaults to 1.5.
   */
  @Input() lineHeightEm: number = 1.5;
  /**
   * By setting captureClick to true the mouse click event expanding/collapsing the text will be stopped (stopPropagation and
   * preventDefault). This should enable use inside clickable greater containers. However, there may be side effects, so default is false.
   * Use only when needed.
   */
  @Input() captureClick: boolean = false;

  onClick($event: MouseEvent) {
    this.expanded = !this.expanded;
    if (this.captureClick) {
      $event.stopPropagation();
      $event.preventDefault();
    }
  }
}
