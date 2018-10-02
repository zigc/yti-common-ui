import { Component, Input } from '@angular/core';
import {
  getDataModelingMaterialIcon,
  getInformationDomainSvgIcon,
  getUiMaterialIcon,
  getVocabularyTypeMaterialIcon,
  MaterialIconDef
} from '../utils/icons';

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
      <i *ngSwitchCase="CategoryType.VocabularyType"
         class="yti-icon material-icons {{vocabularyTypeIconDef(id).colorClass}}">{{vocabularyTypeIconDef(id).name}}</i>
      <i *ngSwitchCase="CategoryType.DataModeling"
         class="yti-icon material-icons {{dataModelingIconDef(id).colorClass}}">{{dataModelingIconDef(id).name}}</i>
      <img *ngSwitchCase="CategoryType.InformationDomain" class="yti-icon" [src]="informationDomainIconSrc(id)">
      <i *ngSwitchCase="CategoryType.UI" class="yti-icon {{uiIconDef(id).colorClass}}">{{uiIconDef(id).name}}</i>
      <i *ngSwitchDefault class="yti-icon material-icons icon-danger">warning</i>
    </ng-container>
  `
})
export class IconComponent {
  @Input() category: IconCategory;
  @Input() id: string;
  CategoryType = IconCategory;

  vocabularyTypeIconDef(id: string): MaterialIconDef {
    return getVocabularyTypeMaterialIcon(id);
  }

  dataModelingIconDef(id: string): MaterialIconDef {
    return getDataModelingMaterialIcon(id);
  }

  informationDomainIconSrc(id: string): any {
    return getInformationDomainSvgIcon(id);
  }

  uiIconDef(id: string): MaterialIconDef {
    return getUiMaterialIcon(id);
  }
}
