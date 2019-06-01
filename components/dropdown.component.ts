import {Component, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {firstMatching} from '../utils/array';
import {Placement as NgbPlacement} from '@ng-bootstrap/ng-bootstrap';

export type Placement = NgbPlacement;
export type Options<T> = Option<T>[];

export interface Option<T> {
  value: T | null;
  name: () => string;
  idIdentifier?: () => string;
}

@Component({
  selector: 'app-dropdown',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }],
  template: `
    <div ngbDropdown *ngIf="initialized" [placement]="placement">
      <button [id]="'selected_' + id" class="btn btn-dropdown" ngbDropdownToggle>
        <div class="selected_name">{{selectionName}}</div>
      </button>

      <div ngbDropdownMenu>
        <button *ngFor="let option of visibleOptions; let i = index"
                [id]="getIdIdentifier(option, i) + '_' + id"
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

  @Input() id: string;
  @Input() options: Options<T>;
  @Input() showNullOption = false;
  @Input() placement: Placement = 'bottom-left';

  selection: T | null;
  initialized = false;

  private propagateChange: (fn: any) => void = () => {
  }
  private propagateTouched: (fn: any) => void = () => {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.initialized && this.options) {
      this.initialized = true;
    }

    // Reset the selection if options have changed and no longer contain the (previously) selected value, and if we can select something else
    if (this.selection && changes.options && this.options && this.options.length) {
      const currentlySelected = firstMatching(this.options, o => o.value === this.selection);
      if (!currentlySelected) {
        this.select(this.options[0]);
      }
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
    // NOTE: There may be a valid match with nullish value. If there isn't, then let us consider that an initialization time issue.
    const selectedOption = firstMatching(this.options, o => o.value === this.selection);
    if (selectedOption) {
      return selectedOption.name();
    } else if (this.selection == null) {
      return '';
    }
    throw new Error('Dropdown options do not contain supposedly selected value.');
  }

  getIdIdentifier(option: Option<T>, index: number) {
    return option.idIdentifier ? option.idIdentifier() : index;
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
