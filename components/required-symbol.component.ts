import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-required-symbol',
  styleUrls: ['./required-symbol.component.scss'],
  template: `<i class="fa fa-asterisk" [ngbTooltip]="tooltipText | translate"></i>`
})
export class RequiredSymbolComponent {
  @Input() tooltipText: string = 'Required';
}
