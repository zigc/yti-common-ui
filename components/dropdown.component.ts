import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { firstMatching } from '../utils/array';
import { requireDefined } from '../utils/object';
import { Placement as NgbPlacement } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'ng2-translate';

export type Placement = NgbPlacement;
export type Options<T> = Option<T>[];

export interface Option<T> {
  value: T|null,
  name: () => string;
}

@Component({
  selector: 'app-dropdown',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }],
  template: `
    <div ngbDropdown *ngIf="initialized" [placement]="placement">
      <button class="btn btn-dropdown" ngbDropdownToggle>
        <span>{{selectionName}}</span>
      </button>

      <div ngbDropdownMenu>
        <button *ngFor="let option of visibleOptions"
                (click)="select(option)"
                class="dropdown-item"
                [class.active]="isSelected(option)">
          {{option.name()}}
        </button>
      </div>
    </div>  
  `
})
export class DropdownComponent<T> implements OnChanges, ControlValueAccessor {

  @Input() options: Options<T>;
  @Input() showNullOption = false;
  @Input() placement: Placement = 'bottom-left';

  selection: T|null;
  initialized = false;

  constructor(private translateService: TranslateService) {
  }

  private propagateChange: (fn: any) => void = () => {};
  private propagateTouched: (fn: any) => void = () => {};

  ngOnChanges() {
    if (this.options) {
      this.initialized = true;
    }
  }

  get visibleOptions() {
    if (this.showNullOption) {
      return this.options;
    } else {
      return this.options.filter(o => o.value != null);
    }
  }

  get selectionName() {
    const firstMatch = firstMatching(this.options, o => o.value === this.selection);
    return firstMatch ? requireDefined(firstMatch).name() 
                      : this.selection ? String(this.translateService.instant(String(this.selection)))
                                       : '';
  }

  isSelected(option: Option<T>) {
    return this.selection === option.value;
  }

  select(option: Option<T>) {
    this.selection = option.value;
    this.propagateChange(option.value);
  }

  writeValue(obj: any): void {
    this.selection = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
}
