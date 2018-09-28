
const warningSvgIcon = require('../assets/icons/material/ic_warning_24px.svg');

const vocabularyTypeMaterialIcons: { [typeId: string]: string } = {
  'Vocabulary': 'chat_bubble_outline',
  'TerminologicalVocabulary': 'chat_bubble'
};

const informationDomainSvgIcons: { [notation: string]: any } = {
  'P1': require('../assets/icons/kapa/icon_asuminen.svg'), // Asuminen
  'P2': require('../assets/icons/kapa/icon_kerrostalo.svg'), // Rakennettu ympäristö
  'P3': require('../assets/icons/kapa/icon_perhe.svg'), // Perheiden palvelut
  'P4': require('../assets/icons/kapa/icon_muutokset_ja_kriisitilanteet.svg'), // Sosiaalipalvelut
  'P5': require('../assets/icons/kapa/icon_laakari.svg'), // Terveydenhuolto, sairaanhoito ja ravitsemus
  'P6': require('../assets/icons/kapa/icon_esitys.svg'), // Koulutus
  'P7': require('../assets/icons/kapa/icon_oikeus.svg'), // Oikeusturva
  'P8': require('../assets/icons/kapa/icon_vaaka_2.svg'), // Demokratia
  'P9': require('../assets/icons/kapa/icon_hallintorakennus.svg'), // Yleiset tieto- ja hallintopalvelut
  'P10': require('../assets/icons/kapa/icon_kayttaja.svg'), // Työ ja työttömyys
  'P11': require('../assets/icons/kapa/icon_yrittaja.svg'),// Elinkeinot
  'P12': require('../assets/icons/kapa/icon_tyonantajuus.svg'), // Työnantajan palvelut
  'P13': require('../assets/icons/kapa/icon_laina.svg'), // Eläkkeet
  'P14': require('../assets/icons/kapa/icon_talous.svg'), // Verotus ja julkinen talous
  'P15': require('../assets/icons/kapa/icon_taloustiedot.svg'), // Yksityinen talous ja rahoitus
  'P16': require('../assets/icons/kapa/icon_liikenne.svg'), // Liikenne
  'P17': require('../assets/icons/kapa/icon_kansainvalistyminen.svg'), // Matkailu
  'P18': require('../assets/icons/kapa/icon_kartat.svg'), // Kartat
  'P19': require('../assets/icons/kapa/icon_yhteistyo.svg'), // Turvallisuus
  'P20': require('../assets/icons/kapa/icon_ratkaisu.svg'), // Järjestys
  'P21': require('../assets/icons/kapa/icon_pankkikortit.svg'), // Kuluttaja-asiat
  'P22': require('../assets/icons/kapa/icon_palveluvayla.svg'), // Maahan- ja maastamuutto
  'P23': require('../assets/icons/kapa/icon_kauppa.svg'), // Ympäristö
  'P24': require('../assets/icons/kapa/icon_kasvu.svg'), // Luonnonvarat, eläimet ja kasvit
  'P25': require('../assets/icons/kapa/icon_kulttuuri.svg'), // Kulttuuri
  'P26': require('../assets/icons/kapa/icon_keskustelu.svg'), // Viestintä
  'P27': require('../assets/icons/kapa/icon_liikunta.svg') // Liikunta ja ulkoilu
};

const dataModelingMaterialIcons: { [type: string]: string } = {
  'library': 'view_column', // Tietokomponenttikirjasto
  'profile': 'view_quilt', // Soveltamisprofiili
  'class': 'web_asset', // Luokka
  'shape': 'web', // Tarkennettu luokka
  'attribute': 'text_format', // Attribuutti
  'association': 'low_priority' // Assosiaatio
};

const uiMaterialIcons: { [action: string]: string } = {
  'delete': 'delete_forever',
  'dragAndDrop': 'import_export',
  'closeModal': 'close',
  'search': 'search'
};

/**
 * Get material icon name for vocabulary types. Use with
 * ```
 * <i class="material-icons">NAME</i>
 * ```
 * @param typeId 'TerminologicalVocabulary' or 'Vocabulary'
 */
export function getVocabularyTypeMaterialIcon(typeId: string): string {
  const icon: string = vocabularyTypeMaterialIcons[typeId];
  return icon || 'warning';
}

/**
 * Get svg icon for information domain (previously known as classification or group). Use with
 * ```
 * <img [src]=ICON>
 * ```
 * @param domainId For example 'P8'.
 */
export function getInformationDomainSvgIcon(domainId: string): any {
  const icon: any = informationDomainSvgIcons[domainId];
  return icon || warningSvgIcon;
}

/**
 * Get svg icon for information domain (previously known as classification or group). Use with
 * ```
 * <img [src]=ICON>
 * ```
 * @deprecated Use getInformationDomainSvgIcon instead
 * @param groupId For example 'P8'.
 */
export function getGroupSvgIcon(groupId: string): any {
  return getInformationDomainSvgIcon(groupId);
}

/**
 * Get material icon name for various data modeling terms. Use with
 * ```
 * <i class="material-icons">NAME</i>
 * ```
 * @param type For example 'attribute'.
 */
export function getDataModelingMaterialIcon(type: string): string {
  const icon: string = dataModelingMaterialIcons[type];
  return icon || 'warning';
}

/**
 * Get material icon name for various ui actions. Use with
 * ```
 * <i class="material-icons">NAME</i>
 * ```
 * @param action For example 'dragAndDrop'.
 */
export function getUiMaterialIcon(action: string): string {
  const icon: string = uiMaterialIcons[action];
  return icon || 'warning';
}
