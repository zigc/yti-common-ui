import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-back-button',
  styleUrls: ['./back-button.scss'],
  template: `
    <div class="row">
      <div class="col-12">
        <a [id]="id" (click)="this.back.next()"></a>
      </div>
    </div>
  `
})
export class BackButtonComponent {

  @Input() id: string;
  @Output() back = new EventEmitter();
}
