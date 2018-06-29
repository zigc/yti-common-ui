import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-required-symbol',
  template: `<i class="fa fa-asterisk" [ngbTooltip]="tooltipText | translate"></i>`
})
export class RequiredSymbolComponent {
  @Input() tooltipText: string = 'Required';
}
