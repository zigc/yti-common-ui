import {Component, Input} from '@angular/core';
import {Location} from '../types/location';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  styleUrls: ['./breadcrumb.component.scss'],
  template: `
    <ol class="breadcrumb">      
      <li class="breadcrumb-item" [class.active]="active" *ngFor="let breadcrumb of location | async; let active = last; let i = index">
        <a [id]=" i + '_breadcrumb_link'" *ngIf="!active && breadcrumb.route" [routerLink]="breadcrumb.route">
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </a>
        <span *ngIf="active || !breadcrumb.route">
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </span>
      </li>
    </ol>
  `
})
export class BreadcrumbComponent {

  @Input() location: Observable<Location[]>;
}
