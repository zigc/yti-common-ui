import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-symbol',
  styleUrls: ['./information-symbol.component.scss'],
  template: `&nbsp;<i *ngIf="infoText" class="fa fa-info-circle" [ngbTooltip]="infoText | translate"></i>`
})
export class InformationSymbolComponent {
  @Input() infoText: string;
}
