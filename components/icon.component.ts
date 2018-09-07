import {Component, Input} from '@angular/core';
import {getVocabularyTypeMaterialIcon, getDataModelingMaterialIcon, getGroupSvgIcon, getUiMaterialIcon} from '../utils/icons';

export enum IconCategory {
  VocabularyType = "VOCABULARY_TYPE",
  DataModeling = "DATA_MODELING",
  Group = "GROUP",
  UI = "UI"
}

/**
 * Icon component that may be used instead of utils/icons utility. NOTE: Work in progress, as styling is currently impossible!
 */
@Component({
  selector: 'app-icon',
  styleUrls: ['./icon.component.scss'],
  template: `
    <ng-container [ngSwitch]="category">
      <i *ngSwitchCase="CategoryType.VocabularyType" class="yti-icon material-icons">{{vocabularyTypeIconName(id)}}</i>
      <i *ngSwitchCase="CategoryType.DataModeling" class="yti-icon">{{dataModelingIconName(id)}}</i>
      <img *ngSwitchCase="CategoryType.Group" class="yti-icon" [src]="groupIconSrc(id)">
      <i *ngSwitchCase="CategoryType.UI" class="yti-icon">{{uiIconName(id)}}</i>
      <i *ngSwitchDefault class="material-icons">warning</i>
    </ng-container>
  `
})
export class IconComponent {
  @Input() category: IconCategory;
  @Input() id: string;
  CategoryType = IconCategory;
  vocabularyTypeIconName(id: string): string {
    return getVocabularyTypeMaterialIcon(id);
  }
  dataModelingIconName(id: string): string {
    return getDataModelingMaterialIcon(id);
  }
  groupIconSrc(id: string): any {
    return getGroupSvgIcon(id);
  }
  uiIconName(id: string): string {
    return getUiMaterialIcon(id);
  }
}
