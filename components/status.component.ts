import { Component, Input } from '@angular/core';
import { Status } from '../entities/status';

@Component({
  selector: 'app-status',
  styleUrls: ['./status.component.scss'],
  template: `
    <span [class.bg-danger]="danger"
          [class.bg-warning]="warning"
          [class.bg-gray]="gray"
          [class.bg-white]="white"
          [class.bg-success]="success">{{status | translate}}</span>
  `
})
export class StatusComponent {

  @Input() status: string;

  get white() {
    return this.status === 'INCOMPLETE' as Status;
  }

  get gray() {
    return this.status === 'DRAFT' as Status || this.status === 'SUGGESTED' as Status;
  }

  get danger() {
    return this.status === 'RETIRED' as Status || this.status === 'INVALID' as Status;
  }

  get warning() {
    return this.status === 'SUPERSEDED' as Status;
  }

  get success() {
    return this.status === 'VALID' as Status;
  }
}
