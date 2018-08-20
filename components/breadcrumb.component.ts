import {Component, Input} from '@angular/core';
import {Location} from '../types/location';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  styleUrls: ['./breadcrumb.component.scss'],
  template: `
    <ol class="breadcrumb">
      <li class="breadcrumb-item" [class.active]="active" *ngFor="let breadcrumb of (location | async); let active = last; let i = index">
        <a [id]=" i + '_breadcrumb_link'" *ngIf="(!active || linkActive) && breadcrumb.route" [routerLink]="breadcrumb.route" [skipLocationChange]="active">
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </a>
        <a [id]=" i + '_breadcrumb_link2'" *ngIf="active && linkActive && breadcrumb.route" [href]="breadcrumb.route!.join('/')">
          -
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </a>
        <a [id]=" i + '_breadcrumb_link3'" *ngIf="active && linkActive && refreshPath && breadcrumb.route" [routerLink]="refreshPath!.concat(breadcrumb.route)" [skipLocationChange]="true">
          -
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </a>
        <a [id]=" i + '_breadcrumb_link4'" *ngIf="active && linkActive && refreshPath && breadcrumb.route" [href]="breadcrumb.route!.join('/')" (click)="refresh($event, breadcrumb.route)">
          -
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </a>
        <span *ngIf="(active && !linkActive) || !breadcrumb.route">
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
  @Input() linkActive?: boolean;
  @Input() refreshPath?: string[];

  constructor(private router : Router) {
  }

  refresh($event: any, target : string[]) {
    if (this.refreshPath) {
      this.router.navigate(this.refreshPath, {skipLocationChange: true}).then(() => this.router.navigate(target, {skipLocationChange: true}));
      $event.preventDefault();
    }
  }
}
