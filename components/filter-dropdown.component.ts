import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Options } from './dropdown.component';

export type FilterOptions<T> = Options<T>;

@Component({
  selector: 'app-filter-dropdown',
  template: `
    <app-dropdown [id]="id"
                  [options]="options"
                  [showNullOption]="true"
                  [placement]="placement"
                  [(ngModel)]="selection"></app-dropdown>
  `
})
export class FilterDropdownComponent<T> {

  @Input() id: string;
  @Input() options: FilterOptions<T>;
  @Input() filterSubject: BehaviorSubject<T>;
  @Input() placement: string;

  get selection() {
    return this.filterSubject.getValue();
  }

  set selection(value: any) {
    this.filterSubject.next(value);
  }
}
