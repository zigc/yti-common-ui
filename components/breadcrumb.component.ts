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
        <!-- Normal ancestor link -->
        <a [id]=" i + '_breadcrumb_link'" *ngIf="!active && breadcrumb.route" [routerLink]="breadcrumb.route">
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </a>
        <!-- Non-linked active view indicator (or anything without route) -->
        <span *ngIf="(active && !linkActive) || !breadcrumb.route">
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </span>
        <!-- Active view refresh link using full page load (i.e., standard html link, skip routing) -->
        <a [id]=" i + '_breadcrumb_link'" *ngIf="active && linkActive && !refreshPath && breadcrumb.route" [href]="breadcrumb.route!.join('/')">
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </a>
        <!-- Active view refresh link using transitional route target -->
        <a [id]=" i + '_breadcrumb_link'" *ngIf="active && linkActive && refreshPath && breadcrumb.route" [href]="breadcrumb.route!.join('/')" (click)="refresh($event, breadcrumb.route)">
          <span *ngIf="breadcrumb.localizationKey">{{breadcrumb.localizationKey | translate}}</span>
          <span *ngIf="breadcrumb.localizationKey && breadcrumb.label">:</span>
          <span *ngIf="breadcrumb.label">{{breadcrumb.label | translateValue:true}}</span>
          <span *ngIf="breadcrumb.value">{{breadcrumb.value}}</span>
        </a>
      </li>
    </ol>
  `
})
export class BreadcrumbComponent {
  /**
   * Location (navigation path) observable to show on breadcrumb.
   */
  @Input() location: Observable<Location[]>;
  /**
   * Set to 'true' to make active view indicator a clickable link, with the component re-initialization intent. It is recommended to also give working refreshPath,
   * as full page reload is used otherwise.
   */
  @Input() linkActive?: boolean;
  /**
   * Route path that closes the components that need re-initialization on active view link activation. Also known as "the dummy component route". If this is given
   * together with linkActive, then clicking on the active view indicator navigates to this path, and immediately back to the original route.
   */
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
