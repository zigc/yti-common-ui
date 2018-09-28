import {Component, Input} from '@angular/core';
import {getVocabularyTypeMaterialIcon, getDataModelingMaterialIcon, getInformationDomainSvgIcon, getUiMaterialIcon} from '../utils/icons';

export enum IconCategory {
  VocabularyType = "VOCABULARY_TYPE",
  DataModeling = "DATA_MODELING",
  InformationDomain = "INFORMATION_DOMAIN",
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
      <img *ngSwitchCase="CategoryType.InformationDomain" class="yti-icon" [src]="informationDomainIconSrc(id)">
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
  informationDomainIconSrc(id: string): any {
    return getInformationDomainSvgIcon(id);
  }
  uiIconName(id: string): string {
    return getUiMaterialIcon(id);
  }
}
